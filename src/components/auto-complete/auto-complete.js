import { LitElement, html } from 'lit-element';

import { nothing } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { classMap } from 'lit-html/directives/class-map';

import '@material/mwc-icon'
import '@polymer/iron-dropdown';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';

import autocompleteStyles from './styles';
import { KEY_CODES } from '../../constants/constants';

import {
  defaultNoDataRenderer,
  defaultSelectionRenderer,
  getResultWithSelectedInFront
} from './utils';
import { debounce } from '../../utils/misc';
import { isEmpty } from '../../utils/array';
import { areObjectsEqual } from '../../utils/object';

/**
 *  Renders an autocomplete for searching large sets of data or dynamically requesting information from an API.
 *  ### Basic Usage
 *  ```
    <auto-complete
      label="Label of the input field"
      displayBy="The property of option to display"
      selectBy="The unique property of option to select"
      .isLoading="Determines if the component is in loading state"
      .isMultiple="Determines if the component can select multiple value"
      .options="The list of options to show in the dropdown"
      .selectedOptions="$The list of selected options to show in the input field"
      .onSearchTextChange="Function that gets called when search input changes."
      .onChange="Function that gets called when selectedOptions change"
    ></auto-complete>
 *  ```
 *
 * @customElement
 * @litElement
 *
 */
class AutoComplete extends LitElement {
  /**
   * Styles for the component.
   */
  static get styles() {
    return autocompleteStyles;
  }

  /**
   * Props needed for the component.
   */
  static get properties() {
    return {
      /**
       * Denotes whether or not to select multiple values.
       *
       * @type {{loading: Boolean}}
       */
      isMultiple: { type: Boolean },

      /**
       * Denotes whether or not the component is a plain select field.
       *
       * @type {{isSelect: Boolean}}
       */
      isSelect: { type: Boolean },

      /**
       * Denotes whether or not the component is readonly.
       *
       * @type {{isReadonly: Boolean}}
       */
      isReadonly: { type: Boolean },

      /**
       * Denotes whether or not to show a loading progress bar.
       *
       * @type {{loading: Boolean}}
       */
      isLoading: { type: Boolean },

      /**
       * Denotes whether or not the autocomplete is invalid.
       *
       * @type {{isInvalid: Boolean}}
       */
      isInvalid: { type: Boolean },

      /**
       * Label to be shown for the input.
       *
       * @type {{label: String}}
       */
      label: { type: String },

      /**
       * The search value in the input.
       *
       * @type {{searchText: String}}
       */
      searchText: { type: String },

      /**
       * List of selected options.
       *
       * @type {{selectedOptions: Array}}
       */
      selectedOptions: { type: Array },

      /**
       * List of options to be displayed in the dropdown.
       *
       * @type {{options: Array}}
       */
      options: { type: Array },

      /**
       * Property of option's text displayed in the dropdown.
       *
       * @type {{displayBy: String}}
       */
      displayBy: { type: String },

      /**
       * Property to be used for sorting.
       */
      sortBy: String,

      /**
       * Property of option's value.
       *
       * @type {{selectBy: String}}
       */
      selectBy: { type: String },

      /**
       * Function that gets called when search input changes.
       *
       * @type {{onSearchTextChange: Function}}
       */
      onSearchTextChange: { type: Function },

      /**
       * Function that gets called when selectedOptions change.
       *
       * @type {{onChange: Function}}
       */
      onChange: { type: Function },

      /**
       * Function that renders the individual selection.
       *
       * @type {{selectionRenderer: Function}}
       */
      selectionRenderer: { type: Function },

      /**
       * Function that renders the individual option in shown in the dropdown.
       *
       * @type {{optionRenderer: Function}}
       */
      optionRenderer: { type: Function },

      /**
       * Function that renders the no data placeholder.
       *
       * @type {{addNewDataRenderer: Function}}
       */
      addNewDataRenderer: { type: Function },

      /**
       * Denotes whether or not the dropdown is open.
       *
       * @type {{isDropdownOpen: Boolean}}
       */
      isDropdownOpen: { type: Boolean },

      /**
       * If enabled, makes the border solid instead of dashed in the
       * case of readonly.
       */
      isBorderSolid: { type: Boolean },

      /**
       * Denotes whether or not the input is focused.
       *
       * @type {{isInputOnFocus: Boolean}}
       */
      isInputOnFocus: { type: Boolean, reflect: true },

      /**
       * State to define component can create or not.
       * Passed from parents.
       * Default false.
       *
       * @type {{canCreateData: Boolean}}
       */
      canCreateData: { type: Boolean },

      /**
       * Handle scroll of content.
       * Passed from parent.
       * 
       * @type {{handleContentScroll: Function}}
       */
      handleContentScroll:{ type: Function }
    };
  }

  /**
   * The constructor.
   */
  constructor() {
    super();

    this.label = '';
    this.searchText = '';
    this.selectBy = 'value';
    this.displayBy = 'text';
    this.sortBy = '';

    this.isSelect = false;
    this.isInvalid = false;
    this.isLoading = false;
    this.isReadonly = false;
    this.isMultiple = false;
    this.isBorderSolid = false;
    this.isDropdownOpen = false;
    this.isInputOnFocus = false;
    this.canCreateData = false;

    this.options = [];
    this.selectedOptions = [];

    this.onChange = () => {};
    this.onSearchTextChange = () => {};
    this.addNewDataRenderer = () => {};
    this.selectionRenderer = defaultSelectionRenderer;
    this.optionRenderer = option => option[this.displayBy];

    this.openDropdown = this.openDropdown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputFocusIn = this.handleInputFocusIn.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);

    this.onSearchTextChangeDebounced = debounce(
      this.onSearchTextChangeDebounced.bind(this),
      300
    );
  }

  firstUpdated(properties) {
    super.firstUpdated(properties);

    if (this.sortBy === '') {
      this.sortBy = this.displayBy;
    }
  }

  /**
   * Calls parent function `onSearchTextChange`. But the intention is that this
   * function will only be available as a debounced version.
   *
   * @param {string} text
   * @returns {*}
   */
  onSearchTextChangeDebounced(text) {
    return this.onSearchTextChange(text);
  }

  /**
   * Handles selection of an option.
   *
   * @param {string} selectedOptionId
   */
  handleOptionSelected(selectedOptionId) {
    const selectedOption = this.options.find(
      option => option.id === selectedOptionId
    );

    if (this.isOptionSelected(selectedOption)) {
      this.removeSelection(selectedOption);
    } else {
      this.addSelection(selectedOption);
    }

    this.searchText = '';
    this.isDropdownOpen = false;
    this.onSearchTextChange(this.searchText);
    this.shadowRoot.getElementById('input').focus();
  }

  /**
   * Called when a selection needs to be added.
   *
   * @param {Object} selectedOption
   */
  addSelection(selectedOption) {
    if (this.isMultiple) {
      this.onChange([...this.selectedOptions, selectedOption]);
    } else {
      this.onChange([selectedOption]);
    }
  }

  /**
   * Called when a selection needs to be removed.
   *
   * @param {Object} selectionToRemove
   */
  removeSelection(selectionToRemove) {
    const shouldNotBeRemoved = selection =>
      !areObjectsEqual(selection, selectionToRemove);

    if (this.isMultiple) {
      this.onChange(this.selectedOptions.filter(shouldNotBeRemoved));
    } else {
      this.onChange([]);
    }
  }

  /**
   * Handles deletion of selection when backspace in pressed.
   *
   * @param {Object} event
   */
  handleKeyDown(event) {
    const isNotBackspace = event.keyCode !== KEY_CODES.BACKSPACE_KEY;

    if (this.searchText || isNotBackspace) {
      return;
    }

    const lastSelection = this.selectedOptions.slice(-1).pop();

    this.removeSelection(lastSelection);
  }

  /**
   * To check if the supplied option is selected.
   *
   * @param {Object} option
   */
  isOptionSelected(option) {
    const isSameAsOption = selection => areObjectsEqual(selection, option);

    return !!this.selectedOptions.find(isSameAsOption);
  }

  /**
   * A callback that handles search text changes.
   *
   * @param {Object} event
   */
  handleSearchTextChange(event) {
    this.searchText = event.target.value;

    this.onSearchTextChangeDebounced(this.searchText);

    this.isDropdownOpen = true;
  }

  /**
   * Opens the dropdown.
   */
  openDropdown() {
    if (this.isReadonly) {
      return;
    }

    if (!this.options.length) {
      this.onSearchTextChange(this.searchText || '');
    }

    this.isDropdownOpen = true;
  }

  /**
   * Called when opened attribute of iron-dropdown changes.
   *
   * @param {Object} event
   */
  handleDropdownDisplayChange(event) {
      if (!event.detail.value) {
      this.searchText = '';
      this.onSearchTextChange(this.searchText);
    }
    
    this.isDropdownOpen = event.detail.value;
  }

  /**
   * Called when focused attribute of iron-dropdown changes.
   */
  handleDropdownFocusChange() {
    if (this.isDropdownOpen) {
      this.shadowRoot.getElementById('input').focus();
    }
  }

  /**
   * Called when input field is focused.
   */
  handleInputFocusIn() {
    if (this.isReadonly) {
      return;
    }

    this.isInputOnFocus = true;
  }

  /**
   * Returns true if the label is raised.
   */
  get isLabelRaised() {
    const isSelectionMade =
      this.selectedOptions && !!this.selectedOptions.length;

    return this.searchText || isSelectionMade;
  }

  /**
   * The render method.
   */
  render() {
    const inputAreaClasses = classMap({
      'editable-input-container': true,
      'overflow-hidden': !this.isLabelRaised
    });

    return html`
      <div id="autocomplete-wrapper" class="input-group relative">
        <div class="flex align-items-center">
          <slot name="prefix"></slot>

          <div class="${inputAreaClasses}" @click="${this.openDropdown}">
            ${this.renderLabel()}
            ${this.selectionRenderer(this.selectedOptions, this.displayBy)}
            ${this.renderInputField()}
          </div>

          ${!this.isReadonly
            ? html`
            <mwc-icon class="chevron">
              ${this.isDropdownOpen? `arrow_drop_up`: `arrow_drop_down` }
            </mwc-icon>
              `
            : nothing}

          <slot name="suffix"></slot>
        </div>

        <div class="${this.isLoading ? 'progress-line' : 'display-none'}"></div>

        ${this.renderBottomBar()}

        <slot name="hint"></slot>

        <div>
          ${this.isDropdownOpen
            ? this.renderOptions(
                getResultWithSelectedInFront(
                  this.options,
                  this.selectedOptions,
                  this.sortBy
                )
              )
            : nothing}
        </div>
      </div>
    `;
  }

  /**
   * Returns html for the label.
   */
  renderLabel() {
    const labelClasses = classMap({
      'raised-label': this.isLabelRaised,
      'flat-label': !this.isLabelRaised,
      'active-text': this.isInputOnFocus,
      'error-text': this.isInvalid
    });

    return html`
      <label class="${labelClasses}"> ${this.label} </label>
    `;
  }

  /**
   * Returns html for the input field.
   */
  renderInputField() {
    const inputClasses = classMap({ 'cursor-pointer': this.isSelect });

    return html`
      <input
        required
        id="input"
        type="text"
        class="${inputClasses}"
        .value="${this.searchText}"
        @keydown="${this.handleKeyDown}"
        ?readonly="${this.isSelect || this.isReadonly}"
        @focusin="${this.handleInputFocusIn}"
        @focusout="${() => {
          this.isInputOnFocus = false;
        }}"
        @input="${this.handleSearchTextChange}"
      />
    `;
  }

  /**
   * Returns html for the bar at the bottom of the input field.
   */
  renderBottomBar() {
    if (this.isReadonly) {
      return html`
        <span
          class="bar readonly-bar ${classMap({
            'readonly-bar-solid': this.isBorderSolid
          })}"
        ></span>
      `;
    }

    const focusedBarClasses = classMap({
      'bar-focusin': this.isInputOnFocus,
      'active-bg': this.isInputOnFocus,
      'bar-focusout': !this.isInputOnFocus,
      'error-bg': this.isInvalid
    });

    const defaultBarClasses = classMap({
      bar: true,
      'default-bar-hidden': this.isInputOnFocus,
      'error-bg': this.isInvalid,
      'default-bg': !this.isInvalid
    });

    return html`
      <div class="${this.isLoading ? 'display-none' : 'flex'}">
        <span class="bar-before ${focusedBarClasses}"></span>

        <span class="${defaultBarClasses}"></span>

        <span class="bar-after ${focusedBarClasses}"></span>
      </div>
    `;
  }

  /**
   * Renders list of options in dropdown.
   *
   * @param { Array } options
   */
  renderOptions(options = []) {
    if (this.isLoading) {
      return nothing;
    }

    const isExactMatch = options.find(
      item => item[this.displayBy].trim() === this.searchText.trim()
    );

    const autocompleteWidth = this.shadowRoot.getElementById(
      'autocomplete-wrapper'
    ).offsetWidth;

    const mwcListStyle = styleMap({ width: `${autocompleteWidth}px` });

    const optionsMenu = html`
      <mwc-list style="${mwcListStyle}" slot="dropdown-content" @scroll="${this.handleContentScroll || (()=>{})}">
        ${this.canCreateData && !isExactMatch && this.searchText
          ? html`
              <div
                @click=${() => {
                  this.isDropdownOpen = false;
                }}
              >
                ${this.addNewDataRenderer(this.searchText)}
              </div>
            `
          : nothing}
        ${options.map(
          option =>
            html`
              ${this.renderIndividualOption(option)}
            `
        )}
      </mwc-list>
    `;

    const noDataRenderer = html`
      <mwc-list
        @click="${() => {
          this.isDropdownOpen = false;
        }}"
        style="${mwcListStyle}"
        slot="dropdown-content"
      >
        ${defaultNoDataRenderer(this.searchText)}
      </mwc-list>
    `;

    return html`
      <iron-dropdown
        opened
        scroll-action="refit"
        @focused-changed="${this.handleDropdownFocusChange}"
        @opened-changed="${this.handleDropdownDisplayChange}"
      >
        ${isEmpty(options) && !this.canCreateData
          ? noDataRenderer
          : optionsMenu}
      </iron-dropdown>
    `;
  }

  /**
   * Renders individual option in dropdown.
   *
   * @param {Object} option
   */
  renderIndividualOption(option) {
    return html`
      <mwc-list-item
        .activated="${this.isOptionSelected(option)}"
        @click="${() => this.handleOptionSelected(option.id)}"
      >
        ${this.optionRenderer(option)}
      </mwc-list-item>
    `;
  }
}

customElements.define('auto-complete', AutoComplete);

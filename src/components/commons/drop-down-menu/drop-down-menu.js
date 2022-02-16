import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';

import { isEmpty as isArrayEmpty } from '../../../utils/array';

/**
 * Renders a drop down component with the list of items passed as a prop.
 * ### Usage
 * ```
 *  <drop-down-menu
      label="string label"
      .options="${array of objects}"
      .select="${function that handles the drop down change"
      selectBy="parameter/field of the object so as to select the items with"
      displayBy="parameter/field of the object so as to display the items with"
      .isLabelFloatHidden="${boolean to control the floating label}"
      .preSelect="${item to be selected when the dropdown renders}"
 *  ></drop-down-menu>
 * ```
 * 
 * @customElement
 * @litElement
 *
 */
class DropDownMenu extends LitElement {
  /**
   * The styling css of the drop down component.
   *
   */
  static get styles() {
    return css`
      paper-dropdown-menu {
        width: 100%;
      }
      paper-listbox {
        max-height: 300px;
        overflow-y: auto;
      }
      paper-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 30px;
        font-size: var(--font-main);
      }
      ::-webkit-scrollbar {
        width: var(--spacing-1x);
        height: var(--spacing-1x);
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
        border-radius: var(--spacing-2x);
      }
      ::-webkit-scrollbar-thumb {
        border-radius: var(--spacing-2x);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
      }
    `;
  }

  /**
   * The properties of the drop down component.
   *
   * @returns  {Object}
   */
  static get properties() {
    return {
      /**
       * Label of the drop down menu component.
       * To be sent by the parent.
       *
       * @type {{ label: String }}
       */
      label: { type: String },
      /**
       * Function imported from the parent component which stores the
       * selected content in the dropdown.
       *
       * @type {{select : Function}}
       */
      select: { type: Function },
      /**
       * Array of dropdown received from the parent component.
       *
       * @type {{options : Array}}
       */
      options: { type: Array },
      /**
       * Stores the preSelected dropdown content.
       * Passed from the parent.
       *
       * @type {{preSelect: String}}
       */
      preSelect: { type: String },
      /**
       * selectBy holds the key by which the content
       * in the dropdown in selected.
       *
       * @type {{selectBy : String}}
       */
      selectBy: { type: String },
      /**
       * displayBy holds the key by which the content
       * in the dropdown is displayed.
       *
       * @type {{displayBy : String}}
       */
      displayBy: { type: String },
      /**
       * Boolean to hide or display the floating label in dropdown.
       *
       * @type {{isLabelFloatHidden: Boolean}}
       */
      isLabelFloatHidden: { type: Boolean }
    };
  }

  /**
   * Construtor function to initialize required values.
   */
  constructor() {
    super();
    this.selectBy = 'id';
    this.displayBy = 'name';
  }

  /**
   * The renderer function of the component.
   *
   * @returns  {String}
   */
  render() {
    return html`
      <custom-style>
        <style is="custom-style">
          paper-dropdown-menu {
            margin-top: var(--spacing-2x);
            --paper-dropdown-menu-container-label: {
              color: var(--color-grey);
              font-family: var(--theme-font-family);
              font-size: var(--font-main);
            }
            --paper-dropdown-menu-container-focus-color: var(--color-lightGrey);
            --paper-input-container-label: {
              color: var(--color-grey);
              font-family: var(--theme-font-family);
              font-size: var(--font-main);
            }
            --paper-item-min-height: var(--spacing-5x);
            --paper-input-container-focus-color: var(--color-lightGrey);
          }
          .ellipses {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 300px;
          }
        </style>
      </custom-style>

      <paper-dropdown-menu
        class="${this.id}"
        label="${this.label}"
        @iron-select="${this.select}"
        no-animations="true"
        ?no-label-float="${this.isLabelFloatHidden}"
        vertical-offset="50"
      >
        <paper-listbox
          slot="dropdown-content"
          attr-for-selected="item-name"
          selected="${this.preSelect}"
          horizontalAlign="left"
        >
          ${isArrayEmpty(this.options)
            ? nothing
            : this.options.map(option => {
                return html`
                  <paper-item item-name=${option[this.selectBy]}
                    ><div class="ellipses">
                      ${option[this.displayBy]}
                    </div></paper-item
                  >
                `;
              })}
        </paper-listbox>
      </paper-dropdown-menu>
    `;
  }
}

customElements.define('drop-down-menu', DropDownMenu);

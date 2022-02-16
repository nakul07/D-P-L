import { cache } from 'lit-html/directives/cache';
import { LitElement, css, html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import '@polymer/paper-button';
import '@polymer/paper-spinner/paper-spinner';

/**
 * A component to show the purification task from the list.
 *
 *  * <async-button></async-button>
 */
class AsyncButton extends LitElement {
  /**
   * List of the property for the component.
   *
   * @returns {
   *  {onClick: String}
   * }
   */
  static get properties() {
    return {
      /**
       * Is loading currently.
       * Passed within.
       *
       * @type Boolean
       */
      isLoading: {
        type: Boolean,
      },

      /**
       * Disables the button when needed.
       * Passed from the parent.
       *
       * @type Boolean
       */
      isDisabled: {
        type: Boolean,
      },

      /**
       * Description of the property.
       * Passed from parameter.
       * @type Function
       */
      onClick: {
        type: Function,
      },

      /**
       * Label text .
       * Passed from parent.
       *
       * @type String
       */
      text: {
        type: String,
      },

      /**
       * Label text for loading.
       * Passed from parent.
       *
       * @type String
       */
      textForLoading: {
        type: String,
      },

      /**
       * The text to be shown on hover of the button.
       * Passed from parent.
       * 
       * @type {{tooltipText: String}}
       */
      tooltipText:{
        type:String
      }
    };
  }

  /**
   * Style for the aesthetic implementation of the component.
   *
   * @returns {CSSResult}
   */
  static get styles() {
    return css`
      :host {
        display: inline-block;
        --btn-text-size: var(--font-main, 16px);
      }
      paper-button {
        letter-spacing: 0.75px;
        color: var(--color-white);
        padding: var(--spacing-2x) var(--spacing-4x);
        background-color: var(--color-pink);
        font-family: var(--theme-font-family);
        font-weight: var(--fontWeight-semibold);
        width: inherit;
        position: relative;
        font-size: var(--btn-text-size);
      }

      .disabled {
        color: var(--color-button-disabled, var(--color-white));
        background-color: var(--bg-color-button-disabled, var(--color-primary-200));
        pointer-events: auto !important;
      }

      .padding {
        padding-right: 40px;
      }

      paper-spinner {
        height: var(--spacing-4x);
        width: var(--spacing-4x);
        position: absolute;
        right: 10px;
      }
    `;
  }

  /**
   * Initialize the property and bind the functions.
   *
   */
  constructor() {
    super();

    this.text = 'Save';
    this.textForLoading = 'Saving';

    this.isLoading = false;
    this.isDisabled = false;

    this.onClick = async () => {};

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handle the click action.
   *
   * @returns {Promise<void>}
   */
  async handleClick() {
    if(this.isDisabled){
      return;
    }

    try {
      this.isLoading = true;
      await this.onClick();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      throw error;
    }
  }

  /**
   * Render the component to the DOM.
   *
   * @returns {TemplateResult | void}
   */ render() {
    const classes = {
      disabled: this.isDisabled,
    };

    return html`
      ${cache(
        this.isLoading
          ? html`
              <paper-button raised disabled class="disabled padding">
                ${this.textForLoading} <paper-spinner active></paper-spinner>
              </paper-button>
            `
          : html`
              <paper-button
                raised
                @click="${this.handleClick}"
                ?disabled="${this.isDisabled}"
                class="${classMap(classes)}"
                .title="${this.tooltipText || ''}"
              >
                ${this.text}
              </paper-button>
            `
      )}
    `;
  }
}

customElements.define('async-button', AsyncButton);

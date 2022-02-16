import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import '@polymer/paper-button/paper-button';

/**
 * `<delphi-primary-button>` Custom component for the submit button to be used  in delphi app.
 *
 * <body>
 * ```
  <delphi-primary-button
   .isDisabled = "Boolean controlling button's Disabled status. Default value is 'false'"
   .buttonText ="Button's text. Default value is 'Submit'"
   .isCLicked = "Function triggered by button click"
  ></delphi-primary-button>
  ```
 *
 * @polymer
 * @litElement
 * @customElement
 */
class DelphiPrimaryButton extends LitElement {
  /**
   * Defines the style for the component.
   */
  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
          --btn-text-size: var(--font-main, 16px);
        }

        paper-button.submit {
          margin: 0;
          border-radius: var(--spacing-1x);
        }

        .submit.enabled {
          color: var(--color-white);
          background-color: var(--color-pink);
        }

        .submit.disabled {
          color: var(--color-white);
          background-color: var(--color-primary-200);
        }

        paper-button:hover {
          box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12),
            0px 3px 1px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14);
        }

        paper-button {
          align-items: center;
          font-weight: var(--fontWeight-semibold);
          display: inline-flex;
          letter-spacing: 0.75px;
          padding: var(--spacing-2x) var(--spacing-4x);
          font-size: var(--btn-text-size);
        }
      `
    ];
  }

  /**
   * Defines the properties for the component.
   */
  static get properties() {
    return {
      /**
       * Boolean to disable or enable the submit button.
       *
       * @type {{isSubmitButtonDisabled: Boolean}}
       */
      isDisabled: { type: Boolean },

      /**
       * Holds the text to be displayed in submit button.
       * The value is sent from the parent,
       *
       * @type {{buttonText: String}}
       */
      buttonText: { type: String },

      /**
       * Method to handle the submit of pop up.
       * Passed in as props from parent.
       *
       * @type {{submit: Function}}
       */
      isClicked: { type: Function }
    };
  }

  /**
   * Constructir for the component.
   * Initializes the props.
   *
   */
  constructor() {
    super();
    this.isDisabled = false;
    this.buttonText = 'Submit';
  }

  /**
   * Renders the component.
   */
  render() {
    const classesForSubmitButton = {
      submit: 'true',
      enabled: !this.isDisabled,
      disabled: this.isDisabled
    };

    return html`
      <paper-button
        class="${classMap(classesForSubmitButton)}"
        @click="${this.isClicked}"
        ?disabled="${this.isDisabled}"
        >${this.buttonText}</paper-button
      >
    `;
  }
}

customElements.define('delphi-primary-button', DelphiPrimaryButton);

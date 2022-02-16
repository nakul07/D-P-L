import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import '@polymer/paper-button/paper-button';

/**
 * `<delphi-secondary-button>` Custom component for the cancel button to be used  in delphi app.
 *
 * <body>
 * ```
 * <delphi-secondary-button
   .isDisabled = "Button's Disabled status"
   .buttonText ="Button's text"
   .isCLicked = "Function triggered by button click"
  ></delphi-secondary-button>
  ```
 *
 * @polymer
 * @litElement
 * @customElement
 */
class DelphiSecondaryButton extends LitElement {
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

        paper-button.cancel {
          margin: 0;
          outline: none;
        }

        .cancel.enabled {
          color: var(--btn-text-color, var(--color-grey-700));
        }

        .cancel.disabled {
          color: var(--color-grey-500);
          background-color: var(--color-grey-200);
        }

        paper-button:hover {
          background-color: var(--color-grey-100);
        }

        paper-button {
          align-items: center;
          display: inline-flex;
          letter-spacing: 0.75px;
          padding: var(--spacing-2x) var(--spacing-4x);
          font-size: var(--btn-text-size);
          font-weight: var(--fontWeight-semibold);
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
    this.buttonText = 'Cancel';
  }

  /**
   * Renders the component.
   */
  render() {
    const classesForCancelButton = {
      cancel: 'true',
      enabled: !this.isDisabled,
      disabled: this.isDisabled
    };

    return html`
      <paper-button
        class="${classMap(classesForCancelButton)}"
        @click="${this.isClicked}"
        >${this.buttonText}</paper-button
      >
    `;
  }
}

customElements.define('delphi-secondary-button', DelphiSecondaryButton);

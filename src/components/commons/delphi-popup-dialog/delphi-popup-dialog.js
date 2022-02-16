import { nothing } from 'lit-html';
import { html, css, LitElement } from 'lit-element';

import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog/paper-dialog';

import { scrollerCSS } from '../../../constants/cssMixins';

import '../../ui/flex-box';
import '../../async-button';
import '../delphi-buttons/delphi-primary-button';
import '../delphi-buttons/delphi-secondary-button';

/**
 * `<delphi-popup-dialog>` Custom component for the popup dialog to be used  in delphi app.
 *
 * <body>
 * ```
  <delphi-popup-dialog
  header = "String holding the header title. Default value is 'Create the content'"
  onCancel = "Function passed from the parent component which is triggered when the content submisson is completed or
               the pop up is cancelled. This function toggles the boolean in the parent which controls the display of the popup component."
  onAccept= "Function passed from the parent component which is triggered when the submit or accept button is pressed."
  acceptButtonText ="Holds the string to be displayed in delphi primary button. Default value for it is 'Submit'"
  acceptButtonLoadingText = "Holds the string to show when async button's loader is active. Default 'Saving'"
  cancelButtonText = "Holds the string to be displayed in delphi secondary button. Default value for it is 'Cancel'"
  isAcceptButtonDisabled = "Boolean to controls whether the delphi primary button is disabled or enabled. Default value is 'false'"
  readOnly = "Removes the cancel and submit button of the popup."
  isAsync = "boolean"
  ></delphi-popup-dialog>
 ```
 *  Component has a slot in which we can pass the other custom components like:
 * ```
  <delphi-dialog-popup>
   <custom-component></custom-component>
  </delphi-dialog-popup>
  ```
 *
 * @polymer
 * @litElement
 * @customElement
 */
class DelphiPopUpDialog extends LitElement {
  /**
   * Static getter properties.
   *
   * @returns {Object}
   */
  static get properties() {
    return {
      /**
       * Header for the pop up dialog.
       * Passed in as props from parent.
       */
      header: { type: String },

      /**
       * Method to handle the close of pop up.
       * Passed in as props from parent.
       *
       * @type {{handleClose: Function}}
       */
      onCancel: { type: Function },

      /**
       * Method to handle the submit of pop up.
       * Passed in as props from parent.
       *
       * @type {{submit: Function}}
       */
      onAccept: { type: Function },

      /**
       * Holds the text to be displayed in accept button.
       * The value is sent from the parent,
       *
       * @type {{acceptButtonText: String}}
       */
      acceptButtonText: { type: String },

      /**
       * Holds the text to be displayed in accept button while loading.
       * The value is sent from the parent,
       *
       * @type {{acceptButtonLoadingText: String}}
       */
      acceptButtonLoadingText: { type: String },

      /**
       * Holds the text to be displayed in cancel button.
       * The value is sent from the parent.
       *
       * @type {{cancelButtonText: String}}
       */
      cancelButtonText: { type: String },

      /**
       * Boolean to disable or enable the accept button.
       *
       * @type {{isAcceptButtonDisabled: Boolean}}
       */
      isAcceptButtonDisabled: { type: Boolean },

      /**
       * Boolean to determine whether to use async button.
       * Passed from parent.
       *
       * @type {{isAsync: Boolean}}
       */
      isAsync: { type: Boolean },

      /**
       * Boolean to give the border in the body.
       */
      border: { type: Boolean },

      /**
       * Boolean to remove the save and cancel button, readonly mode.
       *
       * @type {{readOnly:Boolean}}
       */
      readOnly: { type: Boolean }
    };
  }

  /**
   * Static getter styles.
   *
   * @returns {Array}
   */
  static get styles() {
    return [
      scrollerCSS,
      css`
        :host {
          --header-size: var(--font-xlg);
          --btn-font-size: var(--font-main, 16px);
        }
        paper-dialog {
          z-index: 200;
          overflow-y: auto;
          max-height: calc(100vh - 64px);
          width: var(--dialog-width, 628px);
        }
        .iron-icon--close {
          width: var(--spacing-6x);
          height: var(--spacing-6x);
          color: var(--color-grey-500);
        }
        .iron-icon--close:hover {
          cursor: pointer;
          transition: 0.2s;
          color: var(--color-grey-700);
        }
        .header-wrapper {
          top: 0;
          margin: 0;
          z-index: 99;
          position: sticky;
          box-sizing: border-box;
          padding: var(--spacing-5x) var(--spacing-6x);
          background: var(--color-white);
        }
        .title-header {
          text-transform: capitalize;
          font-size: var(--header-size);
          color: var(--color-grey-900);
          line-height: var(--spacing-6x);
          font-weight: var(--fontWeight-semibold);
        }
        .body-wrapper {
          display: block;
          margin-top: 0;
        }
        .border {
          padding: var(--spacing-6x);
          border-top: 1px #e0e0e0 solid;
          border-bottom: 1px #e0e0e0 solid;
        }
        .buttons-wrapper {
          margin: 0;
          bottom: 0;
          display: flex;
          z-index: 0;
          position: sticky;
          padding: var(--spacing-5x) var(--spacing-6x) var(--spacing-6x)
            var(--spacing-6x);
          background: var(--color-white);
        }

        delphi-secondary-button {
          margin-left: var(--spacing-2x);
        }

        delphi-secondary-button,
        delphi-primary-button,
        async-button {
          --btn-text-size: var(--btn-font-size);
        }
      `
    ];
  }

  /**
   * Constructor for the component.
   * Initializes the default value for the props.
   */
  constructor() {
    super();

    this.border = false;
    this.isAsync = false;
    this.readOnly = false;
    this.isSubmitButtonDisabled = false;

    this.header = 'Create the content';
    this.acceptButtonText = 'Submit';
    this.cancelButtonText = 'Cancel';
    this.acceptButtonLoadingText = 'Saving';
  }

  /**
   * Render method.
   *
   * @returns {customElements}
   */
  render() {
    return html`
      <paper-dialog modal opened>
        <flex-box class="header-wrapper justify-between align-center">
          <span class="title-header">${this.header}</span>
          <iron-icon
            icon="close"
            class="iron-icon--close"
            @click="${this.onCancel}"
          ></iron-icon>
        </flex-box>
        <div class="body-wrapper ${this.border ? 'border' : ''}">
          <slot></slot>
        </div>
        <div class="buttons-wrapper">
          ${!this.readOnly
            ? html`
          ${
            this.isAsync
              ? html`
                  <async-button
                    .isDisabled="${this.isAcceptButtonDisabled}"
                    .onClick="${this.onAccept}"
                    .text="${this.acceptButtonText}"
                    .textForLoading="${this.acceptButtonLoadingText}"
                  ></async-button>
                `
              : html`
                  <delphi-primary-button
                    .isDisabled="${this.isAcceptButtonDisabled}"
                    .isClicked="${this.onAccept}"
                    .buttonText="${this.acceptButtonText}"
                  ></delphi-primary-button>
                `
          }
                <delphi-secondary-button
                  .isClicked="${this.onCancel}"
                  .buttonText="${this.cancelButtonText}"
                ></delphi-secondary-button>
              </div>
            `
            : nothing}
        </div>
      </paper-dialog>
    `;
  }
}

customElements.define('delphi-popup-dialog', DelphiPopUpDialog);

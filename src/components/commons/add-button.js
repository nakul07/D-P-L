import { LitElement, html, css } from 'lit-element';

import '@polymer/paper-icon-button/paper-icon-button';

/**
 * Common component for add button.
 */
class AddButton extends LitElement {
  /**
   * The styles for the component.
   *
   * @returns {Array}
   */
  static get styles() {
    return [
      css`
        .add-reagent-btn {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: var(--spacing-4x);
          margin-right: var(--spacing-9x);
          color: var(--primary-color);
        }
      `,
    ];
  }

  /**
   * Static getter properties.
   *
   * @returns {Object}
   */
  static get properties() {
    return {
      /**
       * The name of the button.
       * Passed from parent component as a prop.
       * @type {String}
       * @default 'Add'
       */
      buttonName: { type: String },
    };
  }

  /**
   * Constructor for the component.
   * Binding and props initialization.
   */
  constructor() {
    super();
    this.buttonName = 'Add';
  }

  /**
   * Renders the component.
   *
   * @returns {HTMLElement}
   */
  render() {
    return html`
      <div class="add-reagent-btn">
        <paper-icon-button
          icon="add-circle"
          class="add-circle"
          @click="${() =>
            this.toggleGeneralReagentDialog(GENERAL_REAGENT_DIALOG_TYPE.ADD)}"
        ></paper-icon-button>
        <div
          class="add-text"
          @click="${() =>
            this.toggleGeneralReagentDialog(GENERAL_REAGENT_DIALOG_TYPE.ADD)}"
        >
          ${this.buttonName}
        </div>
      </div>
    `;
  }
}

customElements.define('add-button', AddButton);

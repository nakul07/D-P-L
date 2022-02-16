import { LitElement, html, css } from 'lit-element';

import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

import './commons/delphi-buttons/delphi-primary-button';
import './commons/drop-down-menu/drop-down-menu';
import './commons/add-button';
import './auto-complete';

/**
 * Your description here..
 */
class PopupForm extends LitElement {
  /**
   * The styles for the component.
   *
   * @returns {Array}
   */
  static get styles() {
    return [
      css`
        .main-body,
        .buttons {
          padding-left: 20px;
          padding-right: 20px;
        }
        drop-down-menu {
          width: 100%;
        }
        .building-blocks-container {
          margin-left: 20px;
        }
        .building-block-container drop-down-menu {
          width: 50%;
        }
        .delete-btn {
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
    return {};
  }

  /**
   * Constructor for the component.
   * Binding and props initialization.
   */
  constructor() {
    super();

    this.procuctOptions = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ]; //passed
  }

  /**
   * Renders the component.
   *
   * @returns {HTMLElement}
   */
  render() {
    return html`
      <main>
        <div class="main-body">
          <auto-complete
            label="Product"
            .options="${this.procuctOptions || []}"
            displayBy="name"
            selectBy="id"
            sortBy="name"
          >
          </auto-complete>
          <auto-complete
            label="Product"
            .options="${this.procuctOptions || []}"
            displayBy="name"
            selectBy="id"
            sortBy="name"
          >
          </auto-complete>
          <div>
            <p>Buliding Block(s)</p>
            <div class="building-blocks-container">
              <div class="building-block-container">
                <auto-complete
                  label="Product"
                  .options="${this.procuctOptions || []}"
                  displayBy="name"
                  selectBy="id"
                  sortBy="name"
                >
                </auto-complete>
                <paper-button class="delete-btn"
                  ><iron-icon icon="delete"></iron-icon>
                </paper-button>
              </div>
              <div class="building-block-container">
                <auto-complete
                  label="Product"
                  .options="${this.procuctOptions || []}"
                  displayBy="name"
                  selectBy="id"
                  sortBy="name"
                >
                </auto-complete>
                <paper-button class="delete-btn"
                  ><iron-icon icon="delete"></iron-icon
                ></paper-button>
              </div>
            </div>
            <add-button buttonName="Add Building Block"></add-button>
          </div>
          <auto-complete
            label="Product"
            .options="${this.procuctOptions || []}"
            displayBy="name"
            selectBy="id"
            sortBy="name"
          >
          </auto-complete>
        </div>
        <hr />
        <div class="buttons">
          <paper-button raised>Save</paper-button>
          <paper-button raised dialog-confirm>Cancel</paper-button>
        </div>
      </main>
    `;
  }
}

customElements.define('popup-form', PopupForm);

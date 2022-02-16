import { LitElement, html, css } from 'lit-element';

import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';
import '@polymer/iron-icon';
import '@polymer/paper-button/paper-button';

import './popup-form';
// import './commons/delphi-buttons/delphi-primary-button';
//import './commons/delphi-popup-dialog/delphi-popup-dialog';

//import '@polymer/paper-button';

/**
 * Default plate layout main component.
 */
class DefaultPlateLayout extends LitElement {
  /**
   * The styles for the component.
   *
   * @returns {Array}
   */
  static get styles() {
    return css`
      main {
        width: 100%;
        height: 100%;
      }
      #dialog {
        width: 500px;
      }
      .heading {
        margin-right: 100px;
      }
      .cross-button {
        position: absolute;
        top: 0;
        right: 0;
      }
    `;
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
  }

  /**
   * On click paper button event handler.
   *
   */
  onClickPaperBtn() {
    console.log('onClickPaperBtn clicked');
    this.shadowRoot.querySelector('#dialog').toggle();
  }

  /**
   * Renders the component.
   *
   * @returns {HTMLElement}
   */
  render() {
    return html`
      <main>
        <paper-button raised @click="${this.onClickPaperBtn}">
          Click Me</paper-button
        >
        <paper-dialog id="dialog" modal>
          <paper-dialog-scrollable>
            <div class="heading"><h2>Update Default Plate Layout</h2></div>
            <div class="cross-button">
              <paper-button dialog-confirm>
                <iron-icon
                  src="../images/close.png"
                  class="cross-icon"
                ></iron-icon>
              </paper-button>
            </div>
            <hr />
            <popup-form></popup-form>
          </paper-dialog-scrollable>
        </paper-dialog>
      </main>
    `;
  }
}

customElements.define('default-plate-layout', DefaultPlateLayout);

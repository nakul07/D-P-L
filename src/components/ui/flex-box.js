import { LitElement, html } from 'lit-element';

/**
 * Wrapper component that has all the property of the flex box.
 *
 * ### Usage
 * ```
 * <flex-box>
    components inside flex here
    eg.
    <component-1></component-1>
    <component-2></component-2>
 * </flex-box>
 * ```
 * @customElement
 * @litElement
 */
class FlexBox extends LitElement {
  /**
   * Properties of the component.
   */
  static get properties() {
    return {
      customStyle: String
    };
  }

  /**
   * The renderer for the flex box.
   */
  render() {
    return html`
      <style>
        :host {
          display: flex;
          width: 100%;
          box-sizing: border-box;
        }
        :host(.align-start) {
          align-items: flex-start;
        }
        :host(.align-center) {
          align-items: center;
        }
        :host(.header-container) {
          display: flex;
          align-items: center;
          width: 100%;
          padding: var(--spacing-5x) 0;
        }
        :host(.justify-between) {
          justify-content: space-between;
        }
        :host(.flex-wrap) {
          flex-wrap: wrap;
        }
        :host(.justify-center) {
          justify-content: center;
        }
        :host(.justify-end) {
          justify-content: flex-end;
        }
        :host(.paper-card) {
          width: 100%;
          padding: 12px 16px 12px 8px;
          border-radius: 3px;
          box-shadow: var(--boxShadow-light);
          box-sizing: border-box;
        }
        :host(.box-shadow) {
          box-shadow: var(--boxShadow-light);
        }
        :host(.white) {
          background-color: var(--color-white);
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define('flex-box', FlexBox);

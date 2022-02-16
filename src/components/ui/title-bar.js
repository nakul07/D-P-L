import { LitElement, html } from 'lit-element';

/**
 * Component that renders the title bar in a specific position.
 *
 * ### Usage
 * ```
 * <title-bar class ="header-container/content-title/left-container">
    content here
 * </title-bar>
 * ```
 * 
 * @customElement
 * @litElement
 */
class TitleBar extends LitElement {
  /**
   * Styles.
   */
  static get properties() {
    return {
      customStyle: String
    };
  }

  /**
   * Renderer.
   */
  render() {
    return html`
      <style>
        :host(.left-container) {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
        }
        :host(.header-container) {
          display: flex;
          align-items: center;
          width: 100%;
          font-family: Roboto;
          padding: var(--spacing-5x) 0;
        }
        :host(.content-title) {
          display: inline-block;
          font-size: var(--font-lg);
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define('title-bar', TitleBar);

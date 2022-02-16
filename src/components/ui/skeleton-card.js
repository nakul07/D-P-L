import { LitElement, html, css } from 'lit-element';
import { skeletonLoaderCSS } from '../../constants/cssMixins';

/**
 * Component shown when the campaign cards are not loaded.
 * Loader for the campaign card
 *
 * ### Usage
 * ```
 * <skeleton-card></skeleton-card>
 * ```
 * @customElement
 * @litElement
 */
class SkeletonCard extends LitElement {
  /**
   * Styles for the skeleton card.
   */
  static get styles() {
    return [
      skeletonLoaderCSS,
      css`
        .row {
          display: flex;
          align-items: flex-start;
        }
        .skeleton-contents {
          flex: 1;
        }
      `
    ];
  }

  /**
   * Renderer for the skeleton card.
   */
  render() {
    return html`
      <div class="skeleton-card row">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-contents">
          <div class="skeleton-title"></div>
          <div class="skeleton-content"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('skeleton-card', SkeletonCard);

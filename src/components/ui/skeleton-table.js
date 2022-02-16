import { LitElement, html, css } from 'lit-element';

/**
 * Component shown when the table components are not loaded.
 * Loader for the vaadin grid.
 *
 * ### Usage
 * ```
 * <skeleton-table></skeleton-table>
 * ```
 * @customElement
 * @litElement
 */
class SkeletonTable extends LitElement {
  /**
   * Styles.
   */
  static get styles() {
    return css`
      @keyframes fadeInOut {
        0% {
          opacity: 0.7;
        }
        50% {
          opacity: 0.3;
        }
        100% {
          opacity: 0.7;
        }
      }
      .skeleton-table {
        border-radius: 4px;
        min-height: 200px;
        background-color: var(--color-softGrey);
        padding: var(--spacing-1x) var(--spacing-2x);
        box-sizing: border-box;
      }
      .skeleton-table-row {
        width: 100%;
        height: 23px;
        margin: var(--spacing-3x) 0;
        background: var(--color-loaderGrey);
        animation: fadeInOut 3s ease infinite;
        border-radius: 4px;
      }
    `;
  }

  /**
   * Renderer.
   */
  render() {
    return html`
      <div class="skeleton-table mb-5x">
        <div class="skeleton-table-row"></div>
        <div class="skeleton-table-row"></div>
        <div class="skeleton-table-row"></div>
        <div class="skeleton-table-row"></div>
        <div class="skeleton-table-row"></div>
      </div>
    `;
  }
}

customElements.define('skeleton-table', SkeletonTable);

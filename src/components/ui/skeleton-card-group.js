import { LitElement, html, css } from 'lit-element';

/**
 * Wrapper for more than one skeleton card when used at the same time.
 * ### Usage
 * ```
 * <skeleton-card-group>
    <skeleton-card></skeleton-card>
    <skeleton-card></skeleton-card>
 * </skeleton-card-group>
 * ```
 * @customElement
 * @litElement
 * @polymer
 */
class SkeletonCardGroup extends LitElement {
  /**
   * Styles for the skeleten group container.
   */
  static get styles() {
    return css`
      @keyframes Gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      .skeleton-card-group {
        background-color: var(--color-faintGrey);
        border: 1px solid var(--color-borderGrey);
        border-radius: 4px;
        height: 360px;
        overflow: auto;
      }
      .skeleton-card-group-title {
        height: 25px;
        width: 50%;
        background-image: var(--loader-gradient);
        background-size: 400% 400%;
        animation: Gradient 3s ease infinite;
        border-radius: 4px;
        margin: var(--spacing-4x);
      }
    `;
  }

  /**
   * Renderer.
   */
  render() {
    return html`
      <div class="skeleton-card-group">
        <div class="skeleton-card-group-title"></div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('skeleton-card-group', SkeletonCardGroup);

import { LitElement, css } from 'lit-element';

/**
 * Base class for all pop ups used for the shared CSS.
 * ### Usage
 * ```
 * eg.
 * Class Component extends PopUp {}
 * ```
 * @customElement
 * @litElement
 */
export default class PopUp extends LitElement {
  /**
   * Styles of the popup component.
   */
  static get styles() {
    return css`
      paper-dialog {
        margin: 0;
        padding: var(--spacing-6x) 0 0 0;
      }
      .dialog-wrapper {
        width: 460px;
      }
      .confirmation--dialog--wrapper {
        width: 350px;
      }
      .popup--container {
        top: 15%;
        width: 524px;
      }
      .pd-20 {
        padding: 0 var(--spacing-5x);
      }
      .dialog-title {
        margin: 0;
        line-height: 20px;
        font-size: var(--font-main);
        color: var(--color-grey-900);
        font-family: Roboto;
        font-weight: var(--fontWeight-semibold);
      }
      paper-button.cancel {
        color: gray;
        outline: none;
        font-size: var(--font-md);
        line-height: var(--spacing-9x);
        margin: 0 var(--spacing-2x) 0 0;
        padding: 0 var(--spacing-2x);
      }
      .pd-top {
        padding-top: var(--spacing-4x);
      }
      .mg-top {
        margin-top: var(--spacing-4x);
      }
      .mg-top-20 {
        margin-top: var(--spacing-5x);
      }
      .content {
        word-break: break-all;
      }
      .mg-bottom-20 {
        margin: 0 var(--spacing-4x) 0 0;
      }
      paper-button.submit {
        display: inline-block;
        line-height: var(--spacing-9x);
        font-size: var(--font-md);
        padding: 0 var(--spacing-10x);
        background-color: var(--color-pink);
        color: var(--color-white);
      }
      .dialog--footer {
        margin: 40px 0 20px 0;
      }
      [part='input-field'] {
        background-color: transparent;
        text-decoration: underline;
        border-radius: none;
      }
      .lightgrey {
        color: #9faab7;
      }
      .subtitle {
        font-weight: 500;
        letter-spacing: 1.5px;
        line-height: 16px;
      }
      ul {
        list-style: var(--style-none);
      }
      a {
        text-decoration: var(--style-none);
      }
      .isDisabled > a {
        display: inline-block;
        pointer-events: none;
        text-decoration: none;
        cursor: not-allowed;
      }
      .warning {
        width: 18px;
        height: 18px;
      }
      .bold {
        font-weight: var(--fontWeight-black);
      }
      .grey--text {
        color: var(--color-textGrey);
      }
      .fs-16 {
        font-size: var(--font-main);
      }
      @media only screen and (max+,-width: 524px) {
        .popup--container {
          top: 20%;
          width: 100%;
        }
      }
      ul {
        list-style: none;
      }
      .date-picker {
        width: 100%;
      }
      .button-wrapper {
        display: flex;
        justify-content: flex-end;
        padding: 0 var(--spacing-2x);
        margin: var(--spacing-6x) 0 var(--spacing-2x) 0;
      }
      paper-button {
        display: inline-block;
        line-height: var(--spacing-4x);
        font-size: var(--font-md);
        margin: 0 var(--spacing-2x) 0 0;
        padding: 0 var(--spacing-2x);
        letter-spacing: 0.75px;
        height: 36px;
        font-weight: var(--fontWeight-semibold);
      }
      paper-button.confirm {
        color: var(--color-pink);
      }
      paper-scrollable-dialog {
        margin: var(--spacing-6x) 0;
      }
    `;
  }
}

import { css } from 'lit-element';

/**
 * CSSMixin to be used globally.
 *
 * ### Usage
 * ```
  In your component as-
    import { typography } from 'path';

    Inside lit element class- 
    static get styles() {
      return [
        typography,
        css``
      ];
 * ```
 * @litElement
 */
export const typography = css`
  .typography {
    font-family: var(--theme-font-family);
    font-style: var(--style-normal);
    mix-blend-mode: var(--style-normal);
  }
  .typography-h1 {
    font-weight: var(--fontWeight-thin);
    font-size: var(--font-size-h1);
    line-height: var(--line-height-h1);
    letter-spacing: var(--letter-spacing-light-1);
  }
  .typography-h2 {
    font-weight: var(--fontWeight-thin);
    font-size: var(--font-size-h2);
    line-height: var(--line-height-h2);
    letter-spacing: var(--letter-spacing-light-2);
  }
  .typography-h3 {
    font-weight: var(--fontWeight-normal);
    font-size: var(--font-size-h3);
    line-height: var(--line-height-h3);
    letter-spacing: var(--letter-spacing-regular);
  }
  .typography-h4 {
    font-weight: var(--fontWeight-normal);
    font-size: var(--font-size-h4);
    line-height: var(--line-height-h4);
    letter-spacing: var(--letter-spacing-medium);
  }
  .typography-h5 {
    font-weight: var(--fontWeight-normal);
    font-size: var(--font-size-h5);
    letter-spacing: var(--letter-spacing-regular);
  }
  .typography-h6 {
    font-weight: var(--fontWeight-bold);
    font-size: var(--font-size-h6);
    line-height: var(--line-height-h6);
    letter-spacing: var(--letter-spacing-medium);
  }
  .typography-body-1 {
    font-weight: var(--fontWeight-normal);
    font-size: var(--font-size-body-1);
    line-height: var(--line-height-body);
    letter-spacing: var(--letter-spacing-regular);
  }
  .typography-body-2-regular {
    font-weight: var(--fontWeight-normal);
    font-size: var(--font-size-body-2);
    line-height: var(--line-height-subtitle);
    letter-spacing: var(--letter-spacing-medium);
  }
  .typography-body-2-medium {
    font-weight: var(--fontWeight-bold);
    font-size: var(--font-size-body-2);
    line-height: var(--line-height-subtitle);
    letter-spacing: var(--letter-spacing-medium);
  }
  .typography-subtitle-1 {
    font-weight: var(--fontWeight-normal);
    font-size: var(--font-size-body-1);
    line-height: var(--line-height-body);
    letter-spacing: var(--letter-spacing-subtitle-1);
  }
  .typography-subtitle-2 {
    font-weight: var(--fontWeight-bold);
    font-size: var(--font-size-body-2);
    line-height: var(--line-height-subtitle);
    letter-spacing: var(--letter-spacing-subtitle-2);
  }
  .typography-button {
    font-weight: var(--fontWeight-bold);
    font-size: var(--font-size-body-2);
    line-height: var(--line-height-caption);
    letter-spacing: var(--letter-spacing-button);
  }
  .typography-small-regular {
    font-weight: var(--fontWeight-normal);
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
    letter-spacing: var(--letter-spacing-regular);
  }
  .typography-small-medium {
    font-weight: var(--fontWeight-bold);
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
    letter-spacing: var(--letter-spacing-regular);
  }
  .typography-caption {
    font-weight: var(--fontWeight-normal);
    font-size: var(--font-size-caption);
    line-height: var(--line-height-caption);
    letter-spacing: var(--letter-spacing-caption);
    color: var(--color-grey-700);
  }
  .typography-overline {
    font-weight: var(--fontWeight-bold);
    font-size: var(--font-size-overline);
    line-height: var(--line-height-caption);
    letter-spacing: var(--letter-spacing-overline);
    text-transform: uppercase;
  }
`;

export default {
  typography
};

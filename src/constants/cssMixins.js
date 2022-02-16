import { css } from 'lit-element';

export const scrollerCSS1x = css`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: var(--spacing-2x);
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const scrollerCSS2x = css`
  ::-webkit-scrollbar {
    width: var(--spacing-2x);
    height: var(--spacing-2x);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: var(--spacing-2x);
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const scrollerCSS = css`
  * {
    scrollbar-width: thin;
  }
  ::-webkit-scrollbar {
    width: var(--spacing-1x);
    height: var(--spacing-1x);
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: var(--spacing-2x);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: var(--spacing-2x);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  }
`;

export const alternateScrollerCSS = css`
  * {
    scrollbar-width: thin;
  }
  ::-webkit-scrollbar {
    width: var(--spacing-2x);
    height: var(--spacing-2x);
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: var(--spacing-2x);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: var(--spacing-2x);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  }
`;

export const configurableHeightCSS = css`
  .body-wrapper.height-1x {
    height: 320px;
  }
  .body-wrapper.height-2x {
    height: 520px;
  }
  .body-wrapper.height-3x {
    height: 720px;
  }
  .body-wrapper.height-4x {
    height: 920px;
  }
  .body-wrapper.height-5x {
    height: 1120px;
  }
`;

export const disabledButtonCSS = css`
  .disabled {
    color: var(--color-grey-500);
    background-color: var(--color-grey-200);
  }
`;

export const skeletonLoaderCSS = css`
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

  .skeleton-card {
    border-radius: 4px;
    margin: var(--spacing-4x) var(--spacing-4x) 0;
    background-color: var(--color-softGrey);
    padding: var(--spacing-4x);
    box-sizing: border-box;
    min-height: 100px;
  }

  .skeleton-avatar {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-image: var(--loader-gradient);
    background-size: 400% 400%;
    animation: Gradient 3s ease infinite;
    margin-right: var(--spacing-5x);
  }

  .skeleton-title {
    width: 80%;
    height: 20px;
    background-image: var(--loader-gradient-alt);
    background-size: 400% 400%;
    animation: Gradient 3s ease infinite;
    margin-bottom: var(--spacing-3x);
    border-radius: 4px;
  }

  .skeleton-content {
    width: 100%;
    height: 20px;
    background-image: var(--loader-gradient-alt);
    background-size: 400% 400%;
    animation: Gradient 3s ease infinite;
    border-radius: 4px;
  }
`;

export const resetCSS = css`
  :host,
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default { scrollerCSS };

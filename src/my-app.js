/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';

import './components/default-plate-layout';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyApp extends LitElement {
  /**
   * Gets style.
   *
   * @returns {Array}
   */
  static get styles() {
    return [
      css`
        main {
          margin: 20px;
          height: 100%;
        }
      `,
    ];
  }
  render() {
    return html`<main>
      <default-plate-layout></default-plate-layout>
    </main>`;
  }
}

customElements.define('my-app', MyApp);

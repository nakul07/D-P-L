import { html } from 'lit-element';

/**
 * Renders default view of no data placeholder.
 *
 * @param {String} searchText
 *
 */
export function defaultNoDataRenderer(searchText) {
  return html`
    <mwc-list-item noninteractive>
      No data
      available${searchText
        ? html`
            for <b>${searchText}</b>.
          `
        : '.'}
    </mwc-list-item>
  `;
}

/**
 * Renders default view of selections.
 *
 * @param {Array} selectedOptions
 * @param {String} displayBy
 *
 */
export function defaultSelectionRenderer(selectedOptions, displayBy) {
  const length = selectedOptions.length - 1;

  return html`
    ${selectedOptions.map(
      (option, index) => html`
        <div class="selection-wrapper">
          ${option[displayBy] + (index === length ? '' : ',')}
        </div>
      `
    )}
  `;
}

/**
 * Finds the items in the resultItems which are also in selectedItems, and sorts
 * them with found selectedItems in the beginning.
 *
 * NOTE: using sets and maps lets us achieve this without the quadratic time
 * complexity. Also, the code is fairly readable.
 *
 * @param {Object[]} resultItems
 * @param {Object[]} selectedItems
 * @param {string} sortBy
 * @returns {Object[]}
 */
export function getResultWithSelectedInFront(
  resultItems,
  selectedItems,
  sortBy
) {
  let paramToSortBy = sortBy; 
  let isAscending = true;

  if(sortBy.startsWith('-')){
    paramToSortBy = sortBy.slice(1);
    isAscending = false;
  }

  const sortResults = (a, b) => (a > b ? isAscending? 1:-1 : isAscending? -1:1);

  const resultProps = new Set(
    resultItems.map(item => item[paramToSortBy]).sort(sortResults)
  );
  const resultEntries = resultItems.map(item => [item[paramToSortBy], item]);

  const selectedProps = new Set(
    selectedItems.map(item => item[paramToSortBy]).sort(sortResults)
  );
  const selectedEntries = selectedItems.map(item => [item[paramToSortBy], item]);

  const allUniqueProps = new Set([...selectedProps, ...resultProps]); // the order IS important
  const mergedMap = new Map([...selectedEntries, ...resultEntries]); // the order is NOT important

  const resultPropsWithSelectedInFront = [...allUniqueProps].filter(prop =>
    resultProps.has(prop)
  );
  const resultWithSelectedInFront = resultPropsWithSelectedInFront.map(prop =>
    mergedMap.get(prop)
  );

  return resultWithSelectedInFront;
}

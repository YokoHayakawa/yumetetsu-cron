import {Page} from 'puppeteer';
import {contentGrid} from './contentGrid';


const getValues = (grids: Element[], contentGrid: unknown) => {
  return (contentGrid as number[][]).map(([row, col]) => {
    const cell = grids.find((grid) => {
      const style = grid.getAttribute('style');
      return style?.includes(`grid-row-start: ${row}`) &&
      style?.includes(`grid-column: ${col}`);
    });

    const quotedStr = `"${(cell?.textContent || '-')
      // .replace('\n', ' ')
      .replace(/\s/g, ' ')
    }"`;

    return quotedStr; // Remove ln as to conform to csv format.
  })
    .join(',');
};

export const getBody = async (page: Page) => {
  const rows = await page.$$('.p-table-body-row');
  const promisedValues = rows.map( async (row) =>{
    const grids = await row.$$eval('div', getValues, contentGrid);

    return grids;
  } );

  return (await Promise.all(promisedValues))
    .join('\n');
};

export const getHeader = async (page: Page) =>{
  return await page.$$eval(
    '.p-table-header > div',
    getValues,
    contentGrid,
  );
};

export const getContent = async (page: Page) => {
  return [
    await getHeader(page),
    await getBody(page),
  ].join('\n');
};

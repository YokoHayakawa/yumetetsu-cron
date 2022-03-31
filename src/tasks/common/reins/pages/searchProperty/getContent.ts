import {Page} from 'puppeteer';
import {ContentGrid, contentGrid} from './contentGrid';


const getValues = (
  grids: Element[],
  contentGrid: unknown,
  isHeader: unknown,
) => {
  return (contentGrid as ContentGrid).map(([row, col, type]) => {
    const extractNumber = (str: string) => {
      return str.match(/(\d+)(?:\.(\d+))?/g)
        ?.join('') || '0';
    };

    const cell = grids.find((grid) => {
      const style = grid.getAttribute('style');
      return style?.includes(`grid-row-start: ${row}`) &&
      style?.includes(`grid-column: ${col}`);
    });

    let strValue = cell?.textContent || '-';

    // Resolve cell type
    if (!isHeader) {
      switch (type) {
        case 'num':
          strValue = extractNumber(strValue);
          break;
        case 'date': {
        /* TODO  Improve regex*/
          const extractedDates = strValue.match(/\d+[年月]/g);
          if (extractedDates?.length === 3) {
            const [yr, _, month] = extractedDates;
            strValue = [yr, month].join('-').replace(/[年月]/g, '') + '-1';
          } else {
            strValue = '';
          }
          break;
        }
      }
    }

    // Remove ln, and add quotes as to conform to csv format.
    return `"${strValue.replace(/\s/g, ' ')}"`;
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
    true,
  );
};

export const getContent = async (page: Page) => {
  return [
    await getHeader(page),
    await getBody(page),
  ].join('\n');
};

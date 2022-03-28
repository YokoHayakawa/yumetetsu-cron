/* eslint-disable max-len */

import {Page} from 'puppeteer';
import {gotoSearchProperty} from '../gotoSearchProperty';

enum PropType {
  '売土地' = '01',
  '売一戸建' = '02',
  '売マンション' = '03',
  '売外全(住宅以外建物全部)' = '04',
  '売外一(住宅以外建物一部)' = '05'
}


interface FieldValues {
  propertyType: keyof typeof PropType
}


export const setFormSearchProperty = async (
  page: Page,
  fieldValues: FieldValues,
) =>{
  const {
    propertyType,
  } = fieldValues;

  await page.waitForNetworkIdle();
  await page.$x('//span[contains(text(), \'物件種別１\')]/parent::div/following-sibling::div/select')
    .then((res) => res[0].select(PropType[propertyType]));


  /* 新築・中古区分 */
  await page.$x('//label[contains(text(), "中古")]')
    .then((res) => res[0].click());

  /* 所在地１ */
  await page.$x('//span[text()="都道府県名"]')
    .then(([mainLocation]) => mainLocation.$x('parent::div/following-sibling::div//input'))
    .then(async ([pref, city]) => {
      /* 都道府県名 */

      await pref.click({clickCount: 3});
      await page.keyboard.press('Backspace');
      await pref.type('愛知県', {delay: 100});
      /* 所在地名１ */
      await city.click({clickCount: 3});
      await page.keyboard.press('Backspace');
      await city.type('豊田市', {delay: 100});
    });


  /* 登録年月日 */
  await page.$x('//span[text()="登録年月日"]/parent::div/following-sibling::div//label[text()="３日以内"]')
    .then(([el]) => el.click());


  /* 変更年月日 */
  await page.$x('//span[text()="変更年月日"]/parent::div/following-sibling::div//label[text()="３日以内"]')
    .then(([el])=>el.click());

  /* 検索ボタン */

  await page.$x('//button[text()="検索"]')
    .then(([searchButton]) => searchButton.click());

  return page;
};

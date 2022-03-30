/* eslint-disable max-len */

import {Page} from 'puppeteer';


enum PropType {
  '売土地' = '01',
  '売一戸建' = '02',
  '売マンション' = '03',
  '売外全(住宅以外建物全部)' = '04',
  '売外一(住宅以外建物一部)' = '05'
}

type DateCoverage = '指定なし' | '３日以内' | '１週間以内' | '１ヶ月以内'

export interface FormValues {
  propertyType: keyof typeof PropType,
  oldOrNew ?: '指定なし' | '新築' | '中古',
  registeredDate ?: DateCoverage,
  updatedDate ?: DateCoverage,
  prefecture ?: string,
  city ?: string
}

/**
 * Sets the form according to options
 *
 * @param page
 * @param fieldValues
 * @param fieldValues.propertyType 物件種別１
 * @param fieldValues.oldOrNew 新築・中古区分
 * @returns {Page} page
 */
export const setFormSearchProperty = async (
  page: Page,
  fieldValues: FormValues,
) =>{
  const {
    propertyType,
    oldOrNew = '指定なし',
    registeredDate = '３日以内',
    updatedDate = '３日以内',
    prefecture = '愛知県',
    city= '豊橋市',
  } = fieldValues;

  await page.waitForNetworkIdle();
  await page.$x('//span[contains(text(), \'物件種別１\')]/parent::div/following-sibling::div/select')
    .then(([el]) => el.select(PropType[propertyType]));


  /* 新築・中古区分 */
  await page.$x(`//label[contains(text(), "${oldOrNew}")]`)
    .then(([el]) => el.click());

  /* 所在地１ */
  await page.$x('//span[text()="都道府県名"]')
    .then(([mainLocation]) => mainLocation.$x('parent::div/following-sibling::div//input'))
    .then(async ([inputPref, inputCity]) => {
      /* 都道府県名 */
      await inputPref.click({clickCount: 3});
      await page.keyboard.press('Backspace');
      await inputPref.type(prefecture, {delay: 100});
      /* 所在地名１ */
      await inputCity.click({clickCount: 3});
      await page.keyboard.press('Backspace');
      await inputCity.type(city, {delay: 100});
    });


  /* 登録年月日 */
  await page.$x(`//span[text()="登録年月日"]/parent::div/following-sibling::div//label[text()="${registeredDate}"]`)
    .then(([el]) => el.click());


  /* 変更年月日 */
  await page.$x(`//span[text()="変更年月日"]/parent::div/following-sibling::div//label[text()="${updatedDate}"]`)
    .then(([el])=>el.click());

  /* 検索ボタン */

  await page.$x('//button[text()="検索"]')
    .then(([searchButton]) => searchButton.click());
  await page.waitForNavigation({waitUntil: 'networkidle2'});

  return page;
};

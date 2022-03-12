import {APP_IDS} from '.';
import {uploadAll} from './upload';
import {faker} from '@faker-js/faker';

const data: Partial<CustomersType>[] = [
  {
    '顧客番号': {value: faker.random.alphaNumeric()},
    '氏名': {value: faker.name.findName()},
    '氏名_フリガナ': {value: 'test only'},
  },
];


describe('All Records', ()=>{
  it('are succesfully uploaded.', async ()=>{
    const result = await uploadAll(APP_IDS['customers'], data )
      .catch((err) => console.log(err));
    console.log(result);
    expect(result).toMatchSnapshot();
  });
});

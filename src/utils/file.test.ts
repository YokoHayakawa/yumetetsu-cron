/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
import {fixCSVDateTime} from './file';
import fs from 'fs';

jest.mock('fs').autoMockOn();


describe('File Processor', ()=>{
  it('has fixed datetime in csv.', ()=>{
    const path = 'C:\\Users\\owner\\Documents\\GitHub\\yumetetsu-cron\\dump\\test.csv';
    const result = fixCSVDateTime(path, ['登録日']);
    expect(result).toMatchSnapshot();
  });
});



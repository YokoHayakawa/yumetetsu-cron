/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
import {fixCSVDateTime} from './file';
import fs from 'fs';

jest.mock('fs').autoMockOn();


describe('File Processor', ()=>{
  it('has fixed datetime in csv.', ()=>{
    const path = 'C:\\Users\\owner\\Documents\\GitHub\\yumetetsu-cron\\dump\\test.csv';
    fixCSVDateTime(path, ['登録日']);
    expect(fs.createReadStream).toHaveBeenCalledTimes(1);
  });
});


/* import ReadFile from './ReadFile';
import fs from 'fs';

jest.mock('fs');

describe('67216891', () => {
  const readFile = new ReadFile();

  it('should store', () => {
    const mReadStream = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn().mockImplementation(function (event, handler) {
        handler();
        return this;
      }),
    };
    fs.createReadStream.mockReturnValueOnce(mReadStream);
    readFile.csvFileReader();
    expect(fs.createReadStream).toBeCalledTimes(1);
    expect(mReadStream.pipe).toBeCalledTimes(1);
    expect(mReadStream.on).toBeCalledWith('data', expect.any(Function));
    expect(mReadStream.on).toBeCalledWith('end', expect.any(Function));
  });
}); */

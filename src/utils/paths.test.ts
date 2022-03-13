import {custDlDir, getCSVFiles, rootPath} from './paths';

describe('paths', () =>{
  it('has returned root', ()=>{
    console.log(rootPath.resolve('/dump'));
    expect(rootPath).toMatchSnapshot();
  });

  it('has returned csv files', ()=> {
    const files = getCSVFiles(custDlDir);
    expect(files).toMatchSnapshot();
  });
});

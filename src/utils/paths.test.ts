import {archivePath, custDlDir, dumpPath, getCSVFiles, rootPath} from './paths';

describe('paths', () =>{
  it('has returned root', ()=>{
    expect(rootPath).toMatchSnapshot();
  });

  it('has returned archive path', ()=>{
    expect(archivePath).toMatchSnapshot();
  });


  it('has returned csv files', ()=> {
    const files = getCSVFiles(dumpPath, '84');
    expect(files).toMatchSnapshot();
  });
});

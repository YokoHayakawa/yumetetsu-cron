import {browserTimeOut} from '../../../common/browser/config';
import {deleteMessages, reset} from './reset';

/* describe('Reset', () => {
  it('is successul', async ()=>{
    const result = await reset();
    expect(result).toMatchSnapshot();
  });
});
 */
describe('Delete Messages', () => {
  it('is successul', async ()=>{
    const result = await deleteMessages();
    expect(result).toMatchSnapshot();
  }, browserTimeOut);
});

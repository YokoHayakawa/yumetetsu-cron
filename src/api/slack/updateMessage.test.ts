/* eslint-disable max-len */
import {updateMessage} from './updateMessage';

describe('Update Message', ()=> {
  it('is successful', async ()=>{
    const result = await updateMessage();

    expect(result).toMatchSnapshot();
  });
});

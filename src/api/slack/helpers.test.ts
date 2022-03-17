import {slackChannels} from './config';
import {resolveChannel} from './helpers';

describe('Channel', ()=> {
  it('has been resolved', async ()=>{
    const result = resolveChannel('ハウスドゥ！豊川中央店');
    expect(result).toEqual(slackChannels.toyokawa);
    expect(result).toMatchSnapshot();
  });
});

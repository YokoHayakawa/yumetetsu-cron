import {APP_IDS, kintoneClient} from '../../../../api/kintone';
import getLongTermCust from './getLongTermCust';
import sendToSlack from './sendToSlack';

describe('Send to Slack', ()=> {
  it('is successful', async ()=>{
    const slackSentStatus = 1;
    const result = await getLongTermCust(slackSentStatus);

    const slackResp = await sendToSlack(
      result.records as unknown as LongTermCustomerType[],
      slackSentStatus,
    );

    expect(result.totalCount).toMatchSnapshot();
    expect(slackResp).toMatchSnapshot();
    expect(result).toMatchSnapshot();
  });
});

import {ChatPostMessageResponse} from '@slack/web-api';
import {APP_IDS, kintoneClient} from '../../../../api/kintone';


export const markSuccess = (
  kintoneRec: LongTermCustomerType,
  slackResp: ChatPostMessageResponse) =>{
  const {
    $id: id,
    slackSentStatus,
  } = kintoneRec;

  const {
    channel,
    ts,
  } = slackResp;


  return kintoneClient.record.updateRecord({
    app: APP_IDS['longTermCustomers'],
    id: id.value,
    record: {
      'slackSentStatus': {value: `${+slackSentStatus.value + 1}`},
      'slackChannel': {value: channel},
      'slackTS': {value: ts},
    } as Partial<LongTermCustomerType>,
  });
};

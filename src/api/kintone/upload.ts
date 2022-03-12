import {kintoneClient} from '.';


export const uploadAll = (appId: string, records : Records) => {
  return kintoneClient.record.addAllRecords({
    app: appId,
    records,
  });
};


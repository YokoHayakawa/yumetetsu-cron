export const baseUrl = process.env.KINTONE_BASE_URL;

export const generateLink = (appId: string, recordId: string) =>{
  return `${baseUrl}/k/${appId}/show#record=${recordId}`;
};

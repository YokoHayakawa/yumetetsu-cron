declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KINTONE_CUSTOMERS_TOKEN: string,
      KINTONE_LONGTERM_CUSTOMERS_TOKEN: string,

      SLACK_SIGNING_SECRET: string,
      SLACK_BOT_TOKEN: string,
      SLACK_CHANNEL_ID_TOYOKAWA: string,
      SLACK_CHANNEL_ID_TOYOHASHI: string,
      SLACK_CHANNEL_ID_TOYOTA: string,
      SLACK_CHANNGEL_ID_TEST: string,
    }
  }
}
export {};

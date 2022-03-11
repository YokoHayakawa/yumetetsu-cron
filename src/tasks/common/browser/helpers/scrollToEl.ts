import {ElementHandle, Page} from 'puppeteer';

export const scrollToEl = (page: Page, el: ElementHandle ) =>
  page.evaluate(
    (el)=> {
      el.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      });
    }, el,
  );

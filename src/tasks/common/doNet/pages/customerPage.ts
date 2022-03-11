import {connect, Page} from 'puppeteer';
import {browserURL} from '../../browser/config';


/* Must be on homepage after loging in. */
export default (page?: Page) => {
  const custPage = page || connect({browserURL});
};

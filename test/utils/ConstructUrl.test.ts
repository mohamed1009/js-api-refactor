import { API_URL } from '../../src/Constants.js';
import { constructUrl } from '../../src/utils/ConstructUrl.js';

describe('ConstructUrl tests', () => {
  it('returns a URL object with the right search params', () => {
    const author = 'test author';
    const limit = 1;
    const format = 'json';
    const queryParams = '?q=test+author&limit=1&format=json';
    const url = constructUrl(author, limit, format);

    expect(url).toBeInstanceOf(URL);
    expect(url.toString()).toStrictEqual(`${API_URL}${queryParams}`);
  });
});

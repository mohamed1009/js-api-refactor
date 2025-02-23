import { BookSearchApiClient } from '../src/BookSearchApiClient.js';
import successDataJson from './fixtures/example-response.json';
import { readFile } from 'node:fs/promises';

afterEach(() => {
  jest.clearAllMocks();
});

describe('instantiating the class', () => {
  it('should throw an error when unsupported format is passed in', () => {
    expect(() => {
      new BookSearchApiClient('someformat');
    }).toThrow();
  });
  it('should not throw an error when json format is passed in', () => {
    expect(() => new BookSearchApiClient('json')).not.toThrow();
  });
  it('should not throw an error when xml format is passed in', () => {
    expect(() => new BookSearchApiClient('xml')).not.toThrow();
  });
});

describe('success fetch calls', () => {
  it('handles fetching as json', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => successDataJson,
      })
    ) as jest.Mock;
    const actual = await new BookSearchApiClient('json').getBooksByAuthor(
      'some author',
      1
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(actual).toStrictEqual(successDataJson.results);
    expect(actual).toBeInstanceOf(Array);
  });

  it('handles fetching as xml', async () => {
    // Jest doesn't understand xml so had to read the file using fs
    const xmlFile = await readFile(
      __dirname + '/fixtures/example-response.xml'
    );
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: async () => xmlFile,
      })
    ) as jest.Mock;
    let actual = await new BookSearchApiClient('xml').getBooksByAuthor(
      'some author',
      100
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(actual).toStrictEqual(successDataJson.results);
    expect(actual).toBeInstanceOf(Array);
  });
});

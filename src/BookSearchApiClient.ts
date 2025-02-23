import { XMLParser } from 'fast-xml-parser';
import { validateParams } from './utils/ValidateParams.js';
import { constructUrl } from './utils/ConstructUrl.js';

export class BookSearchApiClient {
  #format: string;

  constructor(format: string) {
    if (format !== 'xml' && format !== 'json') {
      throw new Error('Unsupported format. Only support xml or json');
    }
    this.#format = format;
  }

  private async fetchAsJson(url: URL): Promise<void> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error(`Response status: ${response.status}`);
      }
      const { results } = await response.json();
      return results;
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  private async fetchAsXml(url: URL): Promise<void> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/xml',
        },
      });
      if (response.status !== 200) {
        throw new Error(`Response status: ${response.status}`);
      }
      const parser = new XMLParser();
      const data = await response.text();
      const {
        root: { results },
      } = await parser.parse(data);
      return results;
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  async getBooksByAuthor(authorName: string, limit: number): Promise<void> {
    validateParams(authorName, limit);
    const url = constructUrl(authorName, limit, this.#format);

    if (this.#format === 'json') {
      return await this.fetchAsJson(url);
    }

    if (this.#format === 'xml') {
      return this.fetchAsXml(url);
    }
  }
}

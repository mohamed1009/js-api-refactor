// Example of usage
import { BookSearchApiClient } from './BookSearchApiClient.js';

// If client is interested in json
const client = new BookSearchApiClient('json');
const booksByShakespeare = client.getBooksByAuthor('Shakespeare', 10);

// If client is interested in xml
const client2 = new BookSearchApiClient('xml');
const booksByShakespeare2 = client.getBooksByAuthor('Shakespeare', 10);

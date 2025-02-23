/**
 * Sanity checks the query params to some sensible values
 * without knowing the full context of the app.
 *
 * The authorName is limited to 100 characters
 * The limit is between 1 <= limit <= 100
 * @param authorName The author name
 * @param limit The value to limit the results by
 */
export function validateParams(authorName: string, limit: number) {
  const authorNameRegex = new RegExp(/^.{1,100}/);

  const limitRegex = new RegExp(/^([1-9][0-9]?|100)$/);

  if (!authorNameRegex.test(authorName)) {
    throw new Error(
      'Author name is greater than 100 characters. Please enter less than 100 characters'
    );
  }

  if (typeof limit !== 'number' || !limitRegex.test(limit.toString())) {
    throw new Error('Please enter a limit between 1 to 100');
  }
}

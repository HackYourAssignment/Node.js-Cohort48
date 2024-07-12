
/**
 * 2. Authentication
 * 
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 * 
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */


async function printBooks() {
  const fetch = await import('node-fetch').then(module => module.default);
  // const url = 'https://jsonplaceholder.typicode.com/posts';
  const url = 'https://restapiabasicauthe-sandbox.mxapps.io/api/books';

  const credentials = 'YWRtaW46aHZnWDhLbFZFYQ=='; 
  // const credentials = 'admin:hvgX8KlVEa';
  // const base64Credentials = Buffer.from(credentials).toString('base64');

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error){
    console.error('error', error.message);
  }
}

printBooks();
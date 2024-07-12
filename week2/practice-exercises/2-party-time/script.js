/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

const fetch = require("node-fetch");

async function makeReservation() {
  // YOUR CODE GOES IN HERE
  // !I tested the URL provided, but it appears to be invalid and does not work.
  // !I have tried other URLs and have reached the desired outcome using them.
  // !If you have a better solution or suggestions, I would be happy to benefit from your expertise.
  // const url = 'https://reservation100-sandbox.mxapps.io/api/reservations';

  const url = "https://reqres.in/api/users";
  // const url = 'https://jsonplaceholder.typicode.com/posts';

  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({
    name: "John Doe",
    email: "john.doe@example.com",
    seats: 1
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body
    });
    const data = await response.json();
    console.log(data);
    
  } catch (error) {
    console.error("Error:", error);
  }
}

makeReservation();

# Bcrypt Experiments

This project demonstrates how to use Bcrypt for hashing and verifying passwords in Node.js. Bcrypt is a robust and secure way to handle password encryption, making your applications safer against common attacks like brute force and rainbow table attacks.

## What is Bcrypt?

Bcrypt is a password hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher. It is a key derivation function that incorporates a salt to protect against rainbow table attacks. Bcrypt is widely used for securely storing passwords in web applications.

## Setup

To get started, you need to have Node.js and npm (Node Package Manager) installed. Then, install the Bcrypt library by running the following command:

```sh
npm install bcrypt
```

#  Hashing a Password

Hashing a password means converting it into a fixed-length string of characters, which appears random. This string, called a hash, is unique to the original password. Hashing is a one-way function, meaning it cannot be reversed back to the original password. In Bcrypt, a salt is added to the password before hashing to enhance security. The salt is a random string that ensures even identical passwords have different hashes.

# Verifying a Password

Verifying a password means comparing a plain text password with a hashed password to check if they match. This is useful for authenticating users by comparing the stored hashed password with the password entered by the user. If the plain text password matches the hashed password, the user is authenticated successfully.

# Running the Code

To run the code for hashing and verifying passwords, you can execute a Node.js script that utilizes Bcrypt to perform these tasks. The script will hash a given password and then verify it, printing whether the password is valid or not.

# Conclusion

Using Bcrypt to hash and verify passwords is a critical practice for enhancing the security of password handling in your Node.js applications. Hashing passwords with Bcrypt ensures that even if your password database is compromised, attackers cannot easily retrieve the original passwords. This adds a significant layer of security to your application, protecting user data from common attacks.

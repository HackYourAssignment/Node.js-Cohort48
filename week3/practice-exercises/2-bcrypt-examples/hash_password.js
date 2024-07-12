// first install bcrypt package
const bcrypt = require('bcrypt');

// hash password
async function hashPassword(password) {
  const saltRounds = 12; 
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.error('Error hashing password:', err);
  }
}

// accept password
async function verifyPassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
      console.log('Password is valid!');
    } else {
      console.log('Password is invalid!');
    }
  } catch (err) {
    console.error('Error verifying password:', err);
  }
}

async function run() {
  const password = 'mySecretPassword';
  const hashedPassword = await hashPassword(password);
  await verifyPassword(password, hashedPassword);
}

run();
const signupUser = require('./services/signUpServices');

// Load all listeners
require('./listeners/sendWelcomeEmail');
require('./listeners/addToCRM');
require('./listeners/logToAnalaytics');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('👉 Enter user name: ', name => {
  signupUser(name);
  readline.close();
});
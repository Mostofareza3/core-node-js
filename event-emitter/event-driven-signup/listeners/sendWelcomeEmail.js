const emitter = require('../events');

emitter.on('userCreated', (user) => {
  console.log(`📧 Welcome email sent to ${user.name}`);
});
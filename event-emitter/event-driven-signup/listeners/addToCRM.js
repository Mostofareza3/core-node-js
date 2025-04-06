const emitter = require('../events');

emitter.on('userCreated', (user) => {
  console.log(`📊 User added to CRM: ${user.name}`);
});
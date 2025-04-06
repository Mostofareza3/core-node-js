const emitter = require('../events');

emitter.on('userCreated', (user) => {
  console.log(`📈 Analytics log updated for: ${user.name}`);
});
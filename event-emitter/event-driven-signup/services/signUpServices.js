const emitter = require('../events');

function signupUser(name) {
  const user = { id: Date.now(), name };

  // Imagine DB save
  console.log(`✅ User saved to DB: ${user.name}`);

  // Emit Event
  emitter.emit('userCreated', user);
}

module.exports = signupUser;
const msg = require('../Utils/messages');

function resetUsers(){
  msg.unactUsers.splice(0, msg.unactUsers.length);
  msg.actUsers.splice(0, msg.actUsers.length);

  console.log('Users have been reset');
}

module.exports = {
  resetUsers
}
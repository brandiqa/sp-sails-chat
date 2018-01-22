/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = async function(cb) {

  sails.config.appName = "Sails Chat App";

  // Generate Chat Messages
  try {
    let messageCount = ChatMessage.count();
    if(messageCount > 0){
      return; // don't repeat messages
    }

    let users = await User.find();
    if(users.length >= 3) {
      console.log("Generating messages...")

      let msg1 = await ChatMessage.create({
        message: 'Hey Everyone! Welcome to the community!',
        createdBy: users[1]
      });
      console.log("Created Chat Message: " + msg1.id);

      let msg2 = await ChatMessage.create({
        message: "How's it going?",
        createdBy: users[2]
      });
      console.log("Created Chat Message: " + msg2.id);

      let msg3 = await ChatMessage.create({
        message: 'Super excited!',
        createdBy: users[0]
      });
      console.log("Created Chat Message: " + msg3.id);

    } else {
      console.log('skipping message generation');
    }
  }catch(err){
    console.error(err);
  }

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

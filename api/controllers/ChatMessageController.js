/**
 * ChatMessageController
 *
 * @description :: Server-side logic for managing Chatmessages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	render: (request, response) => {
		return response.view('chatroom');
	},

	postMessage: async (request, response) => {
		// Make sure this is a socket request (not traditional HTTP)
    if (!request.isSocket) {
      return response.badRequest();
    }

		try {
			let user = await User.findOne({id:request.session.userId});
			let msg = await ChatMessage.create({message:request.body.message, createdBy:user });
			if(!msg.id) {
				throw new Error('Message processing failed!');
			}
			msg.createdBy = user;
			ChatMessage.publishCreate(msg);
		} catch(err) {
			return response.serverError(err);
		}


		return response.ok();
	}
};

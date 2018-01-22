/**
* AuthService.js
*
**/

const gravatar = require('gravatar')

// Where to display auth errors
const view = 'homepage';

module.exports = {

  sendAuthError: (response, title, message, options) => {
    options = options || {};
    const { email, name} = options;
    response.view(view, { error: {title, message}, email, name });
    return false;
  },

  validateSignupForm: (request, response) => {
    if(request.body.name == '') {
      return AuthService.sendAuthError(response, 'Signup Failed!', "You must provide a name to sign up", {email:request.body.email});
    } else if(request.body.email == '') {
      return AuthService.sendAuthError(response, 'Signup Failed!', "You must provide an email address to sign up", {name:request.body.name});
    }
    return true;
  },

  checkDuplicateRegistration: async (request, response) => {
    try {
      let existingUser = await User.findOne({email:request.body.email});
      if(existingUser) {
        const options = {email:request.body.email, name:request.body.name};
        return AuthService.sendAuthError(response, 'Duplicate Registration!', "The email provided has already been registered", options);
      }
      return true;
    } catch (err) {
      response.serverError(err);
      return false;
    }
  },

  registerUser: async (data, response) => {
    try {
      const {name, email} = data;
      const avatar = gravatar.url(email, {s:200}, "https");
      let newUser = await User.create({name, email, avatar});
      // Let all sockets know a new user has been created
      User.publishCreate(newUser);
      return newUser;
    } catch (err) {
      response.serverError(err);
      return false;
    }
  },

  login: async (request, response) => {
    try {
			let user = await User.findOne({email:request.body.email});
			if(user) { // Login Passed
				request.session.userId = user.id;
				request.session.authenticated = true;
				return response.redirect('/chat');
			} else { // Login Failed
        return AuthService.sendAuthError(response, 'Login Failed!', "The email provided is not registered", {email:request.body.email});
      }
		} catch (err) {
			return response.serverError(err);
		}
  },

  logout: (request, response) => {
    request.session.userId = null;
		request.session.authenticated = false;
		response.redirect('/');
  }
}

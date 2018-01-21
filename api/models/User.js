/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true,
      unique: true
    },

    avatar: {
      type: 'string',
      required: true,
      defaultsTo: 'https://s.gravatar.com/avatar/e28f6f64608c970c663197d7fe1f5a59?s=60'
    },

    location: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },

    bio: {
      type: 'string',
      required: false,
      defaultsTo:''
    }
  }
};

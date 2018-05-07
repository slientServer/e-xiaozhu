// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
  
    username: {type: String, unique: true},
    password: { type: String },
    role: { type: String, default: 'user' },
    phone: { type: String },
    permission: {type: Number, default: 1},
    email: {type: String},
    group: {type: String},
    gender: {type: String, default: 'male', enum: ['male', 'female']},
    address: {type: String},
    age: {type: Number},
    education: {type: String, enum: ['doctor', 'master', 'bachelor', 'highschool', 'others']},
    univeristy: {type: String},
    source: {type: String, default: 'register'},
    projects: {type: Array}
  
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};

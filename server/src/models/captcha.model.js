// captcha-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const captcha = new Schema({
    code: { type: String, required: true },
    expire: { type: Number },
    type: { type: String, default: 'captcha' },
    origin: { type: String},
    isused: { type: Boolean, default: 'false'}
  }, {
    timestamps: true
  });

  return mongooseClient.model('captcha', captcha);
};

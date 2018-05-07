// projects-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const projects = new Schema({
    
    key: {type: String, unique: true},
    name: {type: String, required: true},
    description: {type: String},
    type: {type: String, enum: ['private', 'public'], default: 'public'},
    condition: {type: Array},
    loginstake: {type: Number, default: 0},
    votestake: {type: Number, default: 0},
    votelimitation: {type: Number, default: 0},
    coinstakepercentage: {type: Number, default: 0},
    addaward: {type: Number, default: 0},
    removeaward: {type: Number, default: 0},
    addcondition: {type: Number, default: 0},
    removecondition: {type: Number, default: 0},
    maxduration: {type: Number, default: 0}

  }, {
    timestamps: true
  });

  return mongooseClient.model('projects', projects);
};

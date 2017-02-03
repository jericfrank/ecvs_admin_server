import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Validation } from './certValidation.js';
import { Files } from './files.js';

export const Tasks = new Mongo.Collection('tasks', {
  transform: function(doc) {
    doc.User = Meteor.users.findOne({
      _id: doc.userId
    });

    doc.Validation = Validation.findOne({
      _id: doc.validationId
    });

    return doc;
  }
});

if (Meteor.isServer) {
  Meteor.publish('tasks.all', function (){

    return [
      Tasks.find({}),
      Meteor.users.find({})
    ]
  });

  Meteor.publish('tasks.owner', function (){

    return [
        Tasks.find({userId: this.userId}),
        Meteor.users.find({}),
        Validation.find({}),
        Files.find({})
      ]
  });

  Meteor.publish('tasks.selected', function (_id){

    return [
        Tasks.find({validationId: _id}),
        Meteor.users.find({})
      ]
  });





Meteor.methods({
  'tasks.insert'(obj) {

    const exists = Tasks.findOne({ validationId: obj.validationId, userId: obj.agentId, status: obj.status });
    if(exists){
      throw new Meteor.Error(400, 'Already exists!');
      return false;
    }

    var data = {
      validationId: obj.validationId,
      userId: obj.agentId,
      status: obj.status,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }


    Tasks.insert(data);
  },

  'tasks.remove'(_id){
    Tasks.remove(_id);
  },

  'tasks.markAsDone'(_id, boolean){

    Tasks.update(_id , {$set: {done: boolean} });
  }
});

}
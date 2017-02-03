import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Files } from './files.js';
import { Tasks } from './tasks.js';

export const Validation = new Mongo.Collection('cert_validation', {
  transform: function(doc) {
    doc.Files = Files.find({
      validationId: doc._id
    }).fetch();

    doc.User = Meteor.users.findOne({
      _id: doc.userId
    });

    return doc;
  }
});

if (Meteor.isServer) {
  Meteor.publish('validation.all', function() {

    var topValidationCursor = Validation.find({});
    var ValidationIds = topValidationCursor.map(function(p) { return p._id });

    return [
      topValidationCursor,
      Files.find({validationId: {$in: ValidationIds}}),
      Meteor.users.find({})
    ]
  });






  Meteor.methods({
  'validation.insert'(text) {
    
    const validationId = Validation.insert({
      userId: Meteor.userId(),
      remarks: text,
      status: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const file = Files.find({userId: Meteor.userId() , active: false}).fetch();

    file.map((data)=>{
      
      Files.update(data._id, {$set: {validationId: validationId, active: true} });
    });

  },
  'validation.updateStatus'(_id, status){
    
    var task = Tasks.find({validationId: _id, status: status}).fetch();
    if(_.isEmpty(task)){

      throw new Meteor.Error(400, 'Cannot proceed, no agent assign to this task!');
    }

    task.map((tasks)=>{
        if(!tasks.done){
          throw new Meteor.Error(400, 'Ensure, assign agent is complete this task!');
        }
    });

    Validation.update(_id, {$set:{ status: status+1 }});
  },

  'validation.undoUpdateStatus'(_id, status){

    Validation.update(_id, {$set:{ status: status-1 }});
  },
  'validation.billing'(_id){
    
    Validation.update(_id, {$set:{ status: 3 }});
  }
});


}


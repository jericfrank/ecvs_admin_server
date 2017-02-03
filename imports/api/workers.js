import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Workers = new Mongo.Collection('workers', {
  transform: function(doc) {

    return doc;
  }
});

if (Meteor.isServer) {
  Meteor.publish('workers.all', function (){

    return [
      Workers.find({})
    ]
  });

}

Meteor.methods({
  'workers.insert'(obj) {
    obj.createdAt = new Date();
    obj.updatedAt = new Date();
    obj.userId = Meteor.userId();

    Workers.insert(obj);
  },
  'workers.remove'(_id) {
  
    Workers.remove(_id);
  },
});
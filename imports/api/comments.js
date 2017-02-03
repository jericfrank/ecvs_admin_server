import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments', {
  transform: function(doc) {
    doc.User = Meteor.users.findOne({
      _id: doc.userId
    });

    return doc;
  }
});

if (Meteor.isServer) {
  Meteor.publish('comments.all', function (){

    return [
      Comments.find({}),
      Meteor.users.find({})
    ]
  });

}

Meteor.methods({
  'comments.insert'(obj) {
    obj.createdAt = new Date();
    obj.updatedAt = new Date();

    Comments.insert(obj);
  },
  'comments.remove'(_id){
    Comments.remove(_id);
  }
});
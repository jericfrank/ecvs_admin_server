import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Certificates } from './certificates.js';
import { Workers } from './workers.js';

export const Attach = new Mongo.Collection('attach_certificate', {
  transform: function(doc) {

    doc.Certificates = Certificates.findOne({
      _id: doc.certificatesId
    });

    doc.Workers = Workers.findOne({
      _id: doc.workersId
    });

    return doc;
  }
});

if (Meteor.isServer) {
  Meteor.publish('attach.all', function (){

    return [
      Attach.find({}),
      Certificates.find({}),
      Workers.find({})
    ]
  });

}

Meteor.methods({
  'attach.insert'(obj) {
    obj.createdAt = new Date();
    obj.updatedAt = new Date();
    obj.active = true;
    obj.userId = Meteor.userId();

    var exist = Attach.findOne({ certificatesId: obj.certificatesId, workersId: obj.workersId, validationId: obj.validationId });
    if(exist){
      throw new Meteor.Error(400, 'Already exists!');
      return false;
    }
    
    Attach.insert(obj);
  },
  'attach.remove'(_id) {
  
    Attach.remove(_id);
  },
  'attach.update'(_id,obj){
    Attach.update(_id , {$set: {remarks: obj.remarks , cost: obj.cost} });
  }
});
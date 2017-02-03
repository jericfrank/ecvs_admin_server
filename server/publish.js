Meteor.publish(null, function (){
  return Meteor.roles.find({})
});

Meteor.publish('users', function (){

  return Meteor.users.find({})
});
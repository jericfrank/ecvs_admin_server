var dropboxStore = new FS.Store.Dropbox("evidence", {
  key: "ornmx8qvs9hxzo8",
  secret: "l18v8auhndhbpii",
  token: "lIqBHFQTjSEAAAAAAAACJMOifp-7kquksKByagjwqlg0GBKHir53tfhyfIyPmVfv", // Don’t share your access token with anyone.
  // folder: "client_uploads", //optional, which folder (key prefix) to use 
  // The rest are generic store options supported by all storage adapters
  // transformWrite: myTransformWriteFunction, //optional
  // transformRead: myTransformReadFunction, //optional
  maxTries: 1 //optional, default 5
});

export const Evidence = new FS.Collection("evidence", {
  stores: [dropboxStore]
});

Evidence.allow({
  	'insert': function () {
    	// add custom authentication code here
    	return true;
  	},
  	'update': function () {

  		return true;
  	},
    download: function(userId, fileObj) {
      return true
    }
});

if (Meteor.isServer) {
	Meteor.publish('evidence.all', function (){
	  return Evidence.find({})
	});


  Meteor.methods({
    'evidence.remove'(_id) {
      Evidence.remove(_id);
    },
    'evidence.update'(_id, text) {
      Evidence.update(_id , {$set: {description: text} });
    },
  });
    
}
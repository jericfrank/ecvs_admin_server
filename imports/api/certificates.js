var dropboxStore = new FS.Store.Dropbox("certificates", {
  key: "ornmx8qvs9hxzo8",
  secret: "l18v8auhndhbpii",
  token: "lIqBHFQTjSEAAAAAAAACJMOifp-7kquksKByagjwqlg0GBKHir53tfhyfIyPmVfv", // Don’t share your access token with anyone.
  // folder: "client_uploads", //optional, which folder (key prefix) to use 
  // The rest are generic store options supported by all storage adapters
  // transformWrite: myTransformWriteFunction, //optional
  // transformRead: myTransformReadFunction, //optional
  maxTries: 1 //optional, default 5
});

export const Certificates = new FS.Collection("certificates", {
  stores: [dropboxStore]
});

Certificates.allow({
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
	Meteor.publish('certificates.all', function (){
	  return Certificates.find({})
	});
}

Meteor.methods({
  'certificates.remove'(_id) {
    Certificates.remove(_id);
  },
  'certificates.update'(_id, text) {
    Certificates.update(_id , {$set: {description: text} });
  },
});
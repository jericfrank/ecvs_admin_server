var dropboxStore = new FS.Store.Dropbox("files", {
  key: "ornmx8qvs9hxzo8",
  secret: "l18v8auhndhbpii",
  token: "lIqBHFQTjSEAAAAAAAACJMOifp-7kquksKByagjwqlg0GBKHir53tfhyfIyPmVfv", // Don’t share your access token with anyone.
  // folder: "client_uploads", //optional, which folder (key prefix) to use 
  // The rest are generic store options supported by all storage adapters
  // transformWrite: myTransformWriteFunction, //optional
  // transformRead: myTransformReadFunction, //optional
  maxTries: 1 //optional, default 5
});

export const Files = new FS.Collection("files", {
  stores: [dropboxStore]
});

// export const Files = new FS.Collection("files", {
//     stores: [new FS.Store.FileSystem("files", { path: process.env.PWD + '/../uploads' })]
// });

Files.allow({
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
	Meteor.publish('files.all', function (){
	  return Files.find({active: false})
	});

  Meteor.methods({
    'files.remove'(_id) {
      Files.remove(_id);
    },
    'files.update.description'(_id, text) {
      Files.update(_id , {$set: {description: text} });
    },
  });

}

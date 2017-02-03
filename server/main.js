import { Meteor } from 'meteor/meteor';

import '../imports/api/files.js';
import '../imports/api/certValidation.js';
import '../imports/api/tasks.js';
import '../imports/api/comments.js';
import '../imports/api/workers.js';
import '../imports/api/certificates.js';
import '../imports/api/evidence.js';
import '../imports/api/attachCertificate.js';

Meteor.startup(() => {
	if(_.isEmpty(Meteor.users.find().fetch()) ) {
		var users = [
			{name:"Jonhy Depp",email:"client@email.com",roles:['1'] , groups: '4'},
			{name:"XYZ Company",email:"client1@email.com",roles:['1'] , groups: '4'},

			{name:"John Agent",email:"agent@email.com",roles:['3'] , groups: '3'},
			{name:"Peter Agent",email:"agent1@email.com",roles:['1','2'] , groups: '3'},
			{name:"Rose Agent",email:"agent2@email.com",roles:['1'] , groups: '3'},

			{name:"Supervisor User",email:"supervisor@email.com",roles:['1'] , groups: '2'},
			{name:"Admin User",email:"admin@email.com",roles:['1','2','3','4'] , groups: '1' }
		];

		_.each(users, function (user) {
			var id;

			id = Accounts.createUser({
				email: user.email,
				password: "password",
				profile: { name: user.name , type: user.type }
			});

			if (user.roles.length > 0) {
				// Need _id of existing user record so this call must come
				// after `Accounts.createUser` or `Accounts.onCreate`
				Roles.addUsersToRoles(id, user.roles, user.groups);
			}

		});
	}


});
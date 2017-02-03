export function adminRole(_id) {

  	return Roles.userIsInRole( _id  , ['1'], '1');
}

export function supervisorRole(_id) {
  	return Roles.userIsInRole( _id  , ['1'], '2');
}

export function clientRole(_id) {
  	return Roles.userIsInRole( _id  , ['1'], '4');
}

export function agentRole(_id) {
  	return Roles.userIsInRole( _id  , ['1','3'], '3');
}
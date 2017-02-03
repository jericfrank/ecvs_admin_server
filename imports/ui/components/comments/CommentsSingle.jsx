import React from "react";

export default class CommentsSingle extends React.Component {
	constructor() {
	    super();
	}
	
	componentDidMount() {
	}

	handleRemove(e){
		e.preventDefault();

		const { comment } = this.props;
		Meteor.call('comments.remove', comment._id , (err)=>{
			if(err){
				Bert.alert( err.message, 'danger', 'growl-top-right' );
			}else{

			}
		});
	}

	render() {
		const { comment , currentUser} = this.props;

 		return	<li key={comment._id}>
 					{ (currentUser._id == comment.userId) ? <a href="#" onClick={this.handleRemove.bind(this)}><i className="fa fa-trash"></i></a> : '' }
 					
 					<b>{comment.User.profile.name}: </b>{comment.comment}
 				</li>
	}
}
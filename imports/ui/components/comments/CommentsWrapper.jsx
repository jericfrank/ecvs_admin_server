import React , { PropTypes } from "react";
import { createContainer } from 'meteor/react-meteor-data';

import CommentsSingle from './CommentsSingle.jsx';

import InputField from '../common/InputField.jsx';
import { statusHelper } from '../../utils/helpers.js';
import { Comments } from '../../../api/comments.js';

class CommentsWrapper extends React.Component {
	constructor() {
	    super();

	    this.state = {
	    	comments: '',
	    	errors: {}
	    }
	}
	
	componentDidMount() {
	}

	handleSubmit(e){
		e.preventDefault();

		const { comments } = this.state;
		const { currentUser , validation } = this.props;
		
		if(!comments){
			this.setState({ errors: {comments: 'This is required'} });
			return false;
		}

		const data = {
			userId: currentUser._id,
			validationId: validation._id,
			status: validation.status,
			comment: comments
		}

		Meteor.call('comments.insert', data , (err)=>{
			if(err){
				Bert.alert( err.message, 'danger', 'growl-top-right' );
			}else{
				this.setState({ errors: {} , comments: '' });
			}
		});

		
	}

	onChange(e){
		const { errors } = this.state;
		delete errors[e.target.name];

		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { comments , currentUser } = this.props;

		const li = comments.map( (comment)=>{
			
			return <CommentsSingle key={comment._id} currentUser={currentUser} comment={comment}/>
		})
 		return	<div className="panel panel-default">
					  <div className="panel-heading">Comments Area</div>
					  <div className="panel-body">

					  	<ul>
					  		{ li }
					  	</ul>

						<form onSubmit={this.handleSubmit.bind(this)}>					  	
					      <InputField
				            field="comments"
				            placeholder="write your comment.. "
				            type="text"
				            value={this.state.comments}
				            error={this.state.errors.comments}
				            onChange={this.onChange.bind(this)}
				          />
						</form>
					  </div>
					</div>
	}
}

CommentsWrapper.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer((props) => {
	const { validation } = props;

	var handle = Meteor.subscribe("comments.all");

  return {
    listLoading: !handle.ready(),
    comments: Comments.find({validationId: validation._id, status: validation.status}).fetch()
  };
}, CommentsWrapper);
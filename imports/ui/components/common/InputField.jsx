import React from "react";
import classnames from "classnames";

class InputField extends React.Component {
	constructor(props) {
	    super(props)
	
	}
	
	componentDidMount() {

	}

	render() {

		const { onChange , error , field , label , type , value , placeholder } = this.props

		return <div className={classnames('form-group', { 'has-error': error })}>
			      	<label className="control-label">{label}</label>
			      	<input autoFocus value={value} type={type} onChange={onChange} name={field} className="form-control" placeholder={placeholder} />
			    	{error && <span className="help-block">{error}</span>}
			    </div>

	}
}

InputField.propTypes = {
	field: React.PropTypes.string.isRequired,
}

InputField.defaultProps = {
	type: 'text'
}

export default InputField;
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';



class UserNameRole extends React.Component {
    state = {
      
    };
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
      this.props.setCommunity(this.props.communities.find(c => c.name === event.target.value).id)
    };
  
    render() {
      const { classes, firstName, lastName, role } = this.props;
  
      return (
        <Typography variant="subtitle2" style={{color: 'white', textAlign: 'center'}}>
            {firstName} {lastName} ({role})
        </Typography>  
        )
    }
}
  
function mapStateToProps(state) {
    const { userDetails, role } = state.user;

    return {
        firstName: userDetails.first_name,
        lastName: userDetails.last_name,
        role
    };
}
  
const connectedUserNameRole = connect(mapStateToProps)(UserNameRole);
  export { connectedUserNameRole as UserNameRole }; 
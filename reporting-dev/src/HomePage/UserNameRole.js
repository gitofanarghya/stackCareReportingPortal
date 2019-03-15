import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';



class UserNameRole extends React.Component {
  
    render() {
      const { classes, firstName, lastName, role } = this.props;
  
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <span style={{color: 'white', textAlign: 'center', fontWeight: 500, fontSize: 13}}>
            {firstName} {lastName} &nbsp;
        </span>  
        <span style={{color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', fontWeight: 400, fontSize: 13}}>
          ({role === 'admin' ? 'Administrator' : role === 'caregiver' ? 'Caregiver' : role === 'installer' ? 'Installer' : role})
        </span>
        </div>  
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
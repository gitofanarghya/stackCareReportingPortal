import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { userActions } from '../_actions';
import { TextField, Button } from '@material-ui/core';


class AccountInfo extends Component {
    state = {
        firstname: this.props.firstname,
        lastname: this.props.lastname,
        emailID: this.props.emailID,
        currentPass: '',
        newPass: '',
        confirmPass: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value });
    }

    savePass = () => {
        this.props.savePass(this.state.currentPass, this.state.newPass)
    }

    saveUserDetails = () => {
        this.props.saveUserDetails(this.state.firstname, this.state.lastname)
    }

    render() {
        return (
          <Fragment>
          <Typography style={{fontSize: 13, color: '#707070', height: '35px', fontWeight: '500'}}>
              General
          </Typography> 
          <form noValidate autoComplete="off">
            <TextField
                name="firstname"
                label="First Name"
                className="firstname-field"
                margin="dense"
                onChange={this.handleChange}
                fullWidth
                value={this.state.firstname}
            />
            <TextField
                name="lastname"
                label="Last Name"
                className="lastname-field"
                margin="dense"
                onChange={this.handleChange}
                fullWidth
                value={this.state.lastname}
            />
            <TextField
                disabled
                name="email"
                label="Email Address"
                className="email-field"
                margin="dense"
                fullWidth
                value={this.state.emailID}
            />
          </form> 
          <Button 
            onClick={this.saveUserDetails}
            disabled={this.state.firstname === this.props.firstname && this.state.lastname === this.props.lastname ? true : false }
          >
            SAVE
          </Button>

          <Typography style={{fontSize: 13, color: '#707070', height: '35px', fontWeight: '500', marginTop: '35px' }}>
              Password
          </Typography> 
          <form noValidate autoComplete="off">
            <TextField
                name="currentPass"
                label="Current Password"
                margin="dense"
                fullWidth
                onChange={this.handleChange}
                value={this.state.currentPass}
                type='password'
            />
            <TextField
                name="newPass"
                label="New Password"
                margin="dense"
                onChange={this.handleChange}
                fullWidth
                value={this.state.newPass}
                type='password'
            />
            <TextField
                name="confirmPass"
                label="Confirm Password"
                margin="dense"
                fullWidth
                onChange={this.handleChange}
                value={this.state.confirmPass}
                type='password'
            />
          </form> 
          <Button 
            onClick={this.savePass}
            disabled={this.state.currentPass === '' ? true : this.state.newPass === '' ? true : this.state.confirmPass === '' ? true : this.state.newPass !== this.state.confirmPass ? true : false }
          >
            SAVE
          </Button>
          </Fragment>
          )
      }

}

function mapStateToProps(state) {
    const { email, first_name, last_name  } = state.user.userDetails;
    return {
        emailID: email,
        firstname: first_name,
        lastname: last_name
    };
}

const mapDispatchToProps = (dispatch) => ({
    saveUserDetails: (firstname, lastname) => {
        dispatch(userActions.saveUserDetails(firstname, lastname))
    },
    savePass: (oldPass, newPass) => {
        dispatch(userActions.savePass(oldPass, newPass))
    }
})
  
const connectedAccountInfo = connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
export { connectedAccountInfo as AccountInfo }; 
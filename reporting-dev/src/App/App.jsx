import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { alertActions } from '../_actions'
import { history } from '../_helpers';
import { PrivateRoute, Loading } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class App extends React.Component {

    state = {
        open: false,
        message: null
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.props.clearAlert()
        this.setState({ open: false, message: null });
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.message !== undefined) {
            if(this.state.open) {
                this.setState({open:false})
                this.setState({open: true, message: nextProps.message})
            } else {
                this.setState({open: true, message: nextProps.message})
            }
        }
    }
    
    render() {
        return ( 
            <Router history={history}>
                <div className="h-100" >
                {/*<Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <PrivateRoute exact path="/" component={HomePage} />
                </Switch>*/}
                {this.props.loggedIn ? <HomePage /> : <LoginPage />}
                <Snackbar
                    key={Date.now()}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                    />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.user;
    const { message } = state.alert
    return {
        loggedIn,
        message
    };
}


const mapDispatchToProps = (dispatch) => ({
    clearAlert: () => {
        dispatch(alertActions.clear());
    },
})


const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App }; 
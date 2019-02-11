import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import {  } from '../_actions';
import { PrivateRoute, Loading } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';

class App extends React.Component {
    
    render() {
        return ( 
            <Router history={history}>
                <div className="h-100" >
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <PrivateRoute exact path="/" component={HomePage} refreshed={this.props.refreshed} />
                </Switch>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { refreshed, loggedIn } = state.user;
    return {
        refreshed,
        loggedIn
    };
}


const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
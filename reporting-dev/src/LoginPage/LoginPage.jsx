import React from 'react';
import { connect } from 'react-redux';
import { userActions, alertActions } from '../_actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Loading } from '../_components';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    AppBar: {
        backgroundColor: "#525963"
    },
    card: {
        //maxHeight: 450
    },
    media: {
        paddingTop: '213.64px',//'56.25%', // 16:9
        'background-size': 'contain'
    },
    forgot: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    }
}

class LoginPage extends React.Component {
    
    state = {
        username: '',
        password: '',
        code: '',
        newPass: '',
        confirmPass: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleSubmit = (e) => {
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password)
        }
    }

    forgotPassword = (e) => {
        this.props.forgotPassword()
    }

    cancel = (e) => {
        this.props.cancel()
        this.setState({
            username: '',
            password: '',
            code: '',
            newPass: '',
            confirmPass: ''
        })
    }

    sendCode = (e) => {
        if(this.state.username !== '') {
            this.props.sendCode(this.state.username)
        } else {
            this.props.alert("please fill email")
        }
        
    }

    reset = (e) => {
        if(this.state.username !== '' && this.state.confirmPass !== '' && this.state.code !== '') {
            if(this.state.newPass === this.state.confirmPass) {
                this.props.reset(this.state.username, this.state.code, this.state.newPass)
            } else {
                this.props.alert("passwords don't match!")
            }
        } else {
            this.props.alert("all fields are mandatory")
        }
        
    }

    render() {
        const { loggingIn, classes, forgotPass, sentCode } = this.props
        return ( loggingIn ? <Loading /> :
            <div style={{height: 'calc(100% - 64px)'}}>
            <AppBar className={classes.AppBar} position="static">
            <Toolbar>
            <Grid container justify="space-between" alignItems='center' style={{height: '64px'}}>
              <Grid item xs={false} sm={false} md={2} className="logo-bg"></Grid>
              <Grid item>
                <Typography variant="display1" style={{color: 'white'}}>
                    Care Portal
                </Typography>
              </Grid>
              <Grid item md={2} style={{ display: 'flex', justifyContent: 'center'}}>
              </Grid> 
            </Grid>

            </Toolbar>            
        </AppBar>
            <Grid className="loginpic" container direction="row" justify="center" alignItems='center' style={{flexGrow: 1}}>
              
              <Grid md={3} sm={6} xs={10} item>
              <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="/img/logo.png"
                />
                <CardContent style={forgotPass ? null : {paddingBottom: 0}}>
                    {
                    forgotPass ? 
                    sentCode ? 
                    <form noValidate autoComplete="off">
                        <div style={{fontSize: 15, fontWeight: 500, paddingTop: 10}}>Forgot password</div>
                        <div style={{fontSize: 13, color: '#707070', paddingTop: 10}}>An email has been sent with a code. You will need to enter code below to reset your password.</div>
                        <TextField
                            name="code"
                            label="Reset Code"
                            placeholder="Enter your code"
                            className="code-field"
                            margin="dense"
                            onChange={this.handleChange}
                            fullWidth
                            value={this.state.code}
                        />
                        <div style={{fontSize: 13, color: '#707070'}}>Didn't receive the code? <span onClick={() => this.sendCode()} style={{color: '#1ADCFF', cursor: 'pointer'}}>send the code again.</span></div>
                        <TextField
                            name="newPass"
                            label="New Password"
                            placeholder="Enter your new password"
                            className="newPass-field"
                            margin="dense"
                            onChange={this.handleChange}
                            fullWidth
                            value={this.state.newPass}
                            type='password'
                        />
                        <TextField
                            name="confirmPass"
                            label="Confirm New Password"
                            placeholder="Enter your new password again"
                            className="confirmPass-field"
                            margin="dense"
                            onChange={this.handleChange}
                            fullWidth
                            value={this.state.confirmPass}
                            type='password'
                        />
                        <br />
                        <Button disabled={this.state.code === '' || this.state.newPass === '' || this.state.confirmPass === ''} variant='contained' onClick={() => this.reset()} style={{marginTop: 8}}>RESET</Button>
                        <Button className={classes.forgot} disableFocusRipple disableTouchRipple onClick={() => this.cancel()} style={{ fontSize: 14, color: '#707070', textTransform: 'capitalize', padding: '0px', marginTop: 8}}>Cancel</Button>
                    </form> : 
                    <form noValidate autoComplete="off">
                        <div style={{fontSize: 15, fontWeight: 500, paddingTop: 10}}>Forgot password</div>
                        <div style={{fontSize: 13, color: '#707070', paddingTop: 10}}>No problem! Enter your email address below and we'll send you a code you can use to reset your password.</div>
                        <TextField
                            name="username"
                            label="Email Id"
                            placeholder="Enter your email id"
                            className="email-field"
                            margin="normal"
                            onChange={this.handleChange}
                            fullWidth
                            value={this.state.username}
                        />
                        <br />
                        <Button disabled={this.state.username === ''} variant='contained' onClick={() => this.sendCode()} style={{marginTop: 8}}>SEND CODE</Button>
                        <Button className={classes.forgot} disableFocusRipple disableTouchRipple onClick={() => this.cancel()} style={{ fontSize: 14, color: '#707070', textTransform: 'capitalize', padding: '0px', marginTop: 8}}>Cancel</Button>
                    </form>  : 
                    <form noValidate autoComplete="off">
                        <TextField
                            name="username"
                            label="Email Id"
                            placeholder="Enter your email id"
                            className="email-field"
                            margin="normal"
                            onChange={this.handleChange}
                            fullWidth
                            value={this.state.username}
                        />
                        <br />
                        <TextField
                            name="password"
                            label="Password"
                            className="password-field"
                            placeholder="Enter your password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            onChange={this.handleChange}
                            fullWidth
                            value={this.state.password}
                        />
                        <br />
                        <Button variant='contained' onClick={() => this.handleSubmit()} style={{marginTop: 8}}>Login</Button>
                        <Button className={classes.forgot} disableFocusRipple disableTouchRipple onClick={() => this.forgotPassword()} style={{ marginTop: 8, fontSize: 13, color: '#707070', display: 'flex', textTransform: 'capitalize', padding: '0px'}}>Forgot password?</Button>
                        
                    </form>
                    }
                </CardContent>
            </Card>
              </Grid>
              <Grid md={6} sm={false} xs={false} item style={{height: '450px'}}>
                <div>
                </div>
              </Grid>
            </Grid>
            </div>       
        
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn, resetPass } = state.user;
    const { forgotPass, sentCode } = resetPass
    return {
        loggingIn,
        forgotPass,
        sentCode
    };
}

const mapDispatchToProps = (dispatch) => ({
    sendCode: (username) => {
        dispatch(userActions.requestCode(username));
    },
    reset: (email, code, newPass) => {
        dispatch(userActions.resetPassword(email, code, newPass))
    },
    login: (email, pass) => {
        dispatch(userActions.login(email, pass));
    },
    forgotPassword: () => {
        dispatch(userActions.forgotPass())
    },
    cancel: () => {
        dispatch(userActions.cancel())
    },
    alert: (msg) => {
        dispatch(alertActions.error(msg))
    }
})

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));
export { connectedLoginPage as LoginPage }; 
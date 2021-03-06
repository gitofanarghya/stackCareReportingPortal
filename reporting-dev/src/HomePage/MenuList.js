import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { userActions } from '../_actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class MenuList extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
    render() {
      const { role, setPage, logout, currentPage } = this.props;
  
      return (
        <List> 
            { role === 'admin' && <ListItem button onClick={() => setPage(1)} style={currentPage === 1 ? {color: '#1ADCFF', fontWeight: 500, fontSize: 14} : {fontWeight: 500, fontSize: 14}}>
              <ListItemIcon style={{color: 'inherit'}}><ListIcon /></ListItemIcon>
              <ListItemText disableTypography style={{color: 'inherit'}} primary='Reports'/>
            </ListItem> }
            {/*<ListItem button onClick={() => setPage(2)} style={currentPage === 2 ? {color: '#1ADCFF', fontWeight: 500, fontSize: 14} : {fontWeight: 500, fontSize: 14}}>
              <ListItemIcon style={{color: 'inherit'}}><SettingsIcon /></ListItemIcon>
              <ListItemText disableTypography style={{color: 'inherit'}} primary='Settings' />
              </ListItem>*/}
            <ListItem button onClick={() => setPage(3)} style={currentPage === 3 ? {color: '#1ADCFF', fontWeight: 500, fontSize: 14} : {fontWeight: 500, fontSize: 14}}>
              <ListItemIcon style={{color: 'inherit'}}><ContactPhoneIcon /></ListItemIcon>
              <ListItemText disableTypography style={{color: 'inherit'}} primary='Support' />
            </ListItem>
            <ListItem button onClick={() => this.handleClickOpen()} style={currentPage === 4 ? {color: '#1ADCFF', fontWeight: 500, fontSize: 14} : {fontWeight: 500, fontSize: 14}}>
              <ListItemIcon style={{color: 'inherit'}}><ExitToAppIcon /></ListItemIcon>
              <ListItemText disableTypography style={{color: 'inherit'}} primary='Logout' />
            </ListItem>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" style={{textAlign: 'center'}}>Log out</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{textAlign: 'center'}}>
                  Are you sure you want to log out of your account?
                </DialogContentText>
              </DialogContent>
                <Button variant='contained' onClick={() => logout()} style={{ margin: 'auto', width: '70%', marginBottom: '10px', backgroundColor: '#EC655F', color: 'white' }}>
                  Log out
                </Button>
                <Button variant='contained'  onClick={this.handleClose} style={{ margin: 'auto', width: '70%', marginBottom: '20px', backgroundColor: '#BDC5CB', color: 'white' }}>
                  Cancel
                </Button>
            </Dialog>
        </List> 
        )
    }
}
  
function mapStateToProps(state) {
    const { role, currentPage } = state.user;
    
    return {
        role,
        currentPage
    };
}

const mapDispatchToProps = (dispatch) => ({
    setPage: (id) => {
      dispatch({type: 'CHANGE_PAGE', id})
    },
    logout: () => {
        dispatch(userActions.logout())
    }
})
  
const connectedMenuList = connect(mapStateToProps, mapDispatchToProps)(MenuList);
  export { connectedMenuList as MenuList }; 
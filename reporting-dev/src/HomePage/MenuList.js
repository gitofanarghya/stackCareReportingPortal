import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { userActions } from '../_actions';


class MenuList extends React.Component {
  
    render() {
      const { adminRole, setPage, logout, currentPage } = this.props;
  
      return (
        <List> 
            { adminRole !== undefined && <ListItem button onClick={() => setPage(1)} style={currentPage === 1 ? {color: '#1ADCFF'} : null}>
              <ListItemIcon style={{color: 'inherit'}}><ListIcon /></ListItemIcon>
              <ListItemText disableTypography style={{color: 'inherit'}} primary='Reports'/>
            </ListItem> }
            <ListItem button onClick={() => setPage(3)} style={currentPage === 3 ? {color: '#1ADCFF'} : null}>
              <ListItemIcon style={{color: 'inherit'}}><SettingsIcon /></ListItemIcon>
              <ListItemText disableTypography style={{color: 'inherit'}} primary='Settings' />
            </ListItem>
            <ListItem button onClick={() => setPage(4)} style={currentPage === 4 ? {color: '#1ADCFF'} : null}>
              <ListItemIcon style={{color: 'inherit'}}><ContactPhoneIcon /></ListItemIcon>
              <ListItemText disableTypography style={{color: 'inherit'}} primary='Support' />
            </ListItem>
            <ListItem button onClick={() => logout()} style={currentPage === 5 ? {color: '#1ADCFF'} : null}>
              <ListItemIcon style={{color: 'inherit'}}><ExitToAppIcon /></ListItemIcon>
              <ListItemText disableTypography style={{color: 'inherit'}} primary='Logout' />
            </ListItem>
        </List> 
        )
    }
}
  
function mapStateToProps(state) {
    const { selectedCommunity, roles, currentPage } = state.user;
    const rolesInCommunity = roles[selectedCommunity] ? roles[selectedCommunity] : null
    const adminRole = rolesInCommunity.find(r => r.name === 'admin')

    return {
        adminRole,
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
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { userActions } from '../_actions';

class Settings extends React.Component {
    
    handleListItemClick = (event, key) => {
        this.props.setSettingType(key)
    };

    render() {
  
      return (
        <Fragment>
        <Typography style={{fontSize: 13, color: '#707070', height: '35px', fontWeight: '500'}}>
            Account
        </Typography>  
        <List dense>
            <ListItem 
                onClick={(event) => this.handleListItemClick(event, 'Account Info')} 
                button 
                style={
                        this.props.selectedSettingType === "Account Info" 
                        ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: 'white', fontWeight: '400'} 
                        : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: '#404040', fontWeight: '400'} 
                    }        
                >
                <ListItemText disableTypography primary='Account Info'/>
            </ListItem>
            <ListItem 
                onClick={(event) => this.handleListItemClick(event, 'Scheduled Reports')} 
                button 
                style={
                        this.props.selectedSettingType === "Scheduled Reports" 
                        ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: 'white', fontWeight: '400'} 
                        : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: '#404040', fontWeight: '400'} 
                    }        
                >
                <ListItemText disableTypography primary='Scheduled Reports'/>
            </ListItem>
        </List>

        <Typography style={{fontSize: 13, color: '#707070', height: '35px', fontWeight: '500', marginTop: '25px'}}>
            Community Settings
        </Typography>  
        <List dense>
            <ListItem 
                onClick={(event) => this.handleListItemClick(event, 'Community Info')} 
                button 
                style={
                        this.props.selectedSettingType === "Community Info" 
                        ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: 'white', fontWeight: '400'} 
                        : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: '#404040', fontWeight: '400'} 
                    }        
                >
                <ListItemText disableTypography primary='Community Info'/>
            </ListItem>
            <ListItem 
                onClick={(event) => this.handleListItemClick(event, 'Staff')} 
                button 
                style={
                        this.props.selectedSettingType === "Staff" 
                        ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: 'white', fontWeight: '400'} 
                        : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: '#404040', fontWeight: '400'} 
                    }        
                >
                <ListItemText disableTypography primary='Staff'/>
            </ListItem>
            <ListItem 
                onClick={(event) => this.handleListItemClick(event, 'Staff Groups')} 
                button 
                style={
                        this.props.selectedSettingType === "Staff Groups" 
                        ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: 'white', fontWeight: '400'} 
                        : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: '#404040', fontWeight: '400'} 
                    }        
                >
                <ListItemText disableTypography primary='Staff Groups'/>
            </ListItem>
        </List>
        </Fragment>
        )
    }
} 

  
function mapStateToProps(state) {
    const { selectedSettingType } = state.user;
    return {
        selectedSettingType
    };
}

const mapDispatchToProps = (dispatch) => ({
    setSettingType: (settingType) => {
        dispatch(userActions.setSettingType(settingType))
    }
})
  
const connectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);
export { connectedSettings as Settings }; 
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import {userActions} from '../_actions'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'



class Reports extends React.Component {

    handleListItemClick = (event, key) => {
        this.setState({ selectedIndex: key });
        this.props.setCommunityUnitFilter(key)
    };
    
    render() {
      const { communityUnitFilter, reports, selectedCommunity } = this.props;

      return (
        <Fragment>
        <Typography style={{fontSize: 13, color: '#707070', height: '35px'}}>
            Report Name
        </Typography>  
        <List dense style={{fontSize: 14, color: '#404040'}}>
            {
                communityUnitFilter === 'community' ?
                reports.community[selectedCommunity].map(r => 
                    <ListItem
                      key={r.name}
                      //onClick={(event) => this.handleListItemClick(event, u.id)}
                      button
                      style={{backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                    >
                        <ListItemText primary={r.name} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="download">
                                <CloudDownloadIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ) :
                reports.unit[communityUnitFilter].map(r => 
                    <ListItem
                      key={r.name}
                      //onClick={(event) => this.handleListItemClick(event, u.id)}
                      button
                      style={{backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                    >
                        <ListItemText primary={r.name} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="download">
                                <CloudDownloadIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }   
        </List>
        </Fragment>
        )
    }
}
  
function mapStateToProps(state) {
    const { communityUnitFilter, reports, selectedCommunity } = state.user;
    return {
        communityUnitFilter,
        reports,
        selectedCommunity
    };
}

const mapDispatchToProps = (dispatch) => ({
    setCommunityUnitFilter: (key) => {
        dispatch(userActions.setCommunityUnitFilter(key))
    }
})
  
const connectedReports = connect(mapStateToProps, mapDispatchToProps)(Reports);
export { connectedReports as Reports }; 
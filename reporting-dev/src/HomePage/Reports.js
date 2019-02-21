import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid } from '@material-ui/core';
import {userActions} from '../_actions'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye'
import { authHeader } from '../_helpers'



class Reports extends React.Component {

    
    showFile(blob) {
        const file = new Blob(
                [blob], 
                {type: 'application/pdf'}
            )
        const fileURL = URL.createObjectURL(file)
        window.open(fileURL);
    }

    view = (r) => {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "omit",
            headers: authHeader(),
            body: null
        };
        fetch(`https://1-6-0-c-dot-care-api-staging.appspot.com/communities/${r.community_id}/reports/${r.id}`, requestOptions)
        .then(r => r.blob())
        .then(this.showFile)
    }

    download = (r) => {
        this.props.download(r.id, r.community_id)
    }
    
    render() {
      const { communityUnitFilter, reports, selectedCommunity } = this.props;

      return (
        reports.community[selectedCommunity] === undefined ? <NoReports /> :  
        <Fragment>
        <Typography style={{fontSize: 13, color: '#707070', height: '35px'}}>
            Report Name
        </Typography>  
        <List dense style={{fontSize: 14, color: '#404040'}}>
            {
                communityUnitFilter === 'community' ?
                reports.community[selectedCommunity].map(r => 
                    <ListItem
                      key={r.filename}
                      //onClick={(event) => this.handleListItemClick(event, u.id)}
                      button
                      style={{backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                    >
                        <ListItemText primary={r.filename} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="download" onClick={() => this.view(r)}>
                                <RemoveRedEyeIcon />
                            </IconButton>
                            <IconButton aria-label="download" onClick={() => this.download(r)}>
                                <CloudDownloadIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ) :
                reports.unit[communityUnitFilter].map(r => 
                    <ListItem
                      key={r.filename}
                      //onClick={(event) => this.handleListItemClick(event, u.id)}
                      button
                      style={{backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                    >
                        <ListItemText primary={r.filename} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="download" onClick={() => this.view(r)}>
                                <RemoveRedEyeIcon />
                            </IconButton>
                            <IconButton aria-label="download" onClick={() => this.download(r)}>
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

const NoReports = () => <Grid item style={{padding: '50px'}}>
                            <Typography style={{fontSize: 13, color: '#707070', height: '35px', lineHeight: '1.96429em', paddingLeft: '15px' }}>
                                No Reports Available
                            </Typography>  
                        </Grid>
  
function mapStateToProps(state) {
    const { communityUnitFilter, reports, selectedCommunity } = state.user;
    return {
        communityUnitFilter,
        reports,
        selectedCommunity
    };
}

const mapDispatchToProps = (dispatch) => ({
    download: (reportID, communityID) => {
        dispatch(userActions.download(reportID, communityID))
    }
})
  
const connectedReports = connect(mapStateToProps, mapDispatchToProps)(Reports);
export { connectedReports as Reports }; 
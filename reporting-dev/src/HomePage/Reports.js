import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid, FormControl, Select } from '@material-ui/core';
import {userActions} from '../_actions'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye'
import { authHeader } from '../_helpers'
import { InputBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const BootstrapInput = withStyles(theme => ({
  input: {
    fontSize: 13,
    color: '#707070',
    border: '1px solid #707070',
    paddingLeft: '5px'
  }
}))(InputBase);

class Reports extends React.Component {

    state = {
        period: 90
    }

    
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
        fetch(`https://care-api-staging.appspot.com/communities/${r.community_id}/reports/${r.id}`, requestOptions)
        .then(r => r.blob())
        .then(this.showFile)
    }

    download = (r) => {
        this.props.download(r.id, r.community_id)
    }

    handleChange = (event) => {
        this.setState({
            period: event.target.value
        })
    }

    date_diff_indays = (date1, date2) => {
        var dt1 = new Date(date1);
        var dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
    
    render() {
      const { communityUnitFilter, reports, selectedCommunity } = this.props;

      const filteredReports =  communityUnitFilter === 'community' ? 
                                reports.community[selectedCommunity].filter(r => this.date_diff_indays(r.start_date, new Date()) < this.state.period) :
                                reports.unit[communityUnitFilter].filter(r => this.date_diff_indays(r.start_date, new Date()) < this.state.period)
                         
      return (
        reports.community[selectedCommunity] === undefined ? <NoReports /> :  
        <Fragment>
        <div style={{display: 'flex'}}>
        <Typography style={{fontSize: 13, color: '#707070', height: '35px'}}>
            Report Name
        </Typography>  
        <FormControl style={{ marginLeft: 'auto', height: '25px', width: '135px', fontSize: 13 }}>
                <Select
                    native
                    value={this.state.period}
                    onChange={this.handleChange}
                    input={<BootstrapInput name="periodFilter" id="filter-period"/>}
                >
                    <option value={30}>Last 1 month</option>
                    <option value={90}>Last 3 months</option>
                    <option value={180}>Last 6 months</option>
                    <option value={365}>Last 12 months</option>
                </Select>
        </FormControl>
        </div>
        <List dense style={{fontSize: 14, color: '#404040', height: 'calc(100% - 35px)', overflow: 'auto'}}>
            {
                filteredReports.map(r => 
                    <ListItem
                      key={r.filename}
                      onClick={() => this.view(r)}
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
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
        .then(blob => {
            const file = new Blob(
                    [blob], 
                    {type: 'application/pdf'}
                )
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(file, r.filename + '.pdf')
                return;
            }
            const fileURL = URL.createObjectURL(file)
            window.open(fileURL);
        })
    }

    download = (r) => {
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
        .then(blob => {
            const file = new Blob(
                    [blob], 
                    {type: 'application/pdf'}
                )
            if (window.navigator && window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(file, r.filename + '.pdf')
                return;
            }
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            const url = URL.createObjectURL(file)
            a.href = url;
            a.download = r.filename + '.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
        })
    }

    handleFilter1 = (event) => {
        this.props.setFilter1(event.target.value)
    }

    handleFilter2 = (event) => {
        this.props.setFilter2(event.target.value)
    }
    


    date_diff_indays = (date1, date2) => {
        var dt1 = new Date(date1);
        var dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }

    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    dateFormatter = (r) => {
        const startDate = new Date(r.start_date)
        const endDate = new Date(r.end_date)
        if (r.period === 'weekly') {
            return `${startDate.getFullYear()} ${this.months[startDate.getMonth()]} ${startDate.getDate()} - ${this.months[endDate.getMonth()]} ${endDate.getDate()}`
        } else {
            return `${startDate.getFullYear()} ${this.monthsFull[startDate.getMonth()]}`
        }
    }

    periodFormatter = (period) => period === 'weekly' ? 'Weekly' : 'Monthly'
    
    render() {
      const { communityUnitFilter, reports, selectedCommunity, filter1, filter2, selectedReportType, reportTypes } = this.props;

      const filtered1Reports = communityUnitFilter === 'community' ? 
                reports.community[selectedCommunity] && reports.community[selectedCommunity].filter(r => this.date_diff_indays(r.start_date, new Date()) < filter2) :
                reports.unit[communityUnitFilter] && reports.unit[communityUnitFilter].filter(r => this.date_diff_indays(r.start_date, new Date()) < filter2)
      const filtered2Reports = filtered1Reports !== undefined && filter1 !== 'All reports' ? filtered1Reports.filter(r => r.period === filter1) : filtered1Reports      
      return (
        filtered2Reports === undefined ? <NoReports /> :  
        <Fragment>
        <div style={{display: 'flex'}}>
        <Typography style={{fontSize: 13, color: '#707070', height: '35px', fontWeight: '500'}}>
            Report Name
        </Typography>
        <div style={{marginLeft: 'auto'}}>
        {reportTypes.filter(rt => rt.report_type === selectedReportType)[0].periods.length > 1 ?   
        <FormControl style={{ marginRight: '5px', height: '25px', width: '135px', fontSize: 13 }}>
                <Select
                    native
                    value={this.props.filter1}
                    onChange={this.handleFilter1}
                    input={<BootstrapInput name="filter1" id="filter1"/>}
                >   
                    <option value={'All reports'}>All reports</option>
                    {reportTypes.filter(rt => rt.report_type === selectedReportType)[0].periods.map(t => 
                        <option value={t}>{t} only</option>    
                    )}
                </Select>
        </FormControl> : null
        }
        <FormControl style={{ marginLeft: '5px', height: '25px', width: '135px', fontSize: 13 }}>
                <Select
                    native
                    value={this.props.filter2}
                    onChange={this.handleFilter2}
                    input={<BootstrapInput name="filter2" id="filter2"/>}
                >
                    <option value={30}>Last 1 month</option>
                    <option value={90}>Last 3 months</option>
                    <option value={180}>Last 6 months</option>
                    <option value={365}>Last 12 months</option>
                </Select>
        </FormControl>
        </div>
        </div>
        <List dense style={{fontSize: 14, color: '#404040', height: 'calc(100% - 35px)', overflow: 'auto'}}>
            {
                filtered2Reports.map(r => 
                    <ListItem
                      key={r.id}
                      onClick={() => this.view(r)}
                      button
                      style={{backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }
                    >
                        <ListItemText primary={`${this.periodFormatter(r.period)} | ${this.dateFormatter(r)}`} />
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
    const { communityUnitFilter, reports, selectedCommunity, reportTypes, selectedReportType, filter1, filter2 } = state.user;
    return {
        communityUnitFilter,
        reports,
        selectedCommunity,
        reportTypes, 
        selectedReportType,
        filter1,
        filter2
    };
}

const mapDispatchToProps = (dispatch) => ({
    setFilter1: (val) => {
        dispatch({ type: 'SET_FILTER1', val})
    },
    setFilter2: (val) => {
        dispatch({ type: 'SET_FILTER2', val})
    }
})
  
const connectedReports = connect(mapStateToProps, mapDispatchToProps)(Reports);
export { connectedReports as Reports }; 
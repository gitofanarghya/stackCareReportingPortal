import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { userActions } from '../_actions';



class ReportType extends React.Component {
    
    handleListItemClick = (event, key) => {
        this.props.setReportType(key, this.props.selectedCommunity)
    };
    
    render() {
      const { sortedReportTypes } = this.props;
  
      return (
        <Fragment>
        <Typography style={{fontSize: 13, color: '#707070', height: '35px', fontWeight: '500'}}>
            Report Type
        </Typography>  
        <List dense>
            {
                sortedReportTypes.map(r => 
                    <ListItem key={r.report_type} onClick={(event) => this.handleListItemClick(event, r.report_type)} button style={this.props.selectedReportType === r.report_type ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: 'white', fontWeight: '400'} : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px', fontSize: 14, color: '#404040', fontWeight: '400'} }>
                        <ListItemText disableTypography primary={r.title}/>
                    </ListItem>
                )
            }   
        </List>
        </Fragment>
        )
    }
}
  
function mapStateToProps(state) {
    const { reportTypes, selectedCommunity, selectedReportType } = state.user;
    const sortedReportTypes = reportTypes.sort((a,b) => a.position - b.position)
    return {
        sortedReportTypes,
        selectedCommunity,
        selectedReportType
    };
}

const mapDispatchToProps = (dispatch) => ({
    setReportType: (reportType, communityID) => {
        dispatch(userActions.setReportType(reportType, communityID))
    }
})
  
const connectedReportType = connect(mapStateToProps, mapDispatchToProps)(ReportType);
export { connectedReportType as ReportType }; 
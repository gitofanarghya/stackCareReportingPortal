import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { userActions } from '../_actions';



class ReportType extends React.Component {
    state = {
        selectedIndex: null,
    };
    
    handleListItemClick = (event, key) => {
        this.setState({ selectedIndex: key });
        this.props.setReportType(key, this.props.selectedCommunity)
    };
    
    render() {
      const { reportTypes } = this.props;
  
      return (
        <Fragment>
        <Typography style={{fontSize: 13, color: '#707070', height: '35px'}}>
            Report Type
        </Typography>  
        <List dense style={{fontSize: 14, color: '#404040'}}>
            {
                reportTypes.map(r => 
                    <ListItem key={r.report_type} onClick={(event) => this.handleListItemClick(event, r.report_type)} button style={this.state.selectedIndex === r ? {backgroundColor: '#1ADCFF', borderBottom: '0.1px solid', height: '35px'} : {backgroundColor: 'white', borderBottom: '0.1px solid', height: '35px'} }>
                        <ListItemText primary={r.title} />
                    </ListItem>
                )
            }   
        </List>
        </Fragment>
        )
    }
}
  
function mapStateToProps(state) {
    const { reportTypes, selectedCommunity } = state.user;
    return {
        reportTypes,
        selectedCommunity
    };
}

const mapDispatchToProps = (dispatch) => ({
    setReportType: (reportType, communityID) => {
        dispatch(userActions.setReportType(reportType, communityID))
    }
})
  
const connectedReportType = connect(mapStateToProps, mapDispatchToProps)(ReportType);
export { connectedReportType as ReportType }; 
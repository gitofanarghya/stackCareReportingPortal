import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Loading } from '../_components'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames';
import { Paper } from '@material-ui/core';
import { userActions } from '../_actions';
import { NavBar } from './NavBar'
import { ReportType } from './ReportType'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { CommunityUnits } from './CommunityUnits';
import { Reports } from './Reports';


class HomePage extends React.Component {
    

    componentDidMount() {
        this.props.init()
    }

    render() {
        const { userReady, selectedReportType, reports, reportTypes, communityUnitFilter } = this.props
        
        return( userReady === false ? <Loading /> :
            <NavBar>
                <Grid container direction='row' alignItems='stretch' justify='flex-start' style={{height:'calc(100% - 100px'}}>
                    {
                        reportTypes === null ? <Loading /> : <Grid item style={{width: '225px', padding: '20px', borderRight: '0.1px solid'}}><ReportType /></Grid>
                    }
                    {
                        selectedReportType === null ? 
                            <Placeholder /> : 
                            reports === null ?
                                null :
                                <Fragment>
                                    <Grid item style={{width: '225px', padding: '20px', borderRight: '0.1px solid'}}><CommunityUnits /></Grid>
                                    <Grid item style={{minWidth: '570px', padding: '20px', flexGrow: 1}}>
                                        {
                                            communityUnitFilter !== null && reports !== null ? <Reports /> : null
                                        }
                                    </Grid>
                                </Fragment>
                    }
                </Grid>
                
            </NavBar>
        )
    }
}

const Placeholder = () => <Grid item style={{padding: '50px', display: 'inline-flex'}}>
                            <Typography style={{color: '#707070'}}>
                                <ArrowBackIcon /> 
                            </Typography>
                            <Typography style={{fontSize: 13, color: '#707070', height: '35px', lineHeight: '1.96429em', paddingLeft: '15px' }}>
                                Select a Report Type
                            </Typography>  
                        </Grid>


function mapStateToProps(state) {
    const { userReady, selectedReportType, reports, reportTypes, communityUnitFilter } = state.user;
    return {
        userReady,
        selectedReportType,
        reports,
        reportTypes,
        communityUnitFilter
    };
}

const mapDispatchToProps = (dispatch) => ({
    init: () => {
        dispatch(userActions.getRoles())
        dispatch(userActions.getCommunities())
        dispatch(userActions.getUserDetails())
    },
})

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage }; 
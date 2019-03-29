import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Loading } from '../_components'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { userActions } from '../_actions';
import { NavBar } from './NavBar'
import { ReportType } from './ReportType'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { CommunityUnits } from './CommunityUnits';
import { Reports } from './Reports';
import { Support } from './Support';


class HomePage extends React.Component {
    
    componentDidMount = () => {
        this.props.init()
        setTimeout(this.refresh, 3000000)
    }

    refresh = (continueInterval = true) => {
        this.props.refresh()
        if(continueInterval) {
            setTimeout(this.refresh, 3000000)
        }
    }

    render() {
        const { userReady, selectedReportType, reports, reportTypes, communityUnitFilter, currentPage } = this.props
        
        return( userReady === false ? <Loading /> :
            <NavBar>
                {
                    currentPage === 1 ? 
                
                        <Grid container direction='row' justify='flex-start' style={{height:'calc(100% - 100px', flexWrap: 'nowrap'}}>
                            {
                                reportTypes === null ? null : <Grid item style={{width: '225px', height: '100%', padding: '20px', borderRight: '0.1px solid'}}><ReportType /></Grid>
                            }
                            {
                                reportTypes === null ? null :
                                selectedReportType === null ? 
                                    <Placeholder /> : 
                                    reports === null ?
                                        null :
                                        <Fragment>
                                            <Grid item style={{width: '225px', height: '100%', padding: '20px', borderRight: '0.1px solid'}}><CommunityUnits /></Grid>
                                            <Grid item style={{minWidth: '570px', height: '100%', padding: '20px', flexGrow: 1}}>
                                                {
                                                    communityUnitFilter !== null && reports !== null ? <Reports /> : null
                                                }
                                            </Grid>
                                        </Fragment>
                            }
                        </Grid>
                    : currentPage === 3 ?
                        <Grid container direction='row' justify='flex-start' style={{height:'calc(100% - 100px', flexWrap: 'nowrap'}}>
                            <Grid item style={{ height: '100%', padding: '20px' }}><Support /></Grid>
                        </Grid>
                    : <div></div>
                }    
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
    const { userReady, selectedReportType, reports, reportTypes, communityUnitFilter, currentPage } = state.user;
    
    return {
        userReady,
        selectedReportType,
        reports,
        reportTypes,
        communityUnitFilter,
        currentPage
    };
}

const mapDispatchToProps = (dispatch) => ({
    init: () => {
        const requestOptions = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "grant_type": "refresh_token",
                "refresh_token": localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'))['refresh_token'],
                "client_id": "rTZ61c51XXJriPBSoGReIeZ7W7MjWy"
            })
        };

        fetch(`https://care-api-prod.appspot.com/oauth2/tokens`, requestOptions)
            .then(response => response.json().then(data => {
                    if(!response.ok) {
                        dispatch(userActions.logout());
                    } else {
                        localStorage.setItem('user', JSON.stringify(data));
                        dispatch({ type: 'REFRESHED', data })
                        dispatch(userActions.getCommunities())
                        dispatch(userActions.getUserDetails())
                    }    
                })
            )
    },
    refresh: () => {
        const requestOptions = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "grant_type": "refresh_token",
                "refresh_token": localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'))['refresh_token'],
                "client_id": "rTZ61c51XXJriPBSoGReIeZ7W7MjWy"
            })
        };

        fetch(`https://care-api-prod.appspot.com/oauth2/tokens`, requestOptions)
            .then(response => response.json().then(data => {
                    if(!response.ok) {
                        dispatch(userActions.logout());
                    } else {
                        localStorage.setItem('user', JSON.stringify(data));
                        dispatch({ type: 'REFRESHED', data })
                    }    
                })
            )
    }
})

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage }; 
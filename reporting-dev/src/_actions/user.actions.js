import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getRoles,
    getCommunities,
    getUnits,
    getUserDetails,
    setCommunity,
    getReportTypes,
    setReportType,
    getReports,
    setCommunityUnitFilter,
    download
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/')
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getRoles() {
    return dispatch => {
        dispatch(request())

        userService.getRoles()
            .then(
                roles => {
                    dispatch(success(roles))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request() { return { type: userConstants.GET_ROLES_REQUEST } }
    function success(roles) { return { type: userConstants.GET_ROLES_SUCCESS, roles } }
    function failure(error) { return { type: userConstants.GET_ROLES_FAILURE, error } }
}

function getCommunities() {
    return dispatch => {
        dispatch(request())

        userService.getCommunities()
            .then(
                communities => {
                    const sortedCommunities = communities.sort((a,b) => a.name.localeCompare(b.name))
                    dispatch(success(sortedCommunities))
                    dispatch(getUnits(sortedCommunities[0].id))
                    dispatch(getReportTypes(sortedCommunities[0].id))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request() { return { type: userConstants.GET_COMMUNITIES_REQUEST } }
    function success(communities) { return { type: userConstants.GET_COMMUNITIES_SUCCESS, communities } }
    function failure(error) { return { type: userConstants.GET_COMMUNITIES_FAILURE, error } }
}

function getUserDetails() {
    return dispatch => {
        dispatch(request())

        userService.getUserDetails()
            .then(
                userDetails => {
                    dispatch(success(userDetails))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request() { return { type: userConstants.GET_USER_DETAILS_REQUEST } }
    function success(userDetails) { return { type: userConstants.GET_USER_DETAILS_SUCCESS, userDetails } }
    function failure(error) { return { type: userConstants.GET_USER_DETAILS_FAILURE, error } }
}


function getUnits(communityID) {
    return dispatch => {
        dispatch(request(communityID))

        userService.getUnits(communityID)
            .then(
                units => {
                    dispatch(success(units))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    } 

    function request(communityID) { return { type: userConstants.GET_UNITS_REQUEST, communityID } }
    function success(units) { return { type: userConstants.GET_UNITS_SUCCESS, units } }
    function failure(error) { return { type: userConstants.GET_UNITS_FAILURE, error } }
}

function setCommunity(id) {
    return dispatch => {
        dispatch(getReportTypes(id))
        dispatch(getUnits(id))
        dispatch(request(id))
    }

    function request(id) { return { type: userConstants.SET_COMMUNITY, id } }
}

function getReportTypes(communityID) {
    return dispatch => {
        dispatch(request(communityID))

        userService.getReportTypes(communityID)
            .then(
                reportTypes => {
                    dispatch(success(reportTypes))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    } 

    function request(communityID) { return { type: userConstants.GET_REPORT_TYPES_REQUEST, communityID } }
    function success(reportTypes) { return { type: userConstants.GET_REPORT_TYPES_SUCCESS, reportTypes } }
    function failure(error) { return { type: userConstants.GET_REPORT_TYPES_FAILURE, error } }
}

function setReportType(reportType, communityID) {
    return dispatch => {
        dispatch(request(reportType))
        dispatch(getReports(reportType, communityID))
    }

    function request(reportType) { return { type: userConstants.SET_REPORT_TYPE, reportType } }
}

function getReports(reportType, communityID) {
    return dispatch => {
        dispatch(request(reportType, communityID))

        userService.getReports(reportType, communityID)
            .then(
                reports => {
                    dispatch(success(reports))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    
    function request(reportType, communityID) { return { type: userConstants.GET_REPORTS_REQUEST, reportType, communityID } }
    function success(reports) { return { type: userConstants.GET_REPORTS_SUCCESS, reports } }
    function failure(error) { return { type: userConstants.GET_REPORTS_FAILURE, error } }
}

function download(reportID, communityID) {
    return dispatch => {
        dispatch(request(reportID, communityID))

        userService.download(reportID, communityID)
            .then(
                data => {
                    dispatch(success())
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    
    function request(reportID, communityID) { return { type: userConstants.DOWNLOAD_REQUEST, reportID, communityID } }
    function success() { return { type: userConstants.DOWNLOAD_SUCCESS } }
    function failure(error) { return { type: userConstants.DOWNLOAD_FAILURE, error } }
}

function setCommunityUnitFilter(key) {
    return dispatch => {
        dispatch(request(key))
    }

    function request(key) { return { type: userConstants.SET_COMMUNITY_UNIT_FILTER, key } }
}
import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from '.';

export const userActions = {
    login,
    logout,
    getCommunities,
    getUnits,
    getUserDetails,
    setCommunity,
    getReportTypes,
    setReportType,
    getReports,
    setCommunityUnitFilter,
    requestCode,
    resetPassword,
    cancel,
    forgotPass
};

function cancel() {
    return dispatch => {
        dispatch({ type: userConstants.CANCEL })
    }
}

function forgotPass() {
    return dispatch => {
        dispatch({ type: userConstants.FORGOTPASS })
    }
}

function requestCode(email) {
    return dispatch => {
        dispatch({ type: userConstants.REQUEST_CODE })

        userService.requestCode(email)
            .then(data => {
                dispatch({ type: userConstants.REQUEST_CODE_SUCCESS })
                dispatch(alertActions.success('Code sent!'))
            }, error => {
                dispatch({ type: userConstants.REQUEST_CODE_FAILURE })
                dispatch(alertActions.error(error))
            })
    }
}

function resetPassword(email, code, newPass) {
    return dispatch => {
        dispatch({ type: userConstants.RESET_PASSWORD_REQUEST })

        userService.resetPassword(email, code, newPass)
            .then(data => {
                dispatch({ type: userConstants.RESET_PASSWORD_SUCCESS })
                dispatch(alertActions.success('Password reset complete. Login to continue'))
            }, error => {
                dispatch({ type: userConstants.RESET_PASSWORD_FAILURE })
                dispatch(alertActions.error(error.toString()));
            })
    }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user))
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
    return dispatch => {
        userService.logout();
        dispatch({ type: userConstants.LOGOUT })
    }
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

function setCommunityUnitFilter(key) {
    return dispatch => {
        dispatch(request(key))
    }

    function request(key) { return { type: userConstants.SET_COMMUNITY_UNIT_FILTER, key } }
}
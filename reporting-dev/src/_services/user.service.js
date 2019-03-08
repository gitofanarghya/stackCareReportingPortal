import { authHeader, history } from '../_helpers';
import FileSaver from 'file-saver';


export const userService = {
    login,
    logout,
    getCommunities,
    getUnits,
    getUserDetails,
    getReportTypes,
    getReports,
    download
};

function login(username, password) {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            "grant_type": "password",
            "email": username,//"anarghya@stacklighting.com",
            "password": password,//"Abcd1234@",
            "client_id": "rTZ61c51XXJriPBSoGReIeZ7W7MjWy"
        })
    };

    return fetch(`https://care-api-staging.appspot.com/oauth2/tokens`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.access_token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getCommunities() {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: authHeader(),
        body: null
    };

    return fetch(`https://care-api-staging.appspot.com/communities`, requestOptions)
        .then(handleResponse)
}

function getUnits(id) {

    const requestOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: authHeader(),
        body: null
    };

    return fetch(`https://care-api-staging.appspot.com/units?community_id=${id}`, requestOptions)
        .then(handleResponse)
    
}

function getReportTypes(id) {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: authHeader(),
        body: null
    };

    return fetch(`https://care-api-staging.appspot.com/report_types`, requestOptions)
        .then(handleResponse)
    
}


function getUserDetails() {

    const requestOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: authHeader(),
        body: null
    };

    return fetch(`https://care-api-staging.appspot.com/users`, requestOptions)
        .then(handleResponse)
    
}

function getReports(reportType, communityID) {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: authHeader(),
        body: null
    };

    return fetch(`https://care-api-staging.appspot.com/reports?community_id=${communityID}&report_type=${reportType}`, requestOptions)
        .then(handleResponse)
    
}

function download(reportID, communityID) {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: authHeader(),
        body: null
    };

    return fetch(`https://care-api-staging.appspot.com/communities/${communityID}/reports/${reportID}`, requestOptions)
    .then(function(response) {
        return response.blob();
      }).then(function(blob) {
        var data = true
        FileSaver.saveAs(blob)
        return data
      }).catch(error => Promise.reject(error))
    
}


function handleResponse(response) {
    return response.json().then(json => {
        const data = json
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }
            logout();
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
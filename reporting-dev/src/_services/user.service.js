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
    download,
    requestCode,
    resetPassword
};

function requestCode(email) {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            "email": email
        })
    };

    return fetch(`https://care-api-staging.appspot.com/login/password/reset`, requestOptions)
        .then(response => {
            return response.json().then(data => {
                if(!response.ok) {
                    const error = data.error.message
                    return Promise.reject(error);
                } else {
                    return data     
                }    
            })
        })

}

function resetPassword(email, code, newPass) {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            "email": email,
            "password": newPass,
            "token": code
        })
    };

    return fetch(`https://care-api-staging.appspot.com/login/password/reset`, requestOptions)
        .then(response => {
            return response.json().then(data => {
                if(!response.ok) {
                    const error = data.error.message
                    return Promise.reject(error);
                } else {
                    return data     
                }    
            })
        })

}

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
        .then(response => {
            return response.json().then(data => {
                if(!response.ok) {
                    logout();
                    const error = data.error.message
                    return Promise.reject(error);
                } else {
                    if (data.access_token) {
                        localStorage.setItem('user', JSON.stringify(data));
                    }
                    return data     
                }    
            })
        })
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

function download(reportID, communityID, fileName) {
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
        FileSaver.saveAs(blob, fileName + '.pdf')
        return data
      }).catch(error => Promise.reject(error))
    
}


function handleResponse(response) {
    return response.json().then(json => {
        const data = json
        if (!response.ok) {
            logout();
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
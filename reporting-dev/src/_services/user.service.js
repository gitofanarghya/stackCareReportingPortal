import { authHeader, history } from '../_helpers';

export const userService = {
    login,
    logout,
    getCommunities,
    getRoles,
    getUnits,
    getUserDetails,
    getReportTypes,
    getReports
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

    return fetch(`https://care-api-prod.appspot.com/oauth2/tokens`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                //window.location.reload(true)
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getRoles() {
    const requestOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: authHeader(),
        body: null
    };

    return fetch(`https://care-api-prod.appspot.com/roles`, requestOptions)
        .then(handleResponse)
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

    return fetch(`https://care-api-prod.appspot.com/communities`, requestOptions)
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

    return fetch(`https://care-api-prod.appspot.com/units?community_id=${id}`, requestOptions)
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

    //return fetch(`https://care-api-prod.appspot.com/units?community_id=${id}`, requestOptions)
    return fetch(`http://localhost:8888/getReportTypes`, requestOptions)
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

    return fetch(`https://care-api-prod.appspot.com/users`, requestOptions)
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

    //return fetch(`https://care-api-prod.appspot.com/users`, requestOptions)
    return fetch(`http://localhost:8888/getReports`, requestOptions)
        .then(handleResponse)
    
}


function handleResponse(response) {
    return response.json().then(json => {
        const data = json
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }
            logout();
            window.location.reload(true);
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
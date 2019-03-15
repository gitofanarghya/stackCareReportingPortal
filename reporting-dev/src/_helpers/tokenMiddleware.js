import { userActions, alertActions } from '../_actions';

const requestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "omit",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
        "grant_type": "refresh_token",
        "refresh_token": localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).refresh_token : null,
        "client_id": "rTZ61c51XXJriPBSoGReIeZ7W7MjWy"
    })
};

let refreshing = false

const checkTokenExpirationMiddleware = store => next => action => {
    if(refreshing) {
        return
    } else {
        const token_expiration =
        JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user"))["access_expiration"];
        const refresh_expiration = 
        JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user"))["refresh_expiration"];
        const a = new Date(token_expiration + 'Z')   
        const r = new Date(refresh_expiration + 'Z')
        const now = new Date()
        if (a < now && now < r) {
            refreshing = true
            localStorage.removeItem('user')
            fetch(`https://care-api-staging.appspot.com/oauth2/tokens`, requestOptions)
                .then(response => response.json().then(data => {
                        if(!response.ok) {
                            store.dispatch(userActions.logout());
                        } else {
                            localStorage.setItem('user', JSON.stringify(data));
                            refreshing = false
                            store.dispatch({type: 'REFRESHED'})
                            store.dispatch(userActions.getCommunities())
                            store.dispatch(userActions.getUserDetails())
                            store.dispatch(alertActions.success('session refreshed'))
                        }    
                    })
                )
        } else if(r < now) {
            store.dispatch(userActions.logout())
        } else {
            return next(action)
        }    
    }
}

export { checkTokenExpirationMiddleware as TokenMiddleware }
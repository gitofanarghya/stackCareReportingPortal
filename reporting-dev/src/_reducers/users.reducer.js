import { userConstants } from '../_constants';


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { 
  loggedIn: true, 
  user, 
  refreshed: true, 
  refreshing: false,
  communities: null,
  units: null,
  userDetails: null,
  userReady: false,
  selectedCommunity: null,
  currentPage: 1,
  reportTypes: null,
  selectedReportType: null,
  reports: null,
  communityUnitFilter: null,
  role: null
} 
: {
  loggedIn: false, 
  user: null, 
  refreshed: true, 
  refreshing: false, 
  communities: null,
  units: null,
  userDetails: null,
  userReady: false,
  selectedCommunity: null,
  currentPage: 1,
  reportTypes: null,
  selectedReportType: null,
  reports: null,
  communityUnitFilter: null,
  role: null
};

export function user(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user,
        refreshed: true,
        refreshing: false,
        communities: null,
        units: null,
        userDetails: null,
        userReady: false,
        selectedCommunity: null,
        currentPage: 1,
        reportTypes: null,
        selectedReportType: null,
        reports: null,
        communityUnitFilter: null,
        role: null
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        refreshed: true,
        refreshing: false,
        communities: null,
        units: null,
        userDetails: null,
        userReady: false,
        selectedCommunity: null,
        currentPage: 1,
        reportTypes: null,
        selectedReportType: null,
        reports: null,
        communityUnitFilter: null,
        role: null
      };
    case userConstants.LOGIN_FAILURE:
      return initialState
    case userConstants.REFRESH_REQUEST:
      return {
        ...state,
        refreshing: true,
        refreshed: false
      };
    case userConstants.REFRESH_SUCCESS:
      return {
        ...state,
        refreshed: true,
        refreshing: false
      };
    case userConstants.REFRESH_FAILURE:
      return {
        loggedIn: false, 
        user: null, 
        refreshed: true, 
        refreshing: false, 
        communities: null,
        units: null,
        userDetails: null,
        userReady: false,
        selectedCommunity: null,
        currentPage: 1,
        reportTypes: null,
        selectedReportType: null,
        reports: null,
        communityUnitFilter: null,
        role: null
      }
    case userConstants.LOGOUT:
      return {
        loggedIn: false, 
        user: null, 
        refreshed: true, 
        refreshing: false, 
        communities: null,
        units: null,
        userDetails: null,
        userReady: false,
        selectedCommunity: null,
        currentPage: 1,
        reportTypes: null,
        selectedReportType: null,
        reports: null,
        communityUnitFilter: null,
        role: null
      }
    case userConstants.GET_COMMUNITIES_REQUEST:
      return {
        ...state,
        loggedIn: true,
      }
    case userConstants.GET_COMMUNITIES_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        communities: action.communities,
        selectedCommunity: action.communities[0].id,
        role: action.communities[0].role,
        currentPage: action.communities[0].role === 'admin' ? 1 : 2,
        userReady: state.userDetails !== null ? true : false
      }
    case userConstants.GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        loggedIn: true,
      }
    case userConstants.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        userDetails: action.userDetails,
        userReady: state.communities !== null ? true : false
      }
    case userConstants.GET_UNITS_REQUEST:
      return {
        ...state,
        loggedIn: true
      }
    case userConstants.GET_UNITS_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        units: action.units
      }
    case userConstants.SET_COMMUNITY:
      return {
        ...state,
        loggedIn: true,
        selectedCommunity: action.id,
        role: state.communities.find(c => c.id === action.id).role,
        currentPage: state.communities.find(c => c.id === action.id).role === 'admin' ? 1 : 2,
        reports: null,
        selectedReportType: null,
        communityUnitFilter: null
      } 
    case 'CHANGE_PAGE':
      return {
        ...state,
        loggedIn: true,
        currentPage: action.id
      } 
    case userConstants.GET_REPORT_TYPES_REQUEST:
      return {
        ...state,
        loggedIn: true
      }
    case userConstants.GET_REPORT_TYPES_SUCCESS:
      return {
        ...state,
        reportTypes: action.reportTypes
      }
    case userConstants.SET_REPORT_TYPE:
      return {
        ...state,
        selectedReportType: action.reportType
      }
    case userConstants.GET_REPORTS_REQUEST:
      return {
        ...state,
        loggedIn: true,
        reports: null
      }
    case userConstants.GET_REPORTS_SUCCESS:
      return {
        ...state,
        reports: action.reports
      }
    case userConstants.SET_COMMUNITY_UNIT_FILTER:
      return {
        ...state,
        communityUnitFilter: action.key
      }
    default:
      return state
  }
}
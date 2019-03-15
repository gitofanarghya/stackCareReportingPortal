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
  role: null,
  resetPass: {
    forgotPass: false,
    sentCode: false
  },
  filter1: 'All reports',
  filter2: 90
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
  role: null,
  resetPass: {
    forgotPass: false,
    sentCode: false
  },
  filter1: 'All reports',
  filter2: 90
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
        role: null,
        resetPass: {
          forgotPass: false,
          sentCode: false
        },
        filter1: 'All reports',
        filter2: 90
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
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
        role: null,
        resetPass: {
          forgotPass: false,
          sentCode: false
        },
        filter1: 'All reports',
        filter2: 90
      };
    case userConstants.LOGIN_FAILURE:
      return initialState
    case 'REFRESHED':
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
        role: null,
        resetPass: {
          forgotPass: false,
          sentCode: false
        },
        filter1: 'All reports',
        filter2: 90
      };
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
        role: null,
        resetPass: {
          forgotPass: false,
          sentCode: false
        },
        filter1: 'All reports',
        filter2: 90
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
        role: state.communities.filter(c => c.id === action.id)[0].role,
        currentPage: state.communities.filter(c => c.id === action.id)[0].role === 'admin' ? 1 : 2,
        reports: null,
        selectedReportType: null,
        communityUnitFilter: null,
        filter1: 'All reports',
        filter2: 90
      } 
    case 'CHANGE_PAGE':
      return {
        ...state,
        loggedIn: true,
        currentPage: action.id
      }
    case 'SET_FILTER1':
      return {
        ...state,
        filter1: action.val
      }
    case 'SET_FILTER2':
      return {
          ...state,
          filter2: action.val
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
    case userConstants.FORGOTPASS:
      return {
        ...state,
        resetPass: {
          forgotPass: true,
          sentCode: false
        }
      }
    case userConstants.CANCEL:
      return {
        ...state,
        resetPass: {
          forgotPass: false,
          sentCode: false
        }
      }
    case userConstants.REQUEST_CODE:
      return state
    case userConstants.REQUEST_CODE_SUCCESS:
      return {
        ...state,
        resetPass: {
          sentCode: true,
          forgotPass: true
        }
      }
    case userConstants.REQUEST_CODE_FAILURE:
      return state
    case userConstants.RESET_PASSWORD_REQUEST:
      return state
    case userConstants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPass: {
          sentCode: false,
          forgotPass: false
        }
      }
    case userConstants.RESET_PASSWORD_FAILURE:
      return state
    default:
      return state
  }
}
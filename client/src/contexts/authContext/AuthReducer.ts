import { FETCH_USER, LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from '../const'

const AuthReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_USER: {
      return {
        user: { ...state?.user, ...payload },
        isLoading: false,
        error: false,
      }
    }

    case LOGIN_START: {
      return {
        user: null,
        isLoading: true,
        error: false,
      }
    }

    case LOGIN_SUCCESS: {
      return {
        user: payload,
        isLoading: false,
        error: false,
      }
    }

    case LOGIN_FAILURE: {
      return {
        user: null,
        isLoading: false,
        error: true,
      }
    }

    case LOGOUT: {
      return {
        user: null,
        isLoading: false,
        error: false,
      }
    }

    default:
      return state
  }
}

export default AuthReducer

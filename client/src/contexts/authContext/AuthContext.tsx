import { createContext, useEffect, useReducer } from 'react'
import { USER } from 'src/const'
import { fetchUser } from './apiCall'
import AuthReducer from './AuthReducer'

const INIT_STATE = {
  error: false,
  isLoading: false,
  user: JSON.parse(localStorage.getItem(USER)) || null,
}

export const AuthContext = createContext(INIT_STATE)

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INIT_STATE)

  useEffect(() => {
    // refresh user data, update localStorage
    if (state.user?.user_id) fetchUser(state.user?.user_id, dispatch)
  }, [state.user?.user_id])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { supabase } from '../utils/supabase'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: null
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    case 'SET_INITIAL_LOADING':
      return { ...state, initialLoading: action.payload }
    default:
      return state
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  initialLoading: true,
  error: null
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error)
          dispatch({ type: 'SET_INITIAL_LOADING', payload: false })
          return
        }

        if (session?.user) {
          // Get user profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profile) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                id: session.user.id,
                email: session.user.email,
                ...profile
              }
            })
          }
        }
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        dispatch({ type: 'SET_INITIAL_LOADING', payload: false })
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Get user profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profile) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                id: session.user.id,
                email: session.user.email,
                ...profile
              }
            })
          }
        } else if (event === 'SIGNED_OUT') {
          dispatch({ type: 'LOGOUT' })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' })

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error
      }

      return { success: true }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message })
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      dispatch({ type: 'LOGOUT' })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateUser = async (userData) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', state.user.id)
        .select()
        .single()

      if (error) {
        throw error
      }

      dispatch({ type: 'UPDATE_USER', payload: data })
      return { success: true }
    } catch (error) {
      console.error('Update user error:', error)
      return { success: false, error: error.message }
    }
  }

  const value = {
    ...state,
    login,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
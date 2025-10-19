// import { useEffect, useState, useCallback } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState, AppDispatch } from '@/store'
// import { logoutUser, refreshToken, fetchUserProfile } from '@/store/slices/authSlice'
// import { logger } from '@/utils/logger'

// /**
//  * Production-grade useAuth hook for managing authentication state.
//  */
// export const useAuth = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
//   const [initialized, setInitialized] = useState(false)

//   // ✅ Fetch profile if token is present but user data missing
//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (token && !user) {
//       dispatch(fetchUserProfile())
//         .unwrap()
//         .catch((err) => logger.error('Failed to fetch profile:', err))
//         .finally(() => setInitialized(true))
//     } else {
//       setInitialized(true)
//     }
//   }, [dispatch, user])

//   // ✅ Refresh token periodically
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const token = localStorage.getItem('refreshToken')
//       if (token) dispatch(refreshToken())
//     }, 1000 * 60 * 15) // every 15 mins
//     return () => clearInterval(interval)
//   }, [dispatch])

//   const logout = useCallback(() => {
//     dispatch(logoutUser())
//   }, [dispatch])

//   return {
//     user,
//     isAuthenticated,
//     loading,
//     initialized,
//     logout,
//   }
// }

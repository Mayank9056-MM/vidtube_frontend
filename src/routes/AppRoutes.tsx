import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

/**
 * Protect routes based on auth state
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, initialized } = useAuth()

  if (!initialized) return <p>Loading...</p>
  return isAuthenticated ? children : <Navigate to="/login" />
}

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/watch/:id" element={<Watch />} />

        {/* Protected Routes */}
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

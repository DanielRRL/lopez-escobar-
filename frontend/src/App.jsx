import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/Login.jsx'
import DashboardPage from './Pages/Dashboard.jsx'
import { AuthProvider } from "./Context/AuthContext.jsx";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

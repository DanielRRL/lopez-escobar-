import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/Login.jsx'
import DashboardPage from './Pages/Dashboard.jsx'
import ProjectPage from "./Pages/Project.jsx";
import TaaPage from "./Pages/TaskPage.jsx"
import { AuthProvider } from "./Context/AuthContext.jsx";
import TaskPage from "./Pages/TaskPage.jsx";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/tasks" element={<TaskPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/Login.jsx'
import DashboardPage from './Pages/Dashboard.jsx'
import ProjectsPage from "./Pages/ProjectPage.jsx";
import TasksPage from "./Pages/TaskPage.jsx"
import { AuthProvider } from "./Context/AuthContext.jsx";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/tasks/:projectId" element={<TasksPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

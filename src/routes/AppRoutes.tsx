import DetalleTareaPage from "../pages/DetalleTareaPage";
import LandingPage from "../pages/LandingPage";
import { Route, Routes } from "react-router-dom";



const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/detalle/:taskId" element={<DetalleTareaPage />} />
    </Routes>
  )
}

export default AppRoutes
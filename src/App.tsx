import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ButtonPage from "./pages/ButtonPage";
import InstallationPage from "./pages/InstallationPage";
import IntroductionPage from "./pages/IntroductionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/introduction" element={<IntroductionPage />} />
          <Route path="/installation" element={<InstallationPage />} />
          <Route path="/components/button" element={<ButtonPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

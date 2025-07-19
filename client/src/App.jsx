import "./App.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import IntroductionPage from "./pages/IntroductionPage";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<IntroductionPage />} />
      </Routes>
    </>
  );
}

export default App;

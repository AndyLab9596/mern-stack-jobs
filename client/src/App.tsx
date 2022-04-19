import React from "react";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Error from "./pages/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={LandingPage} />
        <Route path="/register" element={Register} />
        <Route path="*" element={Error} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

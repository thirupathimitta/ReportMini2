import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Layouts/Home";
import Report from "./Modules/Pages/create-report/Report";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/reports"} element={<Report />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

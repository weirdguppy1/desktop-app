import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Editor from "./pages/Editor/Editor";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Calender from "./pages/Calender/Calender";
import Settings from "./pages/Settings/Settings";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

function App() {
  return (
    <HashRouter>
      <Layout>
        <Toaster />
        {/* <SideBar /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/editor/:fileName" element={<Editor />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;

import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Editor from "./pages/Editor/Editor";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Calender from "./pages/Calender/Calender";
import SideBar from "./components/Sidebar";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

function App() {
  return (
    <HashRouter>
      <Layout>
        <SideBar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/editor/:fileName" element={<Editor />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;

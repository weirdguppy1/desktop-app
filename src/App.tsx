import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

function App() {
  return (
    <HashRouter>
      <Layout>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;

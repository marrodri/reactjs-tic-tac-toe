// dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// function components
import App from "./App";
import Game from "./routes/game";
import AboutThis from "./routes/aboutThis";

// ==============================

// TODO: what is createRoot the same as the runApp from flutter.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      {/* nest these routes inside App */}
      <Route path="game" element={<Game />} />
      <Route path="aboutThis" element={<AboutThis />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>404: there's nothing here.</p>
          </main>
        }
      />
    </Routes>
    <Game />
  </BrowserRouter>
);

// other functions =================

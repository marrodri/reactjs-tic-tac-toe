import { Routes, Route } from "react-router-dom";

// routes
import Header from "./components/header";
import Layout from "./components/layout";
import Game from "./pages/game";
import AboutThis from "./pages/aboutThis";
import Resources from "./pages/resources";

export default function App() {
  return (
    <div className="w-screen h-screen bg-sky-300">
    <Header />
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* nest these routes inside App */}
        <Route path="game" element={<Game />} />
        <Route path="about" element={<AboutThis />} />
        <Route path="resources" element={<Resources />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>404: there's nothing here.</p>
            </main>
          }
        />
      </Route>
    </Routes>
    </div>
  )
}
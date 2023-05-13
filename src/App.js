import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lyric from "./pages/Lyric/lyric";
import Home from "./pages/Home/home";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lyric" element={<Lyric />} />
        </Routes>
      </Router>
    </div>
  );
}

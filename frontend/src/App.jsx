import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Predict from "./pages/Predict.jsx";
import './styles.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="wrap">
          Educational project — not a medical device. Always consult a qualified clinician.
        </div>
      </footer>
    </>
  );
}

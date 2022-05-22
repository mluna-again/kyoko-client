import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";

function App() {
  return (
    <>
      <ToastContainer position="top-center" pauseOnHover theme="colored" />
      <div>
        <Link to="/">Home</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:roomId" element={<Room />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

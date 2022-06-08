import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" pauseOnHover theme="colored" />
      <div>
        <nav className={styles.nav}>
          <Link className={styles.homeLink} to="/">
            <span>🃖</span> Kyoko
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:roomId" element={<Room />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

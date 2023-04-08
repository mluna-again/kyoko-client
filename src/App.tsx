import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import cx from "classnames";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/dist/sweetalert2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";
import styles from "./App.module.css";
import { DEFAULT_THEME } from "./constants/theme";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || DEFAULT_THEME;
    document.body.className = theme;
  }, []);

  return (
    <>
      <ToastContainer
        pauseOnFocusLoss={false}
        position="top-center"
        pauseOnHover
        theme="colored"
      />
      <div className={cx(styles.container)}>
        <nav className={styles.nav}>
          <Link className={styles.homeLink} to="/">
            <span>
              <FontAwesomeIcon className={styles.logo} icon={faDiamond} />
            </span>{" "}
            <span>Kyoko</span>
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

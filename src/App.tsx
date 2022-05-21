// import { Socket, Channel } from "phoenix";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

// const SERVER_URL: string = process.env.SERVER_URL
//   ? `wss://${process.env.SERVER_URL}/socket`
//   : "ws://localhost:4000/socket";

// const socket = new Socket(SERVER_URL);
// socket.connect();
// socket.onOpen(() => console.log("Socket connected"));
// socket.onClose(() => console.log("Socket disconnected"));
// socket.onError(console.error);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:room_id" element={<Home />} />
    </Routes>
  );
}

export default App;

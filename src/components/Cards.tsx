import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import { UserType } from "../constants/types";

type Options = {
  playerName: string;
  showCards: boolean;
  showClock: boolean;
  users: UserType[];
};

const Cards = ({ users, showCards, showClock, playerName }: Options) => {
  return (
    <AnimatePresence>
      {users.map((user) => (
        <motion.div
          key={user.name}
					initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.2 }}
        >
          <Card
            user={user}
            playerName={playerName}
            show={showCards}
            showClock={showClock}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default Cards;

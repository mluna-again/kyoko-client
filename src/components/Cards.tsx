import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import { UserType } from "../constants/types";

type Options = {
  playerName: string;
  showCards: boolean;
  showClock: boolean;
  users: UserType[];
  ratingType?: string;
};

const Cards = ({
  users,
  showCards,
  showClock,
  playerName,
  ratingType,
}: Options) => {
  const orderedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <AnimatePresence>
      {orderedUsers.map((user) => (
        <motion.div
          key={user.name}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.2 }}
        >
          <Card
            ratingType={ratingType}
            user={user}
            playerName={playerName}
            show={showCards}
            showClock={showClock}
            team={user.team}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default Cards;

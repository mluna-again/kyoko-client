import { createContext } from 'react';
import { Channel} from 'phoenix';

type RoomContextType = {
	channel?: Channel
	loggedUser?: string
}

const RoomContext = createContext<RoomContextType>({});

export default RoomContext;

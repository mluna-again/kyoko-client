import { createContext } from 'react';
import { Channel} from 'phoenix';

type RoomContextType = {
	channel?: Channel
}

const RoomContext = createContext<RoomContextType>({});

export default RoomContext;

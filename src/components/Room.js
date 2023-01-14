import { motion } from 'framer-motion';
import { AnimatePresence } from "framer-motion"
import './Room.css'
import generateUserInfo from "../helper";
import RoomPlayer from './RoomPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

function Room({joinGame, room}) {
    const player1 = room.players[0] ? generateUserInfo(room.players[0]) : null
    const player2 = room.players[1] ? generateUserInfo(room.players[1]) : null

    return (
        <motion.li className="room"
            initial={{x: '100vw'}}
            animate={{x: '0'}}
            whileHover={ {y: '-3px'} }>
            <div className="room-info">
                {room.name}
            </div>
            <div className="player">
                <AnimatePresence>
                    {player1 && <RoomPlayer key="1" player={player1} />}
                    {player2 && <RoomPlayer key="2" player={player2} />}
                </AnimatePresence>
            </div>
            <div className="room-action">
                <motion.button onClick={joinGame}
                    whileHover={ {scale: 1.05} }
                    >
                    Enter <FontAwesomeIcon icon={faRightToBracket} />
                </motion.button>
            </div>
        </motion.li>
     );
}

export default Room;

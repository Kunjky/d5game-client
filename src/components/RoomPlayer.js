import { motion } from "framer-motion"

function RoomPlayer({ player }) {
    return (
        <motion.div className="room-player"
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ delay: 0.7 }}
            exit={{ scale: 0 }}
        >
            <div className="online-avatar" dangerouslySetInnerHTML={ { __html: player.avatar }} >
            </div>
            {/* <img className="online-avatar" src={player.avatar} alt={player.username} /> */}
            <div>{player.username}</div>
        </motion.div>
    )
}

export default RoomPlayer

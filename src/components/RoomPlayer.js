import { motion } from "framer-motion"

function RoomPlayer({ player }) {
    return (
        <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ delay: 0.7 }}
            exit={{ scale: 0 }}
        >
            <img className="online-avatar" src={player.avatar} alt={player.username} />
            <div>{player.username}</div>
        </motion.div>
    )
}

export default RoomPlayer

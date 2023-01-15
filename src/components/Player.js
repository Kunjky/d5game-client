import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"

function Player({ player, position, myUser }) {
    return (
        <motion.div className={'player-info-block-' + position}
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0, opacity: 0.5 }}
            transition={{ delay: 0.7 }}
        >
            <img className="online-avatar" src={player.avatar} alt={player.username} />
            <div>
                {player.username}
                { myUser.id === player.id && <span className="you"> (tôi)<FontAwesomeIcon icon={faStar} /></span>}
            </div>
        </motion.div>
    )
}

export default Player

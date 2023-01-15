import './SingleCard.css'
import { motion } from 'framer-motion'
import { faBitcoinSign, faYen, faYenSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SingleCard(prop) {
    const { card, handleChoice, flipped } = prop

    const handleClick = () => {
        handleChoice(card)
    }

    return (
        <motion.div className="card"
            whileHover={{y: '-3px', borderWidth: '4px' }}>
            <div className={ flipped ? 'flipped' : ''}>
                <img className="front" src={card.src} alt="card front"  />
                <div className="back" onClick={handleClick}>
                    <FontAwesomeIcon icon={faYen} ></FontAwesomeIcon>
                </div>
            </div>
        </motion.div>
    )
}

export default SingleCard

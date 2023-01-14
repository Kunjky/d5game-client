import './SingleCard.css'
import { motion } from 'framer-motion'

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
                <img className="back" src="/img/cover.png" onClick={handleClick} alt="cover"  />
            </div>
        </motion.div>
    )
}

export default SingleCard

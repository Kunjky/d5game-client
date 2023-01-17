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
            whileHover={ !flipped ? {y: '-3px', scale: 1.2} : {y: '0', scale: 1} }
            initial={{y: '100vh' }}
            animate={{y: 0}}
            >
            <div className={ flipped ? 'flipped' : ''}>
                <img className="front" src={card.src} alt="card front"  />
                <img className="back" src="/img/cover-tet.png" alt="card back"  />
                {/* <div className="back" onClick={handleClick}>
                    <FontAwesomeIcon icon={faYen} ></FontAwesomeIcon>
                </div> */}
            </div>
        </motion.div>
    )
}

export default SingleCard

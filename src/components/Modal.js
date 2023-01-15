import { faCheckCircle, faFaceDizzy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion"
import './Modal.css'

function Modal({ myUser, isWin, closeModal }) {
    let content = (
        <>
            <div className="modal-header">
                <FontAwesomeIcon icon={faCheckCircle} />
                <h3>WINNER</h3>
                <img className="online-avatar" src={myUser.avatar} alt={myUser.username} />
                <div>{myUser.username}</div>
            </div>
            <div className="modal-body">
                <button className="modal-button">UHm!</button>
            </div>
        </>
    )

    if (!isWin) {
        content = (
            <>
                <div className="modal-header modal-lose">
                    <FontAwesomeIcon icon={faFaceDizzy} />
                    <h3>LOSE</h3>
                    <img className="online-avatar" src={myUser.avatar} alt={myUser.username} />
                    <div>{myUser.username}</div>
                </div>
                <div className="modal-body">
                    <button className="modal-button modal-lose">UHm!</button>
                </div>
            </>
        )
    }

    return (
        <div onClickCapture={closeModal} className="overlay">
            <motion.div className="modal"
                animate={{scale: 1}}
                initial={{scale: 0}}>
                {content}
            </motion.div>
        </div>
    );
}

export default Modal

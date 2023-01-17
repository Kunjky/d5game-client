import { faCheckCircle, faFaceDizzy, faFaceRollingEyes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion"
import './Modal.css'

const IS_WIN = 1
const IS_LOSE = 2
const IS_DRAW = 0

function Modal({ myUser, isWin, closeModal }) {
    let content = (
        <>
            <div className="modal-header">
                <FontAwesomeIcon icon={faCheckCircle} />
                <h3>THẮNG RỒI!</h3>
                <div className="online-avatar" dangerouslySetInnerHTML={{ __html: myUser.avatar }}
                    style={{ margin: 'auto' }}>
                </div>
                <div>{myUser.username}</div>
            </div>
            <div className="modal-body">
                <button onClick={closeModal} className="modal-button">Thường Thôi!</button>
            </div>
        </>
    )

    if (isWin === IS_LOSE) {
        content = (
            <>
                <div className="modal-header modal-lose">
                    <FontAwesomeIcon icon={faFaceDizzy} />
                    <h3>THUA GÒI</h3>
                    <div className="online-avatar" dangerouslySetInnerHTML={{ __html: myUser.avatar }}
                        style={{ margin: 'auto' }}>
                    </div>
                    <div>{myUser.username}</div>
                </div>
                <div className="modal-body">
                    <button onClick={closeModal} className="modal-button modal-lose">Không sao làm lại!</button>
                </div>
            </>
        )
    }

    if (isWin === IS_DRAW) {
        content = (
            <>
                <div className="modal-header modal-draw">
                    <FontAwesomeIcon icon={faFaceRollingEyes} />
                    <h3>BẤT PHÂN THẮNG BẠI</h3>
                    <div className="online-avatar" dangerouslySetInnerHTML={{ __html: myUser.avatar }}
                        style={{ margin: 'auto' }}>
                    </div>
                    <div>{myUser.username}</div>
                </div>
                <div className="modal-body">
                    <button onClick={closeModal} className="modal-button modal-draw">Không sao làm lại!</button>
                </div>
            </>
        )
    }

    return (
        <div className="overlay">
            <motion.div className="modal"
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}>
                {content}
            </motion.div>
        </div>
    );
}

export default Modal

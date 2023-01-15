import generateUserInfo from '../helper';
import { AnimatePresence, motion } from 'framer-motion';
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUserGroup } from '@fortawesome/free-solid-svg-icons';


function Sidebar({ myUser, userList}) {
    return (
        <aside className='sidebar'>
            <div className="actions">
                <div className="user-info">
                    <div dangerouslySetInnerHTML={ { __html: myUser.avatar }} >
                    </div>
                    <FontAwesomeIcon icon={faIdCard} /> Nickname: <br />
                    <span className="username">{myUser.username}</span>
                </div>
            </div>
            <div className="users-active">
                <h3 style={{paddingBottom: '10px' }}>
                    <FontAwesomeIcon icon={faUserGroup} /> Online:
                </h3>
                    <ul>
                    <AnimatePresence>
                        { userList.map((socketId) => {
                            let user = generateUserInfo(socketId)
                            return (
                                <motion.li key={socketId} className="oneline-user-info"
                                    animate={{ scale: 1 }}
                                    initial={{ scale: 0 }}
                                    transition={{delay: 0.7}}
                                    exit={{ scale: 0 }}
                                    >
                                    <div className="online-avatar" dangerouslySetInnerHTML={ { __html: user.avatar }} >
                                    </div>
                                    <div className='online-username'>
                                        {user.username}
                                    </div>
                                </motion.li>
                            )
                        })}
                    </AnimatePresence>
                    </ul>
            </div>
        </aside>
    )
}

export default Sidebar;

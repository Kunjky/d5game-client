import './DefaultLayout.css'
import Sidebar from '../components/Sidebar'
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faDice, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

function DefaultLayout({ myUser, userList, children, currentRoom }) {
    return (
        <>
            <header className='header'>
                <motion.div className="header-logo"
                    initial={{ y: '-50px' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <FontAwesomeIcon icon={faDice} />  D5 Entertáimènt
                </motion.div>
                <div className='header-info'>
                    {
                        currentRoom &&
                        <>
                            Phòng {currentRoom.name}<a href="/"> | Exit <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
                        </>
                    }
                </div>
            </header>
            <section className='container'>
                <Sidebar myUser={myUser} userList={userList} />
                <div className='content'>
                    {children}
                </div>
            </section>
        </>
    )
}

export default DefaultLayout;

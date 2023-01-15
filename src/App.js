import Game from "./components/Game";
import DefaultLayout from "./layouts/DefaultLayout";
import Room from "./components/Room";
import { useState, useEffect } from "react";
import io from 'socket.io-client'
import generateUserInfo from "./helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const REACT_APP_URL = process.env.REACT_APP_URL
const socket = io.connect(REACT_APP_URL)

function App() {
    const [roomList, setRoomList] = useState([])
    const [myUser, setMyUser] = useState({})
    const [userList, setUserList] = useState([])
    const [currentRoom, setCurrentRoom] = useState(null)

    useEffect(() => {
        socket.on('user:created', (socketId) => {
            handleLogin(socketId)
        })

        socket.on('user:join-channel', (users) => {
            setUserList(users)
        })

        socket.on('room:updated', (roomList) => {
            setRoomList([...roomList])
        })

        socket.on('room:join-room-success', (room) => {
            // setCurrentRoom(room)
        })

        return () => {
            socket.removeAllListeners();
        }

    })

    useEffect(() => {
        const currentRoom = roomList.filter((room) => {
            return room.players[0] == socket.id || room.players[1] == socket.id
        })[0]

        setCurrentRoom(currentRoom)

    }, [roomList])

    const handleLogin = (socketId) => {
        let user = generateUserInfo(socketId)
        setMyUser(user)
    }

    const joinGame = (room) => {
        if (room.players.length <= 1) {
            socket.emit('user:join-room', room.id)
        } else {
            alert('Room này đã full. Vui lòng chọn room khác nhé!')
        }
    }

    return (
        <DefaultLayout myUser={myUser} userList={userList} currentRoom={currentRoom} >
            <ul className="list-room">
            { !currentRoom && roomList.map((room) => <Room key={room.id} room={room} joinGame={ () => joinGame(room) }/>) }
            </ul>
            { currentRoom && <Game myUser={myUser} socket={socket} currentRoom={currentRoom} /> }
            <div className="bottom">VietHai, from d5 with <FontAwesomeIcon style={{color: 'red'}} icon={faHeart} /></div>
        </DefaultLayout>
     );
}

export default App;

import Game from "./components/Game";
import DefaultLayout from "./layouts/DefaultLayout";
import Room from "./components/Room";
import { useState, useEffect } from "react";
import io from 'socket.io-client'
import generateUserInfo from "./helper";

const REACT_APP_URL = process.env.REACT_APP_URL
const socket = io.connect(REACT_APP_URL)
console.log(process.env.REACT_APP_URL);

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

        return () => {
            socket.off('user:created');
            socket.off('user:join-channel');
            socket.off('room:updated');
        }

    }, [])

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
        socket.emit('user:join-room', room.id)
        room.players.push(socket.id)
        setTimeout(() => setCurrentRoom(room), 200)
    }

    const leaveGame = () => {
        // socket.emit('user:left-room', currentRoom.id)
        // setTimeout(() => setCurrentRoom(null), 200)
    }

    return (
        <DefaultLayout myUser={myUser} userList={userList} currentRoom={currentRoom} >
            <ul className="list-room">
            { !currentRoom && roomList.map((room) => <Room key={room.id} room={room} joinGame={ () => joinGame(room) }/>) }
            </ul>
            { currentRoom && <Game myUser={myUser} leaveGame={leaveGame} socket={socket} currentRoom={currentRoom} /> }
        </DefaultLayout>
     );
}

export default App;

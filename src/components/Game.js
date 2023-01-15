import { useState, useEffect } from 'react'
import generateUserInfo from '../helper'
import './Game.css'
import Player from './Player'
import SingleCard from './SingleCard'
import { motion } from 'framer-motion'
import Modal from './Modal'

const GameState = {
    READY: 0,
    START: 1,
    END: 2,
}

const MAX_SCORE = 24

const variantsPlayer = {
    active: { opacity: 1, scale: 1 },
    inactive: { opacity: 0.5, scale: 0.8 },
}

function Game({ myUser, socket, currentRoom }) {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [isHost, setIsHost] = useState(false)
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [gameState, setGameState] = useState(GameState.READY)
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [isWin, setIsWin] = useState(false)

    let player1 = currentRoom.players[0] ? generateUserInfo(currentRoom.players[0]) : null
    let player2 = currentRoom.players[1] ? generateUserInfo(currentRoom.players[1]) : null

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCard => {
                    return prevCard.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        }

                        return card
                    })
                })
                resetTurn()
                addScore()
            } else {
                setTimeout(() => resetTurn(), 1000)
                const nextPlayer = currentPlayer == player1.id ? player2.id : player1.id
                sendEvent('passTurn', nextPlayer)
            }
        }

    }, [choiceOne, choiceTwo])

    useEffect(() => {
        setTimeout(checkWinner, 1000)
    }, [player1Score, player2Score])

    useEffect(() => {
        socket.on('setChoiceOne', (data) => {
            setChoiceOne(data)
        })

        socket.on('setChoiceTwo', (data) => {
            setChoiceTwo(data);
        })

        socket.on('setTurns', (data) => {
            setTurns(data);
        })

        socket.on('setCards', (data) => {
            setCards(data);
        })

        socket.on('passTurn', (data) => {
            setCurrentPlayer(data);
        })

        socket.on('newGame', (data) => {
            setCards(data);
            setPlayer1Score(0)
            setPlayer2Score(0)
            setChoiceOne(null)
            setChoiceTwo(null)
            setCurrentPlayer(player1.id);
            setTurns(0)
            setGameState(GameState.START)
        })

        socket.on('resetGame', (data) => {
            setCards([]);
            setPlayer1Score(0)
            setPlayer2Score(0)
            setChoiceOne(null)
            setChoiceTwo(null)
            setCurrentPlayer(null)
            setTurns(0)
            setGameState(GameState.READY)
        })

        return () => {
            socket.removeAllListeners();
        }
    }, [currentRoom])

    const sendEvent = (eventname, data = null) => {
        socket.emit(eventname, data, currentRoom.id)
    }

    const shuffleCards = () => {
        sendEvent('newGame')
    }

    const handleChoice = (card) => {
        if (choiceOne && choiceTwo || choiceOne && choiceOne.id === card.id  || myUser.id !== currentPlayer || gameState !== GameState.START) return
        choiceOne ? sendEvent('setChoiceTwo', card) : sendEvent('setChoiceOne', card)
    }

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(turns + 1)
    }

    const addScore =  () => {
        if (currentPlayer == player1.id) {
            setPlayer1Score((old) => old + 1)
        } else {
            setPlayer2Score((old) => old + 1)
        }
    }

    const checkWinner = () => {
        if (gameState === GameState.START && player1Score + player2Score === MAX_SCORE) {
            const winner = player1Score > player2Score ? player1 : player2
            setIsWin(winner.id === myUser.id)
            setGameState(GameState.END)
            setTimeout(() => setShowModal(true), 1000)
        }
    }

    const closeModal = () => {
        setShowModal(false)
        sendEvent('resetGame')
    }

    return (
        <div className="game">
            {   showModal && gameState === GameState.END &&
                <Modal closeModal={closeModal} myUser={myUser} isWin={isWin} />
            }
            <div className='game-info'>
                <div className='player'>
                    <motion.div className={`player-info-block`}
                        variants={variantsPlayer}
                        animate={ gameState !== GameState.START || currentPlayer === player1?.id ? 'active' : 'inactive'}
                        >
                        {player1 && <Player player={player1} position='left' myUser={myUser} />}
                    </motion.div>
                    <div className='player-info-block score-info'>
                        <span className={`score score-player1`}>{player1Score}</span>
                        <span>VS</span>
                        <span className={`score score-player2`}>{player2Score}</span>
                        <div className='turn'>
                            Luợt: {turns}
                        </div>
                    </div>
                    <motion.div className={`player-info-block`}
                        variants={variantsPlayer}
                        animate={ gameState !== GameState.START || currentPlayer === player2?.id ? 'active' : 'inactive'}
                        >
                        {player2 && <Player player={player2} position='right' myUser={myUser} />}
                    </motion.div>
                </div>
                <div className="actions">
                    { ((gameState === GameState.READY) && currentRoom.players.length == 2) && <button onClick={shuffleCards}>Chơi!</button> }
                    { (gameState === GameState.START && currentPlayer == myUser.id) && <p>Lượt của bạn</p> }
                    { (gameState === GameState.START && currentPlayer != myUser.id) && <p>Lượt của đối phương</p>}
                    { (currentRoom.players.length == 1 && <p>Chờ người chơi khác... <img src="/img/peepo-run.gif" className='peepo'></img> </p>) }
                </div>
            </div>
            <div className="card-grid">
                {cards && cards.map(card =>
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={ choiceOne && card.id == choiceOne.id || choiceTwo && card.id == choiceTwo.id || card.matched}
                    />)
                }
            </div>
        </div>
    );
}

export default Game

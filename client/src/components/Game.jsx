import { useSelector, useDispatch } from 'react-redux';
import { startGame, drawCard, shuffleDeck, setUsername, setGameStatus } from '../redux/actions';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Leaderboard from './Leaderboard';
import {toast} from 'react-toastify';

const Game = () => {
    const { deck, drawnCards, gameStatus, username } = useSelector(state => state.game);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [drawnCard, ...remainingDeck] = deck;

    const start = async () => {
        try{
            if(gameStatus==='won' || gameStatus==='lost'){
                if(userName.length===0){
                    setUserName(username);
                }
            }
            if (userName) {
                dispatch(setGameStatus('inProgress'));
                dispatch(setUsername(userName));
                handleStartGame();
                const response = axios.post("http://localhost:5000/register", {
                    username,
                    score: 0,
                });
                console.log(response);
            } else {
                alert("Please enter a username to start the game");
            }
    
        } catch (error) {
        console.error(error);
        }
    };

    const handleStartGame = () => {
        dispatch(startGame());
    };

    const handleDrawCard = () => {
        if(drawnCard==='Shuffle 🔀' && remainingDeck.length!==0){
            toast.success('You drew a shuffle card. Deck shuffled');
        }
        dispatch(drawCard());
        drawnCards.join(', ')
    };

    const handleShuffle = () => {
        dispatch(shuffleDeck());
    };

    useEffect(()=>{
        if(gameStatus === 'won'){
            axios.post('http://localhost:5000/score', {
                Username: userName,
                Score: gameStatus === 'won' ? 1 : 0
            })

            dispatch(setGameStatus('won'));
        }
        else if(gameStatus === 'lost'){
            dispatch(setGameStatus('lost'));
        }
    },[gameStatus, userName]);

    return (
        <div className=''> 
            {gameStatus==='notStarted' ? (
                <div className="flex gap-3 pt-2 items-center">
                <p className='font-semibold text-lg'>UserName: </p>
                <input
                    type="text"
                    placeholder="Enter Username"
                    className="px-4 py-2 border-gray-300 border-2 rounded-lg"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={()=>start()} className="px-4 py-2 bg-black text-white rounded-lg">Start Game</button>
                </div>
            ) : (
            <div>
                <h1 className='text-center text-3xl p-2 font-bold'>Card Game</h1>
                {username && <p className='text-xl font-semibold px-4 py-2'>Welcome, {username}</p>}

                {gameStatus === 'inProgress' && (
                    <div className='px-4'>
                        <div className='grid grid-cols-2 gap-5 py-5'>
                            <button onClick={handleDrawCard} className='px-4 py-2 bg-black text-white rounded-lg'>Draw Card</button>
                            <button onClick={handleShuffle} className='px-4 py-2 bg-black text-white rounded-lg'>Shuffle Deck</button>
                        </div>
                        <p className='font-semibold text-xl'>Drawn Cards:</p>
                        <div className='flex gap-3'>
                            {drawnCards.map((card, index) => (
                                <div key={index} className='flex items-center bg-blue-200 py-20 px-8 border-4 rounded-lg shadow-2xl border-blue-600 w-fit min-w-[150px] text-center'>
                                    <p className='text-2xl w-[150px] text-center'>{card}</p>
                                </div>
                            ))}
                        </div>
                        <p className='font-semibold text-xl pt-4'>Remaining Deck: {deck.length}</p>
                    </div>
                )}

                {gameStatus === 'won' && <h3 className='font-semibold text-2xl p-4'>Congratulations! You won!</h3>}
                {gameStatus === 'lost' && <h3 className='font-semibold text-2xl p-4'>Game Over! You lost!</h3>}

                <div className='p-4'>
                    {(gameStatus==='won' || gameStatus==='lost') ? <button className="px-4 py-2 bg-black text-white rounded-lg" onClick={()=>start()}>Play Again</button> : 
                    <button className="px-4 py-2 bg-black text-white rounded-lg" onClick={()=>start()}>Start Over</button>}
                </div>

                {(gameStatus==='won' || gameStatus==='lost') && (
                    <Leaderboard />
                )}
            </div>)}
        </div>
    );
};

export default Game;

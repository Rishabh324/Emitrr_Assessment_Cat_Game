import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLeaderboard } from '../redux/actions';
import axios from 'axios';

const Leaderboard = () => {
    const { leaderboard } = useSelector(state => state.game);
    const dispatch = useDispatch();

    const getLeaderboard = async () => {
        await axios.get('http://localhost:5000/leaderboard',{
            headers: {
                "Access-Control-Allow-Headers": "Origin, X-Api-Key, X-Requested-With, Access-Control-Allow-Headers, Content-Type, Accept, Authorization, Access-Control-Allow-Origin",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => dispatch(updateLeaderboard(response.data)))
        .catch(error => console.error('Error fetching leaderboard:', error));
    }

    useEffect(() => {
        getLeaderboard();
    }, []);

    return (
        <div className="text-lg">
            <h2 className="p-4 text-2xl font-bold">Leaderboard</h2>
            <div className='mx-4 my-2 text-xl text-center border border-black'>
                <div className='grid grid-cols-12'>
                    <p className='col-span-2 border border-black'>S.no</p>
                    <p className='col-span-5 border border-black font-medium'>UserName</p>
                    <p className='col-span-5 border border-black font-medium'>Score</p>
                </div>
            </div>
            <div className='mx-4 text-lg text-center border border-black'>
                {leaderboard.map((user, index) => (
                    <div key={index} className='grid grid-cols-12'>
                        <p className='col-span-2 border border-black'>{index+1}.</p>
                        <p className='col-span-5 border border-black font-medium'>{user.username}</p>
                        <p className='col-span-5 border border-black font-medium'>{user.score}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;

import { Link } from "react-router-dom";
import { useScreen } from "../context/ScreenContext";

const Sidebar = () => {
    const { isMobile, sidebarOpen } = useScreen();

    return (
        <div className={`${isMobile && !sidebarOpen ? "hidden": ""} ${isMobile && sidebarOpen ? "absolute lay w-5/12": ""} min-w-fit w-3/12 p-6 flex flex-col justify-between bg-blue-200`}>
            <div className={`flex flex-col lay gap-4`}>
                <Link to='/' className="p-3 bg-blue-400 rounded-lg border-2 border-blue-700 hover:shadow-xl duration-200">Instructions</Link>
                <Link to='/play-game' className="p-3 bg-blue-400 rounded-lg border-2 border-blue-700 hover:shadow-xl duration-200">Play Game</Link>
                <Link to='/leaderboard' className="p-3 bg-blue-400 rounded-lg border-2 border-blue-700 hover:shadow-xl duration-200">Leaderboard</Link>
            </div>
        </div>
    )
}

export default Sidebar;
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTime } from "../../store/slices/appSlice";
import { Users, Clock } from "lucide-react";
import useSocket from "../../hooks/useSocket";

const TopMenu = () => {
    const dispatch = useDispatch();
    const { activeSessions, currentTime} = useSelector(state => state.app);
    useSocket();

    // Оновлення часу кожну секунду
    useEffect(() =>{
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('uk-UA', {
                hour: '2-digit',
                minute: '2-digit',
            });
            const dateSting = now.toLocaleDateString('uk-UA', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });

            dispatch(setCurrentTime({
                time: timeString,
                date: dateSting,
                full: now,
            }))
        }

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [dispatch]);

    return(
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Search Bar */}
                <div className="flex-1 max-w-md">
                    <input type="text" placeholder="Поиск" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                </div>

                {/* Right Side Info */}
                <div className="flex space-x-6 items-center">
                    {/* Active Sessions */}
                    <div className="flex space-x-2 items-center text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            <span className="ml-1 px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">
                                {activeSessions}
                            </span>
                        </span>
                    </div>

                    {/* Date and Time */}
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4"/>
                    </div>
                    <div className="text-sm">
                        <div className="font-medium">
                            {currentTime?.date || 'Загрузка...'}
                        </div>
                        <div className="text-xs text-gray-500">
                            {currentTime?.time || '--:--'}
                        </div>
                    </div>

                    {/* User Avatar */}
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">U</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default TopMenu;
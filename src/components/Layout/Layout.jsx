import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import TopMenu from "./TopMenu";


const Layout = () => {
    return(
        <div className="bg-gray-50 min-h-screen flex">
            {/* Sidebar Navigation */}
            <Navigation />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col">

                {/* Top Menu */}
                <TopMenu/>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <div className="animate-fadeIn">
                        <Outlet/>
                    </div>
                </main>
            </div>

        </div>
    );
}

export default Layout;
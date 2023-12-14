import React, { useEffect, useState, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// components
import MyHeader from "./components/UI/MyHeader/MyHeader";
import MyNavBar3D from "./components/UI/MyNavBar3D/MyNavBar3D";
import AppRouter from "./components/UI/AppRouter";
import Contacts from "./pages/Contacts/Contacts";
import Home from "./pages/Home/Home";
import Portfolios from "./pages/Portfolios/Portfolios";
import CubeInBox from "./pages/Portfolios/cubeInBox";
import BattleShip from "./pages/Portfolios/battleShip/BattleShip";
import PageWithFormCustom from "./pages/Portfolios/pageWithFormCustom";
import ToDoList from "./pages/Portfolios/toDoList";
import About from "./pages/About/About";
// data store action
import { setPageNameAction } from "./store/activePageNameReducer";
// css
import "./App.scss";

function App() {
    const navItems = [
        { name: "home", href: "home", element: <Home /> },
        { name: "contacts", href: "contacts", element: <Contacts /> },
        { name: "about", href: "about", element: <About /> },
        {
            name: "portfolios",
            href: "portfolios",
            element: <Portfolios />,
            children: [
                { name: "Cube In Box", href: "cubeinbox", element: <CubeInBox /> },
                { name: "Battle Ship", href: "battleship", element: <BattleShip /> },
                { name: "Form Custom", href: "pagewithformcustom", element: <PageWithFormCustom /> },
                { name: "To-do List", href: "todolist", element: <ToDoList /> },
            ],
        },
    ];
    const itemNames = navItems.map((item) => item.name);
    const dispatch = useDispatch();
    const [isNavBarActiv, setIsNavBarActiv] = useState(false);
    const mediaQuery_w730 = window.matchMedia("(max-width: 730px)");
    const [isScreenLess_730, setIsScreenLess_730] = useState(mediaQuery_w730.matches);
    const mediaQuery_w1150 = window.matchMedia("(max-width: 1150px)");
    const [isScreenLess_1150, setIsScreenLess_1150] = useState(mediaQuery_w1150.matches);

    let location = useLocation();
    let navigate = useNavigate();

    mediaQuery_w730.addEventListener("change", mediaListener_730);
    function mediaListener_730() {
        setIsScreenLess_730(mediaQuery_w730.matches);
    }
    mediaQuery_w1150.addEventListener("change", mediaListener_1150);
    function mediaListener_1150() {
        setIsScreenLess_1150(mediaQuery_w1150.matches);
    }

    useEffect(() => {
        isScreenLess_1150 ? setIsNavBarActiv(false) : setIsNavBarActiv(true);
    }, [isScreenLess_1150]);

    function locationProcessor(location) {
        let path = location.pathname;
        let hrefName;
        if (path.length > 1) {
            let index_end = path.indexOf("/", 1);
            if (index_end > 0) {
                hrefName = location.pathname.slice(1, index_end);
            } else hrefName = location.pathname.slice(1);
            if (!itemNames.includes(hrefName)) {
                navigate(`/`);
                return;
            }
            dispatch(setPageNameAction(hrefName));
        } else dispatch(setPageNameAction(navItems[0].name));
    }

    useEffect(() => {
        locationProcessor(location);
    }, [location]);

    return (
        <div className="App">
            <MyHeader isNavBarActiv={isNavBarActiv} setIsNavBarActiv={setIsNavBarActiv} />
            <main>
                <AppRouter navItems={navItems} />
            </main>
            <MyNavBar3D
                isActive={isNavBarActiv}
                items={navItems}
                setIsActive={setIsNavBarActiv}
                isScreenLess_730={isScreenLess_730}
            />
        </div>
    );
}

export default function WrappedApp() {
    return (
        <Suspense fallback="...loading">
            <App />
        </Suspense>
    );
}

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// pages (components)
import Contacts from "../../pages/Contacts/Contacts";
import Home from "../../pages/Home/Home";
import BattleShip from "../../pages/Portfolios/battleShip/BattleShip";
import CubeInBox from "../../pages/Portfolios/cubeInBox";
import PageWithFormCustom from "../../pages/Portfolios/pageWithFormCustom";
import Portfolios from "../../pages/Portfolios/Portfolios";
import ToDoList from "../../pages/Portfolios/toDoList";
import About from "../../pages/About/About";
import JokesOfNorris from "../../pages/Portfolios/jokes-of-Norris/JokesOfNorris";

const AppRouter = ({ navItems }) => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={navItems[0].href} replace={true} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolios" element={<Portfolios />}/>
            <Route path="/portfolios/cubeinbox" element={<CubeInBox />} />
            <Route path="/portfolios/battleship" element={<BattleShip />} />
            <Route path="/portfolios/pagewithformcustom" element={<PageWithFormCustom />} />
            <Route path="/portfolios/todolist" element={<ToDoList />} />
            <Route path="/portfolios/jokesofnorris" element={<JokesOfNorris/>} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
    );
};

export default AppRouter;

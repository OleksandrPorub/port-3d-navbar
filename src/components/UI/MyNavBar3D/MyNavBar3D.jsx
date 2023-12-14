import React, { useEffect, useRef, useState } from "react";
import cl from "./MyNavBar3D.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//localisation
import { useTranslation } from "react-i18next";

const MyNavBar3D = ({ items, isActive, setIsActive, isScreenLess_730 }) => {
    const ulRef = useRef();
    const [isNavBarMoving, setIsNavBarMoving] = useState(true);
    const itemActiveName = useSelector((state) => state.activePageName.name);
     //the function for chosing the text for current language
     const { t } = useTranslation();

    useEffect(() => {
        liActivator(itemActiveName);
    }, [isNavBarMoving]);

    useEffect(() => {
        const elmentsOfNavBar = ulRef.current.querySelectorAll("li");
        setElementsAnimated(0);

        setIsNavBarMoving(true);
        elmentsOfNavBar.forEach((elem) => {
            elem.classList && elem.classList.remove(cl.active);
        });
    }, [isActive]);

    useEffect(() => {
        liActivator(itemActiveName);
    }, [itemActiveName]);

    function liActivator(name) {
        if (!isNavBarMoving) {
            const elmentsOfNavBar = ulRef.current.querySelectorAll("li");
            elmentsOfNavBar.forEach((item) => {
                item.classList && item.classList.remove(cl.active);
                item.dataset.name === name && item.classList.add(cl.active);
            });
        }
    }

    const [elementsAnimated, setElementsAnimated] = useState(0);

    function onUlChildAnimationEnd() {
        setElementsAnimated(elementsAnimated + 1);
    }

    function menuDisactive() {
        setIsActive(false);
    }

    useEffect(() => {
        if (elementsAnimated === items.length) {
            setIsNavBarMoving(false);
        }
    }, [elementsAnimated]);

    return (
        <nav
            className={
                isActive ? ["navBarAnimation", cl.navBar, cl.active].join(" ") : ["navBarAnimation", cl.navBar].join(" ")
            }
            onClick={isScreenLess_730 ? menuDisactive : null}
        >
            <ul ref={ulRef}>
                <div className={cl.navBar__header}>
                    <span>{t("main.navbar.header")}</span>
                </div>
                {items.map((item, i) => (
                    <li 
                      key={item.name} 
                      style={{ "--del": `${0.2 * i}s` }} 
                      onAnimationEnd={onUlChildAnimationEnd} 
                      data-name={item.name}
                    >
                        <Link to={"/" + item.name} className={cl.navBar__item}>
                            <div className={[cl.item__side, cl.front].join(" ")}>{t("main.navbar."+item.name)}</div>
                            <div className={[cl.item__side, cl.back].join(" ")}></div>
                            <div className={[cl.item__side, cl.left].join(" ")}></div>
                            <div className={[cl.item__side, cl.right].join(" ")}></div>
                            <div className={[cl.item__side, cl.top].join(" ")}></div>
                            <div className={[cl.item__side, cl.bottom].join(" ")}></div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MyNavBar3D;

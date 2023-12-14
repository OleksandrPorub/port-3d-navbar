import React from "react";
import cl from "./MyWorkCard.module.scss";
import { Link } from "react-router-dom";
//localisation
import { useTranslation } from "react-i18next";

function MyWorkCard({ work }) {
    const resizerFull = function (e) {
        const currWrap = e.target.closest(`.${cl.wrap}`);
        const text = currWrap.querySelector(`.${cl.card__text}`);
        const brothers = currWrap.closest("ul").children;
        for (let el of brothers) {
            let wrap = el.children[0];
            if (wrap && wrap !== currWrap) {
                wrap.classList.remove(`${cl.fullsize}`);
            }
        }
        !currWrap.classList.contains(`${cl.fullsize}`) &&
        text.style.setProperty("--scrollHeight", text.scrollHeight + "px");
        currWrap.classList.toggle(`${cl.fullsize}`);
    };

    //the function for chosing the text for current language
    const { t, i18n } = useTranslation();

    return (
        <div
            className={cl.wrap}
            onClick={resizerFull}
        >
            <h3>{work.title[i18n.resolvedLanguage]}</h3>
            <div className={cl.card}>
                <div className={cl.card__imgBox}>
                    <img src={work.imgSrc} alt="sqreenshot of component" />
                </div>
                <div className={cl.card__text}>
                    <p>{work.discription[i18n.resolvedLanguage]}</p>
                </div>
                <Link
                    to={"/portfolios/" + work.href}
                    className={cl.card__button}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {t("main.pages.portfolios.MyWorkCard.go")}
                </Link>
            </div>
        </div>
    );
}

export default MyWorkCard;

import React from "react";
import { useSelector } from "react-redux"
// components
import MyWorkLink from "../../components/MyWorkLink/MyWorkLink";
// css
import cl from "./Portfolios.module.scss"
//localisation
import { useTranslation } from "react-i18next";

const Portfolios = () => {

    const works = useSelector(state => state.myWorks.works);

    //the function for chosing the text for current language
    const { t, i18n } = useTranslation();

    return (
        <div className={"page " + cl.pagePortfolios}>
            <div className={cl.pagePortfolios__content}>
                <h1 className={cl.pageHeadline + " pageHeadline"}>{t("main.pages.portfolios.h1")}</h1>
                <ul className={cl.pagePortfolios__content_workLinksContainer}>
                    {works.map((work) => (
                        <li key={work.href}>
                            <MyWorkLink work={work} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Portfolios;
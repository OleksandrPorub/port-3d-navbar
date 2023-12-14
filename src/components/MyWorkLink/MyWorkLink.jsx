import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import cl from "./MyWorkLink.module.scss";
//localisation
import { useTranslation } from "react-i18next";

const MyWorkLink = ({ work }) => {

    
    const [observerRef, inView] = useInView({
        threshold: 0.7,
    });

     //the function for chosing the text for current language
     const { t, i18n } = useTranslation();

    return (
        <div ref={observerRef} className={cl.wrapper + (inView ? ` ${cl.goodVisible}` : "")}>
            <div className={cl.workLink}>
                <div className={cl.workLink__image}>
                    <img className={cl.workLink__image_image} src={work.imgSrc} alt={work.title[i18n.resolvedLanguage]+" sqreenshot"}/>
                </div>
                <div className={cl.workLink__discription}>
                    <h4 className={cl.discription__title}>{work.title[i18n.resolvedLanguage]}</h4>
                    <p className={cl.discription__text}>{work.discription[i18n.resolvedLanguage]}</p>
                </div>
            </div>
            <Link to={work.href} className={cl.workLink__link}>
            {t("main.pages.portfolios.MyWorkLink.go")}
            </Link>
        </div>
    );
};

export default MyWorkLink;

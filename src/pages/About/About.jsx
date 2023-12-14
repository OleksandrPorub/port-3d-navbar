import React from "react";

// css
import cl from "./About.module.scss";
// href
import iconHTML5 from "../../images/icons/html-5.png";
import iconCSS from "../../images/icons/css-3.png";
import iconJS from "../../images/icons/js.png";
import iconSASS from "../../images/icons/sass.png";
import iconREACT from "../../images/icons/atom.png";
import iconVUE from "../../images/icons/vue.png";
//localisation
import { useTranslation } from "react-i18next";
//components
import MySkillsArticle from "../../components/MySkillsArticle/MySkillsArticle";
import SliderComp from "../../components/SliderComp/SliderComp";

const About = () => {

    //the function for chosing the text for current language
    const { t } = useTranslation();

    return (
        <div className={`page ${cl.pageAbout}`}>
            <div className={cl.pageAbout__content}>
                <div className={cl.pageAbout__header}>
                    <h1 className={cl.pageAbout__header_headline + " pageHeadline"}>{t("main.pages.about.h1")}</h1>
                    {/* <div className={cl.pageAbout__header_foto}>
                        <img src={myFotoHref} alt="selfFoto" />
                    </div> */}
                    <SliderComp></SliderComp>
                </div>
                <p className={cl.text + " pageMainText"}>
                    {t("main.pages.about.howIcame.header")}
                </p>
                <article className={cl.article + " " + cl.article_howICame + " article-sepia"}>
                    <h2 className={"h2-article"}>{t("main.pages.about.intro")}</h2>
                    <p>
                        {t("main.pages.about.howIcame.p1")}
                    </p>
                    <p>
                        {t("main.pages.about.howIcame.p2")}
                    </p>
                    <p>
                        {t("main.pages.about.howIcame.p3")}
                    </p>
                </article>
                <article className={cl.article + " " + cl.article_details + " article-sepia"}>
                    <h2 className={"h2-article"}>{t("main.pages.about.details.header")}</h2>

                    <MySkillsArticle title={t("main.pages.about.details.skills.title")}>
                        <p className={cl.skills}>
                            <span className={cl.skills_item} style={{ "--bgImage": "url(" + iconHTML5 + ")" }}>html5</span>&emsp;
                            <span className={cl.skills_item} style={{ "--bgImage": "url(" + iconCSS + ")" }}>CSS</span>&emsp;
                            <span className={cl.skills_item} style={{ "--bgImage": "url(" + iconSASS + ")" }}>SASS</span>&emsp;
                            <span className={cl.skills_item} style={{ "--bgImage": "url(" + iconJS + ")" }}>&nbsp;JavaScript</span>&emsp;
                            <span className={cl.skills_item} style={{ "--bgImage": "url(" + iconREACT + ")" }}>React.js</span>&emsp;
                            <span className={cl.skills_item} style={{ "--bgImage": "url(" + iconVUE + ")" }}>Vue.js</span><br />
                            Gulp &emsp; JQuery &emsp; Git &emsp; Adobe Photoshop &emsp; Figma<br />
                            Responsive, adaptive layout, REST API<br />
                            {"{"}Node.js,  TypeScript, Express, MongoDB{"}"} - basic knowledges
                        </p>
                    </MySkillsArticle>

                    <MySkillsArticle title={t("main.pages.about.details.languages.title")}>
                        <p className={cl.skills}>{t("main.pages.about.details.languages.text.1")} &nbsp; &nbsp; {t("main.pages.about.details.languages.text.2")} &nbsp; &nbsp; {t("main.pages.about.details.languages.text.3")}</p>
                    </MySkillsArticle>

                    <MySkillsArticle title={t("main.pages.about.details.education.title")}>
                        <p className={cl.skills}>
                            {t("main.pages.about.details.education.text.1")}&nbsp;
                            <span className={cl.highlightedRed}>{t("main.pages.about.details.education.text.2")}</span> <br />
                            {t("main.pages.about.details.education.text.3")}
                        </p>
                    </MySkillsArticle>

                    <MySkillsArticle title={t("main.pages.about.details.addEducation.title")}>
                        <p className={cl.skills}>
                            {t("main.pages.about.details.addEducation.text.1")}&nbsp;
                            <span className={cl.highlightedRed}>{t("main.pages.about.details.addEducation.text.2")}</span>
                        </p>
                    </MySkillsArticle>

                    <MySkillsArticle title={t("main.pages.about.details.lastJob.title")}>
                        <p className={cl.skills}>
                            {t("main.pages.about.details.lastJob.text.1")} <br />
                            {t("main.pages.about.details.lastJob.text.2")}
                        </p>
                    </MySkillsArticle>

                    <MySkillsArticle title={t("main.pages.about.details.experience.title")}>
                        <p className={cl.skills}>
                            {t("main.pages.about.details.experience.text.1")}
                        </p>
                    </MySkillsArticle>

                    <MySkillsArticle title={t("main.pages.about.details.addInfo.title")}>
                        <p className={cl.skills}>
                            {t("main.pages.about.details.addInfo.text.1")}
                        </p>
                    </MySkillsArticle>
                    <a className={cl.article__downloadCV} href={"/custom_static/cv.pdf"} download>
                        {t("main.pages.about.details.download.1")}&nbsp;{t("main.pages.about.details.download.2")}
                    </a>
                </article>
            </div>
        </div>
    );
};

export default About;

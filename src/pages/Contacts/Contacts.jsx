import React from "react";
// css
import cl from "./Contacts.module.scss"
// src
import icon_telegram from "../../images/icons/telegram_tile_logo_icon_169640.png"
import icon_viber from "../../images/icons/viber_tile_logo_icon_170260.png"
import icon_watsApp from "../../images/icons/whatsapp_tile_logo_icon_169898.png"
//localization
import { useTranslation } from "react-i18next";


const Contacts = () => {

    //the function for chosing the text for current language
    const { t } = useTranslation();

    return (
        <div className={`page ${cl.pageContacts}`}>
            <div className={cl.pageContacts__content}>
                <h1 className={cl.pageHeadline + " pageHeadline"}>{t("main.pages.contacts.h1")}</h1>
                <article className={cl.article}>
                    <ul className={cl.mainInfo}>
                        <li className={cl.mainInfo_item}>
                            <span className={cl.mainInfo_item_title}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={cl.mainInfo_item_title_ionicon} viewBox="0 0 512 512"><title>Accessibility</title><path d="M256 112a56 56 0 1156-56 56.06 56.06 0 01-56 56z" /><path d="M432 112.8l-.45.12-.42.13c-1 .28-2 .58-3 .89-18.61 5.46-108.93 30.92-172.56 30.92-59.13 0-141.28-22-167.56-29.47a73.79 73.79 0 00-8-2.58c-19-5-32 14.3-32 31.94 0 17.47 15.7 25.79 31.55 31.76v.28l95.22 29.74c9.73 3.73 12.33 7.54 13.6 10.84 4.13 10.59.83 31.56-.34 38.88l-5.8 45-32.19 176.19q-.15.72-.27 1.47l-.23 1.27c-2.32 16.15 9.54 31.82 32 31.82 19.6 0 28.25-13.53 32-31.94s28-157.57 42-157.57 42.84 157.57 42.84 157.57c3.75 18.41 12.4 31.94 32 31.94 22.52 0 34.38-15.74 32-31.94a57.17 57.17 0 00-.76-4.06L329 301.27l-5.79-45c-4.19-26.21-.82-34.87.32-36.9a1.09 1.09 0 00.08-.15c1.08-2 6-6.48 17.48-10.79l89.28-31.21a16.9 16.9 0 001.62-.52c16-6 32-14.3 32-31.93S451 107.81 432 112.8z" /></svg>
                                {t("main.pages.contacts.titleName")}
                            </span>
                            <span className={cl.mainInfo_item_text}>{t("main.pages.contacts.name")}</span>
                        </li>
                        <li className={cl.mainInfo_item}>
                            <span className={cl.mainInfo_item_title}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={cl.mainInfo_item_title_ionicon} viewBox="0 0 512 512"><title>Home</title><path d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z" /><path d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z" /></svg>
                                {t("main.pages.contacts.titleAdress")}
                            </span>
                            <span className={cl.mainInfo_item_text}>{t("main.pages.contacts.adress")}</span>
                        </li>
                        <li className={cl.mainInfo_item}>
                            <span className={cl.mainInfo_item_title}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={cl.mainInfo_item_title_ionicon} viewBox="0 0 512 512"><title>Call</title><path d="M391 480c-19.52 0-46.94-7.06-88-30-49.93-28-88.55-53.85-138.21-103.38C116.91 298.77 93.61 267.79 61 208.45c-36.84-67-30.56-102.12-23.54-117.13C45.82 73.38 58.16 62.65 74.11 52a176.3 176.3 0 0128.64-15.2c1-.43 1.93-.84 2.76-1.21 4.95-2.23 12.45-5.6 21.95-2 6.34 2.38 12 7.25 20.86 16 18.17 17.92 43 57.83 52.16 77.43 6.15 13.21 10.22 21.93 10.23 31.71 0 11.45-5.76 20.28-12.75 29.81-1.31 1.79-2.61 3.5-3.87 5.16-7.61 10-9.28 12.89-8.18 18.05 2.23 10.37 18.86 41.24 46.19 68.51s57.31 42.85 67.72 45.07c5.38 1.15 8.33-.59 18.65-8.47 1.48-1.13 3-2.3 4.59-3.47 10.66-7.93 19.08-13.54 30.26-13.54h.06c9.73 0 18.06 4.22 31.86 11.18 18 9.08 59.11 33.59 77.14 51.78 8.77 8.84 13.66 14.48 16.05 20.81 3.6 9.53.21 17-2 22-.37.83-.78 1.74-1.21 2.75a176.49 176.49 0 01-15.29 28.58c-10.63 15.9-21.4 28.21-39.38 36.58A67.42 67.42 0 01391 480z" /></svg>
                                {t("main.pages.contacts.titlePhone")}
                            </span>
                            <span className={cl.mainInfo_item_text}>
                                <a href="tel:+380673955678">{t("main.pages.contacts.phone")}</a>
                                <div className={cl.logosBlock}>
                                    <a className={cl.logo} href="https://t.me/AlePoru" target="_blank" rel="noopener noreferrer">
                                        <img src={icon_telegram} /></a>
                                    <a className={cl.logo} href="viber://chat?number=%2B380673955678" target="_blank" rel="noopener noreferrer">
                                        <img src={icon_viber} /></a>
                                    <a className={cl.logo} href="https://wa.me/380673955678" target="_blank" rel="noopener noreferrer">
                                        <img src={icon_watsApp} /></a>
                                </div>
                            </span>
                        </li>
                        <li className={cl.mainInfo_item}>
                            <span className={cl.mainInfo_item_title}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={cl.mainInfo_item_title_ionicon} viewBox="0 0 512 512">
                                    <title>Paper Plane</title>
                                    <path
                                        d="M473 39.05a24 24 0 00-25.5-5.46L47.47 185h-.08a24 24 0 001 45.16l.41.13 137.3 58.63a16 16 0 0015.54-3.59L422 80a7.07 7.07 0 0110 10L226.66 310.26a16 16 0 00-3.59 15.54l58.65 137.38c.06.2.12.38.19.57 3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0023-15.46L478.39 64.62A24 24 0 00473 39.05z"
                                    />
                                </svg>
                                Telegram:
                            </span>
                            <span className={cl.mainInfo_item_text}>
                                <a href="https://t.me/AlePoru" target="_blank">
                                    @AlePoru
                                </a>
                            </span>
                        </li>
                        <li className={cl.mainInfo_item}>
                            <span className={cl.mainInfo_item_title}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={cl.mainInfo_item_title_ionicon} viewBox="0 0 512 512"><title>Mail Open</title><path d="M448.67 154.45L274.1 68.2a41.1 41.1 0 00-36.2 0L63.33 154.45A55.6 55.6 0 0032 204.53v184.61c0 30.88 25.42 56 56.67 56h334.66c31.25 0 56.67-25.12 56.67-56V204.53a55.6 55.6 0 00-31.33-50.08zM252.38 96.82a8.22 8.22 0 017.24 0L429 180.48l-172 85a8.22 8.22 0 01-7.24 0L80.35 181.81z" /></svg>
                                e-mail:
                            </span>
                            <span className={cl.mainInfo_item_text}>
                                <a href="mailto: oleksandr.porub@gmail.com">oleksandr.porub@gmail.com</a>
                            </span>
                        </li>
                        <li className={cl.mainInfo_item}>
                            <span className={cl.mainInfo_item_title}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={cl.mainInfo_item_title_ionicon} viewBox="0 0 512 512"><title>Logo Linkedin</title><path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" /></svg>
                                Linkedin:
                            </span>
                            <span className={cl.mainInfo_item_text}>
                                <a href="http://www.Linkedin.com/in/oleksandr-porubinovskyi-048b96235" target="_blank">
                                    www.Linkedin.com/in/<wbr />oleksandr-porubinovskyi-048b96235
                                </a>
                            </span>
                        </li>
                        <li className={cl.mainInfo_item}>
                            <span className={cl.mainInfo_item_title}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={cl.mainInfo_item_title_ionicon} viewBox="0 0 512 512"><title>Logo Facebook</title><path d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z" fillRule="evenodd" /></svg>
                                Facebook:
                            </span>
                            <span className={cl.mainInfo_item_text}>
                                <a href="https://www.facebook.com/profile.php?id=100010143249535" target="_blank">
                                    https://www.facebook.com/<wbr />profile.php?id=100010143249535
                                </a>
                            </span>
                        </li>
                    </ul>
                </article>
            </div>
        </div>
    );
};

export default Contacts;

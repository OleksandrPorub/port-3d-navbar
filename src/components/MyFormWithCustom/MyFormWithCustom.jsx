import React from "react";
import { useEffect } from "react";
import "./styles.scss";

const MyFormWithCustom = ({ setIsFormActive }) => {
    useEffect(initialization, []);

    function initialization() {
        const body = document.querySelector("body");
        const formWrapper = document.querySelector(".formWrapper");
        const formBody = document.querySelector(".form__body");
        const customSelectOptions = document.querySelector(".customSelect__options");
        const optionsCollection = customSelectOptions.querySelectorAll("li");
        const selectWindow = document.querySelector(".customSelect__window");
        const selectWindowText = selectWindow.querySelector("span");
        const checkboxLabel = formBody.querySelector(".checkbox__label");
        const checkboxInput = formBody.querySelector(".checkbox__input");
        const li_1st = customSelectOptions.querySelector("li:nth-child(1)");
        const plusPuddingForPopup = document.querySelectorAll(".plusPuddingForPopup");
        const closeFormButton = formBody.querySelector(".closeForm-button");

        (function showForm() {
            let bodyScrollBarWidth = window.innerWidth - body.clientWidth;
            body.style.paddingRight = bodyScrollBarWidth + "px";
            body.classList.add("freezed");
            formWrapper.classList.add("active");
            plusPuddingForPopup.forEach((element) => {
                element.style.paddingRight = parseInt(getComputedStyle(element).paddingRight) + bodyScrollBarWidth + "px";
            });
        })();

        formWrapper.addEventListener("click", hideForm);
        closeFormButton.addEventListener("click", hideForm);

        function hideForm(event) {
            if (!event.target.closest(".form__body") || event.target.closest(".closeForm-button")) {
                body.classList.remove("freezed");
                formWrapper.classList.remove("active");
                formWrapper.addEventListener("animationend", formRemover, { once: true });
                formBody.classList.remove("active");
                formBody.classList.add("deactivation");
                body.style.paddingRight = "";
                plusPuddingForPopup.forEach((element) => {
                    element.style.paddingRight = "";
                });
            }
        }

        function formRemover() {
            formBody.classList.remove("deactivation");
            setIsFormActive(false);
        }

        formBody.addEventListener("submit", formSend);
        function formSend(event) {
            event.preventDefault();
            alert("Действие по умолчанию отменено!");
        }

        formBody.addEventListener("click", formZoomer);
        function formZoomer(event) {
            formBody.classList.add("active");
        }

        const optionsLabels = document.querySelectorAll(".options__label");
        optionsLabels.forEach((label) => {
            label.addEventListener("click", checker);
            label.addEventListener("keypress", checker);
        });

        function checker(event) {
            if (event.type == "keypress" && !(event.code == "Space" || event.code == "Enter")) return;
            event.target.previousElementSibling.checked = true;
        }

        formBody.addEventListener("click", optionsCloser);
        function optionsCloser(event) {
            if (event.target != selectWindow) {
                let customSelectOptionsOpened = document.querySelector(".customSelect__options-opened");
                if (customSelectOptionsOpened) {
                    customSelectOptionsOpened.classList.remove("customSelect__options-opened");
                }
            }
        }

        function optOpener(event) {
            if (event.target == selectWindow) {
                customSelectOptions.classList.toggle("customSelect__options-opened");
            }
        }

        selectWindow.addEventListener("keydown", selectorLi);
        selectWindow.addEventListener("mousedown", optOpener);
        function selectorLi(event) {
            let currentEl = event.target;
            let liSelected = customSelectOptions.querySelector("li.selected");

            if (currentEl == selectWindow && ["ArrowUp", "ArrowDown", "Space", "Enter"].includes(event.code)) {
                customSelectOptions.classList.add("customSelect__options-opened");
                if (liSelected) {
                    liSelected.tabIndex = "0";
                    liSelected.focus();
                } else {
                    currentEl.tabIndex = 0;
                    li_1st.focus();
                    selectWindowText.innerHTML = 'control - ↓↑,     select - "SPACE"';
                }
                document.activeElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }

            if (event.code == "ArrowUp" && currentEl.previousElementSibling) {
                currentEl.tabIndex = "-1";
                currentEl.previousElementSibling.tabIndex = 0;
                currentEl.previousElementSibling.focus();
                event.preventDefault();
            }
            if (event.code == "ArrowDown" && currentEl.nextElementSibling) {
                currentEl.tabIndex = "-1";
                currentEl.nextElementSibling.tabIndex = 0;
                currentEl.nextElementSibling.focus();
                event.preventDefault();
            }
            if ((event.code == "Space" || event.code == "Enter") && currentEl.tagName == "LI") {
                currentEl.click();
            }
            if (event.code == "Tab") {
                currentEl.blur();
                customSelectOptions.classList.remove("customSelect__options-opened");
            }
        }

        customSelectOptions.addEventListener("click", optChecker);
        function optChecker(event) {
            let elem = event.target;
            if (elem.tagName != "LI") {
                return;
            }
            optionsCollection.forEach((el) => {
                el.classList.remove("selected");
                el.tabIndex = "-1";
            });
            elem.classList.add("selected");
            selectWindow.querySelector("span").textContent = elem.textContent;
            selectWindow.dataset.value = elem.dataset.value;
            elem.blur();
            customSelectOptions.classList.remove("customSelect__options-opened");
        }

        const fileInput = document.querySelector(".file__input");
        const filePreview = document.querySelector(".file__preview");
        fileInput.addEventListener("change", uploadFile);
        function uploadFile() {
            let file = this.files[0];
            if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
                alert("Only pictures are allowed!");
                this.value = "";
                return;
            }
            if (file.size > 20 * 1024 * 1024) {
                alert("The file can`t be more then 20Мb!");
                this.value = "";
                return;
            }
            let reader = new FileReader();
            reader.onload = (event) => {
                filePreview.innerHTML = `<img src="${event.currentTarget.result}" alt="Фото">`;
            };
            reader.onerror = (er) => {
                alert("Error!");
            };
            reader.readAsDataURL(file);
        }

        checkboxLabel.addEventListener("keypress", agrementChecker);
        function agrementChecker(event) {
            if (event.code == "Space" || event.code == "Enter") {
                checkboxInput.checked = !checkboxInput.checked;
            }
        }
    }

    return (
        <div className="formWrapper">
            <form action="#" id="form" className="form__body" method="post" encType="multipart/form-data">
                <h1 className="form__title">The form</h1>
                <p className="formDescription">
                    The highlight of this form is <b>CUSTOM SELECT</b>, which allows you to style it at your discretion. It also supports
                    keyboard control.
                </p>
                <div className="form__item pHolderAnimated">
                    <input tabIndex="0" id="formName" type="text" className="form__input" placeholder=" " name="name" />
                    <label htmlFor="formName" className="form__label">
                        Name*
                    </label>
                </div>
                <div className="form__item pHolderAnimated">
                    <input tabIndex="0" id="formEmail" type="text" className="form__input" placeholder=" " name="email" />
                    <label htmlFor="formEmail" className="form__label">
                        E-mail*
                    </label>
                </div>
                <div className="form__item form__item-gender">
                    <div className="form__label">Gender:</div>
                    <div className="options">
                        <div className="options__item">
                            <input
                                tabIndex="0"
                                id="formInputGenderMale"
                                type="radio"
                                defaultChecked
                                value="male"
                                name="gender"
                                className="options__input"
                            />
                            <label htmlFor="formInputGenderMale" tabIndex="0" className="options__label">
                                Male
                            </label>
                        </div>
                        <div className="options__item">
                            <input tabIndex="0" id="formInputGenderFemale" type="radio" value="female" name="gender" className="options__input" />
                            <label htmlFor="formInputGenderFemale" tabIndex="0" className="options__label">
                                Female
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form__item pHolderAnimated">
                    <textarea tabIndex="0" id="formMessage" name="message" className="form__input" placeholder=" "/>
                    <label htmlFor="formMessage" className="form__label">
                        Message
                    </label>
                </div>
                <div className="form__item">
                    <div className="form__label">Favorite color</div>
                    <div className="customSelect">
                        <div tabIndex="0" className="customSelect__window" data-value="не выбрано">
                            <span>Press here to select...</span>
                            <div className="customSelect__options">
                                <ul>
                                    <li tabIndex="-1" style={{ "--color": "rgb(238, 15, 8)" }} data-value="Red">
                                        Red
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "rgb(46, 185, 11)" }} data-value="Green">
                                        Green
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "rgb(8, 165, 238)" }} data-value="Light Blue">
                                        Light Blue
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "yellow" }} data-value="Yellow">
                                        Yellow
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "rgb(175, 30, 233)" }} data-value="Violet">
                                        Violet
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "rgb(240, 167, 10)" }} data-value="Orange">
                                        Orange
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "rgb(28, 25, 201)" }} data-value="Dark Blue">
                                        Dark Blue
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "rgb(32, 32, 32)" }} data-value="Black">
                                        Black
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "rgb(255, 255, 255)" }} data-value="White">
                                        White
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "rgb(248, 135, 169)" }} data-value="Pink">
                                        Pink
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "rgb(112, 77, 38)" }} data-value="Brown">
                                        Brown
                                    </li>
                                    <li tabIndex="-1" style={{ "--color": "rgb(133, 133, 133)" }} data-value="another">
                                        another
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form__item">
                    {/* <div className="form__label">Attach picture</div> */}
                    <div className="file">
                        <div className="file__item">
                            <div className="form__label">Attach picture</div>
                            <input id="formImage" type="file" name="image" className="file__input" accept=".jpg, .png, .gif" />
                            <div tabIndex="0" className="file__button">
                                Attach...
                            </div>
                        </div>
                        <div className="file__preview">
                            <span>
                                image
                                <br />
                                preview
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form__item">
                    <div className="checkbox">
                        <input id="formAgreement" type="checkbox" name="agreement" className="checkbox__input" />
                        <label htmlFor="formAgreement" tabIndex="0" className="checkbox__label">
                            <span>
                                I give my consent to the processing of personal data in accordance with <a href="">the conditions</a>
                            </span>
                        </label>
                    </div>
                </div>
                <button type="submit" className="form__button">
                    Send data
                </button>
                <button type="button" className="closeForm-button"></button>
            </form>
        </div>
    );
};

export default MyFormWithCustom;

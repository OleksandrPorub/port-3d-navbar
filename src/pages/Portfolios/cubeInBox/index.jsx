import React, { useEffect } from "react";
// css
import cl from "./styles.module.scss";

const CubeInBox = () => {
    useEffect(initialization, []);

    function initialization() {
        const block = document.querySelector(`.${cl.block}`),
            box = document.querySelector(`.${cl.box}`),
            span = document.querySelector(`.${cl.block} span`),
            legend = document.querySelector(`.${cl.legend}`),
            positCorner = document.querySelector(`.${cl.positCorner}`),
            boxWrapper = document.querySelector(`.${cl.boxWrapper}`),
            cornerTooltip = document.querySelector(`.${cl.cornerTooltip}`),
            H = block.offsetHeight,
            W = block.offsetWidth,
            b = parseInt(getComputedStyle(box).borderLeftWidth);

        let mPosOn_X,
            mPosOn_Y,
            boxWith,
            boxHeight,
            stepValue = 26,
            calcLeft,
            calcRight,
            calcTop,
            calcBottom;

        block.style.left = "8px";
        block.style.top = box.offsetHeight - b * 2 - block.offsetHeight - 8 + "px";

        positCorner.addEventListener("mousedown", cornerOn);
        document.addEventListener("keydown", moving);

        function cornerOn(event) {
            positCorner.style.borderBottomColor = "rgba(228, 107, 27, 0.808)";
            document.documentElement.style.cursor = "nwse-resize";
            positCorner.style.cursor = "nwse-resize";
            cornerTooltip.innerHTML = "Hold and move. <br> Then release it.";
            document.addEventListener("mouseup", cornerOff, { once: true });
            document.addEventListener("mousemove", cornerMove);
            mPosOn_X = event.pageX;
            mPosOn_Y = event.pageY;
            boxWith = parseInt(getComputedStyle(box).width);
            boxHeight = parseInt(getComputedStyle(box).height);
        }

        function cornerOff() {
            positCorner.style.borderBottomColor = "";
            document.removeEventListener("mousemove", cornerMove);
            document.documentElement.style.cursor = "";
            positCorner.style.cursor = "";
            cornerTooltip.innerHTML = "Click the corner<br>and hold<br/>for stretching box.";
        }

        function cornerMove(event) {
            event.preventDefault();
            let posDistance_X = event.pageX - mPosOn_X,
                posDistance_Y = event.pageY - mPosOn_Y,
                newWidth = boxWith + posDistance_X,
                newHeight = boxHeight + posDistance_Y;

            if (newWidth > 250) {
                box.style.width = newWidth + "px";
                if (newWidth - b * 2 - block.offsetLeft - W < 0) {
                    block.style.left = newWidth - b * 2 - W - 8 + "px";
                }
            }

            if (newHeight > 300) {
                box.style.height = newHeight + "px";
                if (newHeight - b * 2 - block.offsetTop - W < 0) {
                    block.style.top = newHeight - b * 2 - W - 8 + "px";
                }
            }

            if (newWidth <= newHeight) {
                stepValue = newWidth * 0.07;
            } else stepValue = newHeight * 0.07;
        }

        let keys = {
            32: function () {
                //jumping
                block.classList.add(cl.actionJump);
                document.removeEventListener("keydown", moving);
                setTimeout(function () {
                    block.classList.remove(cl.actionJump);
                    document.addEventListener("keydown", moving);
                }, 700);
            },
            17: function () {
                //squating
                document.removeEventListener("keydown", moving);
                block.style.transition = "0.1s";
                block.style.height = H * 0.5 + "px";
                block.style.top = calcTop + H * 0.5 + "px";
                block.style.width = W * 1.3 + "px";
                block.style.left = calcLeft - (W * 0.3) / 2 + "px";
                document.addEventListener("keyup", standUp);
            },
            38: function () {
                //up
                if (calcTop < stepValue) {
                    bems("Top");
                } else block.style.top = calcTop - stepValue + "px";
            },
            40: function () {
                //down
                if (calcBottom < stepValue) {
                    bems("Bottom");
                } else block.style.top = calcTop + stepValue + "px";
            },
            37: function () {
                //left
                if (calcLeft < stepValue) {
                    bems("Left");
                } else block.style.left = calcLeft - stepValue + "px";
            },
            39: function () {
                //right
                if (calcRight < stepValue) {
                    bems("Right");
                } else block.style.left = calcLeft + stepValue + "px";
            },
        };

        function standUp(evt) {
            if (evt.keyCode === 17) {
                block.style.transition = "0.15s";
                block.style.height = H + "px";
                block.style.top = calcTop + "px";
                block.style.width = W + "px";
                block.style.left = calcLeft + "px";
                setTimeout(function () {
                    block.style.transition = "";
                    document.addEventListener("keydown", moving);
                }, 200);
            }
        }

        function moving(event) {
            calcLeft = block.offsetLeft;
            calcRight = box.offsetWidth - b * 2 - block.offsetLeft - W;
            calcTop = block.offsetTop;
            calcBottom = box.offsetHeight - b * 2 - block.offsetTop - H;
            let code = event.keyCode;
            keys[code] && keys[code]();
        }

        function bems(side) {
            span.style.transition = "0.2s";
            span.style.opacity = "1";
            span.style.transform = "scale(1, 1.2)";
            block.style.transition = "0.06s";
            document.removeEventListener("keydown", moving);
            var bordBleem = setInterval(() => {
                // turn on the blinking boarder on kicked side
            }, 50);

            switch (
                side //red line showing depending on kicked side
            ) {
                case "Right":
                    block.style.left = calcLeft + calcRight + "px";
                    setTimeout(() => {
                        block.style.boxShadow = "22px 0px 21px -9px rgba(255,16,51,0.75)";
                        block.style.left = calcLeft + calcRight - stepValue * 0.9 + "px";
                    }, 70);
                    break;

                case "Left":
                    block.style.left = 0;
                    setTimeout(() => {
                        block.style.boxShadow = "-22px 0px 21px -9px rgba(255,16,51,0.75)";
                        block.style.left = stepValue * 0.9 + "px";
                    }, 70);
                    break;

                case "Top":
                    block.style.top = 0 + "px";
                    setTimeout(() => {
                        block.style.boxShadow = "0px -22px 21px -9px rgba(255,16,51,0.75)";
                        block.style.top = stepValue * 0.9 + "px";
                    }, 70);
                    break;

                case "Bottom":
                    block.style.top = calcTop + calcBottom + "px";
                    setTimeout(() => {
                        block.style.boxShadow = "0px 22px 21px -9px rgba(255,16,51,0.75)";
                        block.style.top = calcTop + calcBottom - stepValue * 0.9 + "px";
                    }, 70);
            }

            block.classList.add(cl["redBorder"+side]);

            setTimeout(function () {
                span.style.transition = "1.5s";
                block.style.transition = "0.15s";
                box.classList.add(cl["boxSwing" + side]);
                legend.classList.add(cl["boxSwing" + side]);
                boxWrapper.classList.add(cl["boxSwing" + side]);
            }, 70);
            setTimeout(function () {
                block.style.boxShadow = "";
                box.classList.remove(cl.boxSwingRight, cl.boxSwingLeft, cl.boxSwingTop, cl.boxSwingBottom);
                legend.classList.remove(cl.boxSwingRight, cl.boxSwingLeft, cl.boxSwingTop, cl.boxSwingBottom);
                boxWrapper.classList.remove(cl.boxSwingRight, cl.boxSwingLeft, cl.boxSwingTop, cl.boxSwingBottom);
            }, 500);
            setTimeout(function () {
                block.style.transition = "";
                document.addEventListener("keydown", moving);
            }, 600);
            setTimeout(function () {
                span.style.transform = "scale(1, 0.2)";
            }, 1000);
            setTimeout(function () {
                span.style.opacity = "";
                clearInterval(bordBleem); //turn of the blinking boarder on kicked side
                block.classList.remove(cl.redBorderRight, cl.redBorderLeft, cl.redBorderTop, cl.redBorderBottom);
            }, 1300);
        }

        function startInstruction() {
            setTimeout(function () {
                cornerTooltip.style.display = "block";
            }, 1000);
            setTimeout(function () {
                cornerTooltip.style.display = "";
            }, 6000);
        }

        const popupDiscription_container = document.querySelector(`.${cl.popupDiscriptionContainer}`);
        const mainContent = document.querySelector(`.${cl.mainContent}`);

        function discriptionUp() {
            popupDiscription_container.classList.add(cl.popupDiscriptionContainerActive);
            popupDiscription_container.addEventListener("click", discriptionDown, { once: true });
            mainContent.classList.add(cl.mainContentFreezed);
        }

        function discriptionDown() {
            popupDiscription_container.classList.remove(cl.popupDiscriptionContainerActive);
            mainContent.classList.remove(cl.mainContentFreezed);
            startInstruction();
        }

        discriptionUp();
    }

    return (
        <div className={`${cl.page} ${cl.pageCubeinbox}`}>
            <div className={cl.mainContent}>
                <div className={cl.boxWrapper}>
                    <div className={cl.box}>
                        <div className={cl.legend}>
                            <ul>
                                <li>
                                    <span className={cl.simbolControl}>←</span> - left
                                </li>
                                <li>
                                    <span className={cl.simbolControl}>→</span> - right
                                </li>
                                <li>
                                    <span className={cl.simbolControl}>↑</span> - up
                                </li>
                                <li>
                                    <span className={cl.simbolControl}>↓</span> - down
                                </li>
                                <li>
                                    <span className={cl.simbolControl}> ˡ ̶̶̶̶ ̶ ̶ ˡ</span> - jump
                                </li>
                                <li>
                                    <span className={cl.simbolControl}>Сtrl-down</span> - squat
                                </li>
                                <li>
                                    <span className={cl.simbolControl}>Сtrl-up</span> - stand up
                                </li>
                            </ul>
                        </div>
                        <div className={cl.block}>
                            <span>BEEM!</span>
                        </div>
                        <div className={cl.positCorner}>
                            <div className={cl.cornerTooltip}>
                                Click the corner
                                <br />
                                and hold
                                <br />
                                for stretching box.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cl.popupDiscriptionContainer}>
                <div className={cl.popupDiscriptionContent}>
                    <p>
                        <strong>Only keyboard! No touchscreen!</strong>
                        <br />
                        The cube that can moove, jump and squat. You can also sretch the cube holding it`s corner.
                    </p>
                    <span>Click anywhere to close</span>
                    <button type="button" className={cl.popupDiscriptionContentButtonClose}></button>
                </div>
            </div>
        </div>
    );
};

export default CubeInBox;

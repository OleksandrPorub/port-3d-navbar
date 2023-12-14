import React, { useEffect } from "react";
// components
import BgEffectBubbles from "../../../components/BgEffectBubbles/BgEffectBubbles";
// css
import "./styles.scss";

const BattleShip = () => {
    function initialization() {
        typingString(".descriptionText", 60, 2600);

        function typingString(selector, speed = 60, delay = 300) {
            let descriptionElement = document.querySelector(selector);
            let text = descriptionElement.innerText;
            descriptionElement.innerText = "";
            let descriptionText_text = document.createElement("span");
            descriptionText_text.className = "descriptionTextText";
            let descriptionText_line = document.createElement("span");
            descriptionText_line.className = "descriptionTextLine";
            descriptionText_line.innerText = "_";

            setTimeout(() => {
                descriptionElement.prepend(descriptionText_text);
                descriptionText_text.after(descriptionText_line);

                let i = 0;
                let iterationText = setInterval(() => {
                    if (i < text.length) {
                        descriptionText_text.innerText = descriptionText_text.innerText + text[i];
                        i++;
                    } else {
                        clearInterval(iterationText);
                        descriptionText_line.remove();
                    }
                }, speed);
            }, delay);
        }

        const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        const boxOfShips = document.querySelector(".playboxBoxOfShips");
        const battleArea = [];

        const allShipsInTheBox = boxOfShips.querySelectorAll(".ship");     

        allShipsInTheBox.forEach((ship) => {
            ship.dataset.left = ship.offsetLeft;
            ship.dataset.top = ship.offsetTop;
        });

        allShipsInTheBox.forEach((ship) => {
            ship.style.left = ship.dataset.left + "px";
            ship.style.top = ship.dataset.top + "px";
            ship.style.position = "absolute";
        });

        const shipPositioner_But = document.querySelector(".shipPositioner");

        shipPositioner_But.addEventListener("click", shipsPositioner);

        shipPositioner_But.addEventListener("mousedown", shipsPositionerOn);

        function shipsPositionerOn(event) {
            shipPositioner_But.classList.add("pressedBut");
            shipPositioner_But.addEventListener("mouseup", shipsPositionerOf);
        }

        function shipsPositionerOf(event) {
            shipPositioner_But.classList.remove("pressedBut");
        }

        const variantsOfHorizont = function (ship) {
            let variantsOfHorizont = [];
            for (let row_N = 0; row_N < battleArea.length; row_N++) {
                for (let col_N = 0; col_N < battleArea[row_N].length; col_N++) {
                    for (let z = 0; z < ship && battleArea[row_N][col_N + z] == "free"; z++) {
                        if (z == ship - 1) {
                            variantsOfHorizont.push({
                                row: row_N,
                                col: col_N,
                                side: "right",
                                mast: ship,
                            });
                        }
                    }
                }
            }
            return variantsOfHorizont;
        };

        const variantsOfVertical = function (ship) {
            let variantsOfVertical = [];
            for (let col_N = 0; col_N < battleArea[0].length; col_N++) {
                for (let row_N = 0; row_N < battleArea.length; row_N++) {
                    for (let z = 0; z < ship && row_N + z <= 9 && battleArea[row_N + z][col_N] == "free"; z++) {
                        if (z == ship - 1) {
                            variantsOfVertical.push({
                                row: row_N,
                                col: col_N,
                                side: "down",
                                mast: ship,
                            });
                        }
                    }
                }
            }
            return variantsOfVertical;
        };

        function randomInteger(min, max) {          
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }

        const positionInteger = function (ship) {
            let allVariants = [...variantsOfHorizont(ship), ...variantsOfVertical(ship)];
            let randomIndex = randomInteger(0, allVariants.length - 1);
            return allVariants[randomIndex];
        };

        for (let i = 0; i <= 9; i++) {
            let battleArea_Row = [];
            for (let t = 0; t <= 9; t++) {
                battleArea_Row[t] = "free";
            }
            battleArea[i] = battleArea_Row.slice(0, battleArea_Row.length);
        }

        function allSellsFree() {
            for (let i = 0; i <= 9; i++) {
                for (let t = 0; t <= 9; t++) {
                    battleArea[i][t] = "free";
                }
            }
        }

        allShipsInTheBox.forEach((ship) => {
            ship.dataset.orientation = "vertical";
            ship.dataset.translateX = 0;
            ship.dataset.translateY = 0;
        });

        function shipsPositioner_0() {
            allSellsFree();

            allShipsInTheBox.forEach((ship) => {
                ship.classList.add("readyShip");
                ship.classList.remove("activeShip");
            });
        }

        function shipsPositioner() {
            shipPositioner_But.removeEventListener("click", shipsPositioner);
            shipPositioner_But.classList.add("disactivatedBut");

            setTimeout(() => {
                shipPositioner_But.addEventListener("click", shipsPositioner);
                shipPositioner_But.classList.remove("disactivatedBut");
            }, 2400);

            shipsPositioner_0();

            for (let key in ships) {
                let time = 160 * parseInt(key);

                setTimeout(() => {
                    let position = positionInteger(ships[key]);

                    let { row, col, mast } = position;

                    for (let i = 0; i < mast; i++) {
                        battleArea[row][col] = "occuped";
                        let tr = row + 1,
                            td = col + 1;
                        let cellOccuped = document.querySelector(".battleArea tr:nth-of-type(" + tr + ") td:nth-of-type(" + td + ")");
                        cellOccuped.className = "occuped";

                        if (i == 0) {
                            let activeShip = boxOfShips.querySelector(".ship:nth-of-type(" + (parseInt(key) + 1) + ")"),
                                translate_x =
                                    cellOccuped.getBoundingClientRect().left -
                                    1 -
                                    activeShip.getBoundingClientRect().left +
                                    parseInt(activeShip.dataset.translateX),
                                translate_y =
                                    cellOccuped.getBoundingClientRect().top -
                                    1 -
                                    activeShip.getBoundingClientRect().top +
                                    parseInt(activeShip.dataset.translateY),
                                rotateAngle = 0;

                            if (position.side == "right") {
                                rotateAngle = -90;
                            }

                            if (position.side == "right" && activeShip.dataset.orientation == "vertical") {
                                activeShip.dataset.orientation = "horizont";
                                translate_y = translate_y - (ships[key] - 1) * 15;
                                translate_x = translate_x + (ships[key] - 1) * 15;
                            }

                            if (position.side == "down" && activeShip.dataset.orientation == "horizont") {
                                activeShip.dataset.orientation = "vertical";
                                translate_y = translate_y + (ships[key] - 1) * 15;
                                translate_x = translate_x - (ships[key] - 1) * 15;
                            }

                            activeShip.style.zIndex = "6";
                            activeShip.style.transform =
                                "translate(" + (320 - parseInt(key) * 40) + "px, -420px) rotate(" + rotateAngle + "deg) scale(1.6, 1.6)";
                            activeShip.style.boxShadow = "18px 8px 30px 2px rgba(0,0,0,0.45)";
                            activeShip.style.opacity = "0.5";

                            setTimeout(() => {
                                activeShip.style.transform =
                                    "translate(" +
                                    (510 - parseInt(key) * 40) +
                                    "px, -180px) rotate(" +
                                    (rotateAngle + 120) +
                                    "deg) scale(2.0, 2.0)";
                                activeShip.style.boxShadow = "14px 14px 36px 4px rgba(0,0,0,0.45)";
                                activeShip.style.opacity = "0.7";
                            }, 300);

                            setTimeout(() => {
                                activeShip.style.transform =
                                    "translate(" +
                                    (320 - parseInt(key) * 40) +
                                    "px, 30px) rotate(" +
                                    (rotateAngle + 240) +
                                    "deg) scale(1.6, 1.6)";                           
                                activeShip.style.boxShadow = "14px 14px 36px 4px rgba(0,0,0,0.45)";
                                activeShip.style.opacity = "";
                            }, 600);

                            setTimeout(() => {
                                activeShip.style.transform =
                                    "translate(" +
                                    translate_x +
                                    "px, " +
                                    translate_y +
                                    "px) rotate(" +
                                    (rotateAngle + 360) +
                                    "deg) scale(1.1, 1.04)";
                                activeShip.dataset.translateX = translate_x;
                                activeShip.dataset.translateY = translate_y;
                                activeShip.style.transitionDuration = "";
                                activeShip.classList.add("activeShip");
                                activeShip.classList.remove("readyShip");
                                activeShip.style.boxShadow = "";
                            }, 850);
                        }

                        let leftRow = row,
                            leftCol = col - 1,
                            rightRow = row,
                            rightCol = col + 1,
                            topRow = row - 1,
                            topCol = col,
                            bottomRow = row + 1,
                            bottomCol = col,
                            leftTopRow = row - 1,
                            leftTopCol = col - 1,
                            rightTopRow = row - 1,
                            rightTopCol = col + 1,
                            rightBotRow = row + 1,
                            rightBotCol = col + 1,
                            leftBotRow = row + 1,
                            leftBotCol = col - 1;

                        if (battleArea[leftRow] && battleArea[leftRow][leftCol] && battleArea[leftRow][leftCol] == "free") {
                            battleArea[leftRow][leftCol] = "bordering";
                        }
                        if (battleArea[rightRow] && battleArea[rightRow][rightCol] && battleArea[rightRow][rightCol] == "free") {
                            battleArea[rightRow][rightCol] = "bordering";
                        }
                        if (battleArea[topRow] && battleArea[topRow][topCol] && battleArea[topRow][topCol] == "free") {
                            battleArea[topRow][topCol] = "bordering";
                        }
                        if (battleArea[bottomRow] && battleArea[bottomRow][bottomCol] && battleArea[bottomRow][bottomCol] == "free") {
                            battleArea[bottomRow][bottomCol] = "bordering";
                        }
                        if (battleArea[leftTopRow] && battleArea[leftTopRow][leftTopCol] && battleArea[leftTopRow][leftTopCol] == "free") {
                            battleArea[leftTopRow][leftTopCol] = "bordering";
                        }
                        if (
                            battleArea[rightTopRow] &&
                            battleArea[rightTopRow][rightTopCol] &&
                            battleArea[rightTopRow][rightTopCol] == "free"
                        ) {
                            battleArea[rightTopRow][rightTopCol] = "bordering";
                        }
                        if (
                            battleArea[rightBotRow] &&
                            battleArea[rightBotRow][rightBotCol] &&
                            battleArea[rightBotRow][rightBotCol] == "free"
                        ) {
                            battleArea[rightBotRow][rightBotCol] = "bordering";
                        }
                        if (battleArea[leftBotRow] && battleArea[leftBotRow][leftBotCol] && battleArea[leftBotRow][leftBotCol] == "free") {
                            battleArea[leftBotRow][leftBotCol] = "bordering";
                        }

                        if (position.side == "down") {
                            row++;
                        } else col++;
                    }
                }, time);
            }
        }
    }

    useEffect(initialization, []);

    return (        
        <div className="page pageBattleShip">
            <BgEffectBubbles/>
            <h1>battle area</h1>
            <p className="descriptionText">This app arranges the ships at random order an unlimited number of times</p>
            <div className="playboxWrap">
                <div className="playbox">
                    <table className="battleAreaWrap">
                        <tbody>
                            <tr>
                                <td></td>
                                <td>A</td>
                                <td>B</td>
                                <td>C</td>
                                <td>D</td>
                                <td>E</td>
                                <td>F</td>
                                <td>G</td>
                                <td>H</td>
                                <td>I</td>
                                <td>J</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td className="tdBattleArea" rowSpan="10" colSpan="10">
                                    <table className="battleArea">
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>7</td>
                            </tr>
                            <tr>
                                <td>8</td>
                            </tr>
                            <tr>
                                <td>9</td>
                            </tr>
                            <tr>
                                <td>10</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="playboxBoxOfShips">
                        <div className="ship ship4"></div>
                        <div className="ship ship3"></div>
                        <div className="ship ship3"></div>
                        <div className="ship ship2"></div>
                        <div className="ship ship2"></div>
                        <div className="ship ship2"></div>
                        <div className="ship ship1"></div>
                        <div className="ship ship1"></div>
                        <div className="ship ship1"></div>
                        <div className="ship ship1"></div>
                    </div>
                    <div className="shipPositioner">
                        <span className="shipPositionerText">arrange the ships</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BattleShip;

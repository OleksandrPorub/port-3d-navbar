
function mainScriptforJokes (){

    const pageJokesOfNorris = document.querySelector(".page-jokesOfNorris");
    const containerOfCategories = pageJokesOfNorris.querySelector("div.categories");
    let jokesArr = [];
    let favouriteJokes = localStorage.favouriteJokes ? JSON.parse(localStorage.favouriteJokes) : [];
    const leftSideContainer = pageJokesOfNorris.querySelector(".leftSide");

    favouriteJokesRender();

    async function request(path) {
        let resp = await fetch(path);
        if (resp.ok) {
            return resp.json();
        }
    }

    function toLocalStorage(favouriteJokes) {
        localStorage.favouriteJokes = JSON.stringify(favouriteJokes);
    }

    let buttonGetJoke = pageJokesOfNorris.querySelector(".btn-getJoke");
    buttonGetJoke.addEventListener("click", GetJoke);
    buttonGetJoke.addEventListener("mousedown", (event) => {
        event.target.classList.add("pressed");
    });
    buttonGetJoke.addEventListener("mouseup", (event) => {
        event.target.classList.remove("pressed");
    });

    request("https://api.chucknorris.io/jokes/categories").then((categoriesArr) => categoriesRender(categoriesArr));

    function categoriesRender(categoriesArr) {
        let ul = document.createElement("ul");
        ul.className = "categ_list";
        let randomCategoryNumber = getRandomInt(0, categoriesArr.length - 1);
        for (let key in categoriesArr) {
            let newLi = document.createElement("li");
            newLi.innerHTML = categoriesArr[key];
            key == randomCategoryNumber && newLi.classList.add("active");
            ul.appendChild(newLi);
            newLi.addEventListener("click", clickCategory);
        }
        containerOfCategories.appendChild(ul);
    }

    let inputs = pageJokesOfNorris.querySelectorAll('input[name="wayToSearch"]');
    let inpVal;

    inputs.forEach((inp) => {
        if (inp.checked) {
            inpVal = inp.value;
        }
    });

    let inputText = pageJokesOfNorris.querySelector('input[name="textToSearch"]');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function GetJoke() {
        let path;
        if (inpVal === "random") {
            path = "https://api.chucknorris.io/jokes/random";
        } else if (inpVal === "from categories") {
            let activeCategor = pageJokesOfNorris.querySelectorAll(".categ_list li.active");
            if (activeCategor.length == 0) {
                alert("Please, select at least one category!");
                return;
            } else {
                let activeCategorArr = [];
                for (let each of activeCategor) {
                    activeCategorArr.push(each.innerHTML);
                }
                let category = activeCategorArr[getRandomInt(0, activeCategorArr.length - 1)];
                path = `https://api.chucknorris.io/jokes/random?category=${category}`;
            }

            let activeCategorArr = [];
            for (let each of activeCategor) {
                activeCategorArr.push(each.innerHTML);
            }
            let category = activeCategorArr[getRandomInt(0, activeCategorArr.length - 1)];
            path = `https://api.chucknorris.io/jokes/random?category=${category}`;
        } else {
            if (inputText.value) {
                path = `https://api.chucknorris.io/jokes/search?query=${inputText.value}`;                
            } else {
                alert("Please, enter at least one symbol in the search line!");
                return;
            }
        }

        jokesArr = [];
        request(path).then((jokes) => {
            if (jokes.result) {
                jokesArr = jokes.result;
                if (jokesArr.length > 50) {
                    alert(`The list of getted jokes consists of ${jokesArr.length} items. It's too much! So there are just 50 of them.`);
                    jokesArr.length = 50;
                }
            } else jokesArr.push(jokes);
            jokesRender();
        });
    }

    function jokesRender() {
        let allGettedJokesContainer = pageJokesOfNorris.querySelector(".allGettedJokesContainer");
        allGettedJokesContainer.innerHTML = "";
        for (let each of jokesArr) {
            allGettedJokesContainer.appendChild(jokeContainerRender(each));
        }
    }

    function jokeContainerRender(each) {
        let jokeContainer = document.createElement("div");
        jokeContainer.classList.add("jokeContainer");
        jokeContainer.dataset.jokeId = each.id;

        let dateNow = new Date();
        let diffOfDatesInHours = Math.floor((+dateNow - Date.parse(each.updated_at)) / 3600000);

        jokeContainer.innerHTML = `
		<span class='iconHeart' title='click to add to favourites'></span>
		<div class="joke-id">
			ID:
			<a href=${each.url} target="_blank">${each.id}</a>
		</div>
		<p class="joke-text">${each.value}</p>
		<div class="joke-info">
			<span class="lastUpdate">Last update: ${diffOfDatesInHours} hours ago</span>
			<span class="categoryName">${each.categories[0] ? each.categories[0] : "no category"}</span>
		</div>
	`;
        let iconHeart = jokeContainer.querySelector(".iconHeart");
        for (let eachFavourite of favouriteJokes) {
            if (eachFavourite.id == jokeContainer.dataset.jokeId) {
                jokeContainer.classList.add("favourite");
                iconHeart.title = "click to remove from favourites";
                break;
            }
        }

        iconHeart.addEventListener("click", favorNotFavor);
        return jokeContainer;
    }

    inputText.addEventListener("keypress", function (event) {
        event.keyCode == 13 && GetJoke();
    });

    inputs.forEach((inp) => {
        inp.addEventListener("change", inpChanged);
    });

    function favorNotFavor(event) {
        let jokeCard = event.target.parentElement;
        jokeCard.classList.toggle("favourite");
        let jokeId = jokeCard.dataset.jokeId;
        if (jokeCard.classList.contains("favourite")) {
            let cloneJokeCard = jokeCard.cloneNode(true);
            cloneJokeCard.classList.add("cloned");
            cloneJokeCard.style.left = jokeCard.offsetLeft + "px";
            cloneJokeCard.style.top = jokeCard.offsetTop + "px";
            cloneJokeCard.style.width = jokeCard.offsetWidth + "px";
            leftSideContainer.appendChild(cloneJokeCard);

            let transX = leftSideContainer.clientWidth - jokeCard.offsetLeft - jokeCard.offsetWidth + leftSideContainer.offsetLeft + 25;
            let transY = jokeCard.offsetTop - leftSideContainer.scrollTop - 10;

            cloneJokeCard.style.transform = `translate(${transX}px, ${-transY}px) scaleY(0.25) scaleX(0.1)`;
            cloneJokeCard.style.opacity = "0.7";

            setTimeout(() => {
                cloneJokeCard.remove();
            }, 900);

            fromAlltoFavor(jokeId);
        } else removeFromFavor(jokeId);
        toLocalStorage(favouriteJokes);
        favouriteJokesRender();
        jokesRender();
    }

    function favouriteJokesRender() {
        let favouriteJokesContainer = pageJokesOfNorris.querySelector(".favouriteJokesContainer");
        favouriteJokesContainer.innerHTML = "";
        for (let each of favouriteJokes) {
            favouriteJokesContainer.appendChild(jokeContainerRender(each));
        }
    }

    function fromAlltoFavor(jokeId) {
        for (let joke of jokesArr) {
            if (joke.id == jokeId) {
                favouriteJokes.push(joke);
            }
        }
    }

    function removeFromFavor(jokeId) {
        for (let key in favouriteJokes) {
            if (favouriteJokes[key].id === jokeId) {
                favouriteJokes.splice(key, 1);
            }
        }
    }

    function clickCategory(event) {
        event.target.classList.toggle("active");
    }

    inpChanged();

    function inpChanged(event) {
        inputs.forEach((inp) => {
            if (inp.checked) {
                inpVal = inp.value;
            }
        });

        containerOfCategories.style.display = inpVal == "from categories" ? "block" : "none";
        inputText.style.display = inpVal == "search" ? "block" : "none";
    }
    
    let favActivation = pageJokesOfNorris.querySelector(".favouriteActivation");
    let favActivationIcon = pageJokesOfNorris.querySelector(".favouriteActivation_icon");
    let leftSide = pageJokesOfNorris.querySelector(".leftSide");
    favActivation.addEventListener("click", function (event) {
        favActivationIcon.classList.toggle("active");
        leftSide.classList.toggle("frozen");
        let favouriteJokesArea = pageJokesOfNorris.querySelector(".favouriteJokesArea");
        favouriteJokesArea.classList.toggle("show");
        let darkWafer = pageJokesOfNorris.querySelector(".darkWafer");
        darkWafer.classList.toggle("show");
    });

    const popupDiscription_container = pageJokesOfNorris.querySelector(".popupDiscription-container");  
    const mainContent = pageJokesOfNorris.querySelector(".mainContent");

    function discriptionUp() {
        popupDiscription_container.classList.add("popupDiscription-container-active");
        popupDiscription_container.addEventListener("click", discriptionDown, { once: true });
        mainContent.classList.add("mainContent-freezed");
    }

    function discriptionDown() {
        popupDiscription_container.classList.remove("popupDiscription-container-active");
        mainContent.classList.remove("mainContent-freezed");
    }

    setTimeout(() => {
        discriptionUp();
    }, 0);
}

export default mainScriptforJokes;


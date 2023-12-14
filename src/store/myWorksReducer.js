import { createSlice } from "@reduxjs/toolkit";
// crs
import imgSrc_cubeInBox from "../images/portfolioScreens/picBox.jpg";
import imgSrc_battleShip from "../images/portfolioScreens/picBattle.jpg";
import imgSrc_formCustom from "../images/portfolioScreens/picForm.jpg";
import imgSrc_toDoList from "../images/portfolioScreens/picToDoList.jpg";
import imgSrc_jokesOfNorris from "../images/portfolioScreens/jokesOfNorris.jpg";

export const myWorksSlice = createSlice({
    name: "myWorks",
    initialState: {
        works: [
            {
                title: {
                    en: "To-do list",
                    uk: "Список справ",
                },
                discription: {
                    en: 'This component consists of items you have to do. You can add your own tasks, you can add some fake tasks from the remote source (jsonplaceholder.typicode.com), you can mark the tasks you have done, you can filter tasks by "COMPLETED", and search the tasks that include some phrase. You can edit every task. You can move a task to Trash. Then you can open the Trash and return the tasks you want to the main list. At the start, the list includes some default tasks, that allow you to understand the possibilities of the app.',
                    uk: 'Цей компонент керує пунктами, які ви маєте виконати. Ви можете додавати власні завдання, додавати фейкові завдання з віддаленого джерела (jsonplaceholder.typicode.com), позначати завдання, які ви виконали, фільтрувати завдання за статусом "ВИКОНАНО", а також шукати завдання, які містять певну фразу. Ви можете редагувати кожне завдання. Ви можете кинути завдання до Корзини. Ви можете перейти до кошика і повернути завдання. Список містить декілька завдання за замовчуванням, щоб ви змогли відразу зрозуміти можливості програми.',
                },
                imgSrc: imgSrc_toDoList,
                href: "todolist",
            },

            {
                title: {
                    en: "Jokes of Chuck Norris",
                    uk: "Жарти Чака Норріса",
                },
                discription: {
                    en: 'This app uses the API from https://api.chucknorris.io/ and generates (downloads) Chuck Norris`s jokes 😉. You have the possibility to choose one of three options: download a random joke; download a joke from one of the categories you selected; or download jokes, that include the phrase you wrote. You also can save jokes in "Favourites" by clicking on the heart icon (the action has an interesting animation). All the favorite jokes are saved in the browser and you will see them in the next session.',
                    uk: 'Ця програма використовує API з https://api.chucknorris.io/ і генерує (завантажує) жарти Чака Норріса 😉. У вас є можливість вибрати один з трьох варіантів: завантажити випадковий жарт; завантажити жарт з однієї з обраних вами категорій; або завантажити жарти, які включають фразу, яку ви написали. Ви також можете зберігати жарти в "Улюблені", натиснувши на іконку з сердечком (цей процес має цікаву анімацію). Всі вибрані жарти зберігаються в браузері, і ви побачите їх під час наступного сеансу.',
                },
                imgSrc: imgSrc_jokesOfNorris,
                href: "jokesofnorris",
            },

            {
                title: {
                    en: "Battle ship",
                    uk: "Морський бій",
                },
                discription: {
                    en: 'This app arranges the ships in random order. This is the basis for the well-known game "Battleship" originally designed to be played with paper and a pencil. Every time you push a button, the ships will leave their places and take new places in an arbitrary manner. Of course, the ships do not touch each other. It’s just a computer setting up ships according to the rules in one of many possible combinations. However, in order to complete the real game, you will also need a second field where the player will place their own ships.',
                    uk: 'Цей застосунок розставляє кораблі у випадковому порядку. Це основа відомої гри "Морський бій", яка спочатку була розроблена для гри з папером та олівцем. Кожного разу, коли ви натискаєте кнопку, кораблі залишають свої місця і займають нові місця в довільному порядку. Звичайно, кораблики не торкаються один одного. Це просто комп`ютер розставляє кораблі згідно з правилами в одній з багатьох можливих комбінацій. Однак для того, щоб зіграти у справжню гру, вам би знадобилося друге поле, на якому другий гравець розміщував би свої власні кораблі.',
                },
                imgSrc: imgSrc_battleShip,
                href: "battleship",
            },

            {
                title: {
                    en: "Form with custom elements",
                    uk: "Форма із кастомними елементами ",
                },
                discription: {
                    en: "The highlight of this form is styled custom elements. Especially want to focus on CUSTOM SELECT, which allows you to style it at your discretion. All the elements support keyboard control. CUSTOM SELECT has tips on how to control using the keyboard. With animation, placeholders in the input elements turn into labels when it is relevant. You can attach the image to the form and immediately see it in the corresponding element.",
                    uk: "Родзинкою цієї форми є стилізовані кастомні елементи. Особливо хочеться відзначити CUSTOM SELECT, який дозволяє стилізувати його на свій розсуд. Всі елементи підтримують управління з клавіатури. CUSTOM SELECT має підказки про те, як керувати за допомогою клавіатури. За допомогою анімації заповнювачі в елементах введення перетворюються на підписи, коли це доречно. Ви можете прикріпити зображення до форми і одразу побачити його у відповідному елементі.",
                },
                imgSrc: imgSrc_formCustom,
                href: "pagewithformcustom",
            },

            {
                title: {
                    en: "Cube in Box",
                    uk: "Кубик у коробці",
                },
                discription: {
                    en: "This funny toy allows you to move the cube in the container using keyboard arrows. Unfortunately, the touch screen is useless here. The cube that can move, jump and squat. When the cube hits the wall, it shakes the container. You can also stretch the container where the cube moves.  For this, you need to click on the bottom right corner and hold it while you change the size. See the pop-up tips. 😉",
                    uk: "Ця кумедна іграшка дозволяє переміщати кубик у контейнері за допомогою стрілок на клавіатурі. На жаль, сенсорний екран тут безпорадний. Кубик, може рухатися, стрибати і присідати. Коли кубик вдаряється об стіну, він трясе контейнер. Ви також можете розтягувати контейнер.  Для цього потрібно натиснути на правий нижній кут і, утримуючи його, змінюйте розмір. Дивіться спливаючі підказки. 😉",
                },
                imgSrc: imgSrc_cubeInBox,
                href: "cubeinbox",
            },
        ],
    },
    reducers: {},
});

export default myWorksSlice.reducer;

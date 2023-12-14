import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
// components
import InputPlus from "./components/InputPlus/InputPlus";
import InputTask from "./components/InputTask/InputTask";
// images
import { MySvgTrashCan, MySvgTrashClear } from "./svgSourses";
// css
import styles from "./index.module.scss";
import "./otherstyles.scss";
// data store actions
import { addTasks, createTask, emptyTrash, sortTasks_byDate } from "../../../store/toDoListReducer";
//localisation
import { useTranslation } from "react-i18next";

const ToDoList = () => {
    const mainTasks = useSelector((state) => state.todoList.tasks);
    const trashTasks = useSelector((state) => state.todoList.trashTasks);
    const [tasks, setTasks] = useState(mainTasks);
    const [tasksFiltered, setTasksFiltered] = useState([...tasks]);
    const [filterName, setFilterName] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [isTrashMode, setIsTrashMode] = useState(false);
    const dispatch = useDispatch();
    //localisation
    const { t } = useTranslation();
    const tns = function () {
        return t(...arguments, { ns: 'toDo' });
    }

    useEffect(() => {
        isTrashMode ? setTasks(trashTasks) : setTasks(mainTasks);
    }, [isTrashMode, mainTasks, trashTasks]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(sortTasks_byDate());
        }, 500);
    }, [dispatch]);

    useEffect(() => {
        localStorage.toDoTasks = JSON.stringify(mainTasks);
    }, [mainTasks]);

    useEffect(() => {
        localStorage.toDoTrashTasks = JSON.stringify(trashTasks);
    }, [trashTasks]);

    useEffect(() => {
        filter_isCompleted(tasks, filterName, searchValue);
    }, [tasks, filterName, searchValue]);

    async function fetchGET_byURL(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            } else alert("Tasks` request failed! :(");
        } catch (error) {
            console.log(error);
        }
    }

    async function addTasksFromRemote() {
        const value = prompt(tns("todo.options.prompt-query", "How many tasks do you want to load?:"));
        let number = value ? parseInt(value) : 0;
        while (isNaN(number)) {
            const value = prompt("The value is not a number! How many tasks do you want to load?:");
            number = value ? parseInt(value) : 0;
        }
        while (number > 100 || number < 0) {
            const value = prompt("The value must be in the range 0...100! How many tasks do you want to load?:");
            number = value ? parseInt(value) : 0;
        }
        const path = `https://jsonplaceholder.typicode.com/todos?_limit=${number}`;
        let failureCounter = 0;
        const data = await fetchGET_byURL(path);
        data.forEach((task) => {
            task.id = task.id + "-br_" + Date.now();
            if (tasks.findIndex((item) => item.id === task.id) < 0) {
                dispatch(addTasks({ newTasks: [task] }));
            } else failureCounter++;
        });
        failureCounter &&
            alert(`${failureCounter} adding tasks have an id identical to some id in the current list! So they will not be added.`);
    }

    function filter_isCompleted(tasks, filterName, searchValue) {
        let tasks_isCompleted;
        if (filterName === "completed") {
            tasks_isCompleted = tasks.filter((task) => task.completed);
        } else if (filterName === "not completed") {
            tasks_isCompleted = tasks.filter((task) => !task.completed);
        } else tasks_isCompleted = tasks;

        searchValue
            ? setTasksFiltered(tasks_isCompleted.filter((task) => task.title.toLowerCase().includes(searchValue.toLowerCase())))
            : setTasksFiltered(tasks_isCompleted);
    }

    function clearInputSearch(e) {
        setSearchValue("");
    }

    return (
        <div className={`page ${styles.pageToDoList}`}>
            <article className={styles.article}>
                <h1 className={styles.articleTitle}>{tns("todo.h1", "To Do List")}</h1>
                <section className={styles.articleSection_Create}>
                    <div className={styles.otherOptions}>
                        <button
                            className={styles.trashOnButton + (isTrashMode ? ` ${styles.trashMode}` : "")}
                            onClick={() => {
                                setIsTrashMode(!isTrashMode);
                            }}
                            title={isTrashMode ? tns("todo.options.toolt-main", "Main") : tns("todo.options.toolt-trash", "Trash")}
                            style={{ '--toolt_L': 'calc(100% + 5px)', '--toolt_T': '0' }}
                        >
                            <MySvgTrashCan />
                        </button>
                        {isTrashMode ? (
                            <button
                                className={styles.emptyTrashButton}
                                onClick={() => {
                                    if (trashTasks.length) {
                                        window.confirm(tns("todo.options.confirm-q", "Do you want to delete forever all the tasks from the trash?")) && dispatch(emptyTrash())
                                    } else alert(tns("todo.options.alert-phrase", "There is no any tasks in the trash!"));
                                }}
                                title={tns("todo.options.toolt-emptyTrash", "Empty the trash")}
                                style={{ '--toolt_L': '6px', '--toolt_T': 'calc(100% + 5px)' }}
                            >
                                <span>
                                    {tns("todo.options.emptyTrash", "CLEAN")}
                                </span>
                                <MySvgTrashClear />
                            </button>
                        ) : (
                            <button
                                className={styles.addTasksButton}
                                onClick={addTasksFromRemote}
                            >
                                {tns("todo.options.addFake_p1", "Add fake tasks")} <br /> {tns("todo.options.addFake_p2", "from a remote source")}
                            </button>
                        )}
                    </div>
                    {!isTrashMode && (
                        <InputPlus
                            onAdd={(title) => {
                                if (title) {
                                    dispatch(createTask(title));
                                }
                            }}
                            placeholder={tns("todo.options.placeholder", "new Task...")}
                        ></InputPlus>
                    )}

                    <div className={styles.filters}>
                        <select
                            className={styles.filterIsCompleted + (isTrashMode ? ` ${styles.trashMode}` : "")}
                            onChange={(e) => {
                                setFilterName(e.target.value);
                            }}
                        >
                            <option value="all">{tns("todo.options.select.all", "ALL")}</option>
                            <option value="completed">{tns("todo.options.select.completed", "COMPLETED")}</option>
                            <option value="not completed">{tns("todo.options.select.notcompleted", "NOT COMPLETED")}</option>
                        </select>
                        <div className={styles.filters + " " + styles.filterSearch}>
                            <input
                                className={styles.inputSearch + (isTrashMode ? ` ${styles.trashMode}` : "")}
                                placeholder={tns("todo.options.search", "search")}
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            >
                            </input>
                            <button className={styles.buttonClear}
                                onClick={clearInputSearch}
                            >
                            </button>
                        </div>
                    </div>
                </section>

                <section className={styles.articleSection_Tasks + (isTrashMode ? ` ${styles.trashMode}` : "")}>
                    {isTrashMode ? <h2>{tns("todo.h2_trash", "Trash")}</h2> : <h2>{tns("todo.h2_main", "Main")}</h2>}
                    <ul>
                        {tasksFiltered.length === 0 && <p className={styles.articleSectionText}>There is no any tasks</p>}
                        <TransitionGroup component={null}>
                            {tasksFiltered.map((task) => (
                                <CSSTransition key={task.id} timeout={500} classNames="articleSectionTextLi">
                                    <li className="articleSectionTextLi">
                                        <InputTask
                                            id={task.id}
                                            title={task.title}
                                            createdAt={task.createdAt}
                                            isChecked={task.completed}
                                            isTrashMode={isTrashMode}
                                        />
                                    </li>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ul>
                </section>
            </article>
        </div>
    );
};

export default ToDoList;

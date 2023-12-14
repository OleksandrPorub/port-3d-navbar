import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Transition } from "react-transition-group";
// data store actions
import { changeCompleted, removeTask, returnToMain, toTrash, updateTask } from "../../../../../store/toDoListReducer";
// css
import styles from "./InputTask.module.scss";
import "./otherstyles.scss";
//localisation
import { useTranslation } from "react-i18next";


const InputTask = ({ id, title, createdAt, isChecked, isTrashMode }) => {

    const [inputValue, setInputValue] = useState(title);
    const [isEditMode, setIsEditMode] = useState(false);
    const [taskValue, setTaskValue] = useState(title);
    const elem_p_Ref = useRef(null);
    const elem_input_Ref = useRef(null);
    const dispatch = useDispatch();
    //localisation
    const { t, i18n } = useTranslation();
    const tns = function () {
        return t(...arguments, { ns: 'toDo' });
    }

    useEffect(() => {
        if (elem_p_Ref.current) {
            const elem_p = elem_p_Ref.current;
            elem_p.innerText = taskValue;
        }
    }, [taskValue]);

    useEffect(() => {
        if (isEditMode) {
            elem_input_Ref.current?.focus();
        } else {
            if (elem_input_Ref.current) {
                setTimeout(() => {
                    if (elem_input_Ref.current) {
                        elem_input_Ref.current.style.width = "100%";
                        elem_input_Ref.current.style.height = "100%";
                    }
                }, 50);
            }
        }
    }, [isEditMode]);

    function saveChanges() {
        dispatch(updateTask({ id: id, title: inputValue }));
        setTaskValue(inputValue);
        setIsEditMode(false);
    }

    return (
        <div className={styles.inputTask + (isTrashMode ? ` ${styles.trashMode}` : "")}>
            <time title={`id: ${id}`} className={styles.inputTaskTime}>
                {tns("todo.inputTask.updated", "updated")}: &nbsp; {createdAt}
            </time>
            <div className={styles.inputTaskContainer}>
                <input
                    type="checkbox"
                    className={styles.inputTaskContainerCheck}
                    title={isChecked ? tns("todo.inputTask.toolt-input-compl", "completed") : tns("todo.inputTask.toolt-input-notcompl", "not completed")}
                    disabled={isEditMode || isTrashMode}
                    checked={isChecked}
                    onChange={() => {
                        dispatch(changeCompleted({ id: id, completed: !isChecked }));
                    }}
                />
                <div className={styles.inputTaskContainerWrap}>
                    <p ref={elem_p_Ref} className={styles.inputTaskContainerWrapText}></p>
                    <Transition in={isEditMode} timeout={0}>
                        {(state) => (
                            <textarea
                                ref={elem_input_Ref}
                                className={[styles.inputTaskContainerWrapValue, "transItemText", "transItemText-" + state].join(" ")}
                                rows={1}
                                cols={3}
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                }}
                            ></textarea>
                        )}
                    </Transition>
                </div>
                {isTrashMode ? (
                    <button                        
                        title={tns("todo.inputTask.toolt-return", "return")}
                        className={[styles.inputTaskContainerButton, styles.inputTaskContainerButton_return].join(" ")}
                        onClick={() => { dispatch(returnToMain(id)) }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M112 160l-64 64 64 64" /><path d="M64 224h294c58.76 0 106 49.33 106 108v20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                    </button>
                ) : (
                    isEditMode ? (
                        <button
                            title={tns("todo.inputTask.toolt-save", "save")}
                            className={[styles.inputTaskContainerButton, styles.inputTaskContainerButton_save].join(" ")}
                            onClick={saveChanges}
                        ></button>
                    ) : (
                        <button
                            title={tns("todo.inputTask.toolt-edit", "edit")}
                            className={[styles.inputTaskContainerButton, styles.inputTaskContainerButton_edit].join(" ")}
                            onClick={() => {
                                setIsEditMode(true);
                            }}
                        ></button>
                    )
                )}
                {isTrashMode ? (
                    <button
                        title={tns("todo.inputTask.toolt-remove", "remove")}
                        className={[styles.inputTaskContainerButton, styles.inputTaskContainerButton_remove].join(" ")}
                        onClick={() => {
                            dispatch(removeTask(id));
                        }}
                    ></button>
                ) : (
                    <button
                        title={tns("todo.inputTask.toolt-removeTo", "remove to trash")}
                        className={[styles.inputTaskContainerButton, styles.inputTaskContainerButton_remove].join(" ")}
                        onClick={() => {
                            dispatch(toTrash(id));
                        }}
                    ></button>
                )}
            </div>
        </div>
    );
};

export default InputTask;
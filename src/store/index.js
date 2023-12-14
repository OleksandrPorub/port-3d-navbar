import { combineReducers, configureStore } from "@reduxjs/toolkit";
// data store reducers
import activePageNameReducer from "./activePageNameReducer";
import todoListReducer from "./toDoListReducer";
import myWorksReducer from "./myWorksReducer";

const rootReducer = combineReducers({
    activePageName: activePageNameReducer,
    todoList: todoListReducer,
    myWorks: myWorksReducer,
})

export default configureStore({
    reducer: rootReducer,
  })

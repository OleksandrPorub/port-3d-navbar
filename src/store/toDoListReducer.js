import { createSlice } from '@reduxjs/toolkit'
// helpers
import { dateToString, generateId } from './helpers'

let initialTasks=[];
let initialTrashTasks=[];

initialTasks =
localStorage.toDoTasks ? JSON.parse(localStorage.toDoTasks)
: [
    {
        id: "jbr0fg0gf-01",
        title: "01. Task default. \n ipsum dolor sit amet consectetur adipisicing velit aspernatur fugit eius",
        createdAt: dateToString(),
        seriaDate: Date.now(),
        completed: true,
    },
    {
        id: "jbr0fg0gf-02",
        title: "02. Task default.",
        createdAt: dateToString(),
        seriaDate: Date.now(),
        completed: false,
    },
    {
        id: "jbr0fg0gf-03",
        title: "03. Task default. \n  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum architecto ipsa labore dolorem, eos corrupti eaque cupiditate, numquam consectetur tempore quasi optio velit aspernatur fugit eius itaque rem ratione sequi incidunt quae odit, laboriosam id laborum! Rem vel, libero maxime ullam, et ipsam perspiciatis iusto eos, illum similique pariatur. Voluptatibus ut quidem distinctio alias commodi pariatur minus quibusdam iste praesentium accusantium fugit, culpa dolorem quis harum est illo accusamus? Id, unde placeat modi at sapiente architecto. Officia, facere at! Culpa, eaque eos. Quae perferendis dolorem ipsum repellendus minima rem corporis neque numquam iusto. Suscipit, earum? Possimus voluptate commodi tenetur reiciendis?",
        createdAt: dateToString(),
        seriaDate: Date.now(),
        completed: false,
    }
];


initialTrashTasks = 
localStorage.toDoTrashTasks ? JSON.parse(localStorage.toDoTrashTasks) 
: [
    {
        id: "jbr0fg0gf-01-trash",
        title: "01. Task default-TRASH. \n ipsum dolor sit amet consectetur adipisicing velit aspernatur fugit eius",
        createdAt: dateToString(),
        seriaDate: Date.now(),
        completed: true,
    },
    {
        id: "jbr0fg0gf-02-trash",
        title: "02. Task default-TRASH.",
        createdAt: dateToString(),
        seriaDate: Date.now(),
        completed: false,
    },
];


export const todoListSlice = createSlice({
    name: 'todoList',
    initialState: {
        tasks: initialTasks,
        trashTasks: initialTrashTasks,
    },

    reducers: {
        createTask: (state, action) => {
            const newTask = {
                id: generateId(),
                title: action.payload,
                createdAt: dateToString(),
                seriaDate: Date.now(),
                completed: false,
            };
            state.tasks.unshift(newTask);          
        },
        updateTask: (state, action) => {
            const id = action.payload.id;
            const newTitle = action.payload.title;
            const task = state.tasks.find((item) => item.id === id);
            if(task){
                task.title = newTitle; 
                task.createdAt = dateToString();
                task.seriaDate = Date.now();                
            }
        },
        removeTask: (state, action) => {
            const id = action.payload;
            const index = state.trashTasks.findIndex((task)=>(task.id===id));
            state.trashTasks.splice(index, 1);           
        },
        toTrash: (state, action) => {
            const id = action.payload;
            const index = state.tasks.findIndex((task)=>(task.id===id));
            const deletedTasks = state.tasks.splice(index, 1);
            state.trashTasks.unshift(...deletedTasks);
        },
        emptyTrash: (state, action) => {
            state.trashTasks =[];
        },
        returnToMain: (state, action) => {
            const id = action.payload;
            const index = state.trashTasks.findIndex((task)=>(task.id===id));
            const deletedTasks = state.trashTasks.splice(index, 1);
            state.tasks.unshift(...deletedTasks);
        },
        changeCompleted: (state, action) => {
            const id = action.payload.id;
            const newCompleted = action.payload.completed;
            const task = state.tasks.find((item) => item.id === id);
            task && (task.completed = newCompleted);
        },
        addTasks: (state, action) => {
            const newTasks = action.payload.newTasks;
            newTasks.forEach(task=>{
                task.createdAt = dateToString();
                task.seriaDate = Date.now();
                state.tasks.unshift(task);
            });        
        },
        sortTasks_byDate: (state) => {
            state.tasks.sort((taskPrev, taskCurr)=>taskCurr.seriaDate - taskPrev.seriaDate);
        },
    }
  })

export const { createTask, updateTask, removeTask, changeCompleted, addTasks, sortTasks_byDate, toTrash, emptyTrash, returnToMain } = todoListSlice.actions;
export default todoListSlice.reducer;

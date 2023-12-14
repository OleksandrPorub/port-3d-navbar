import { createSlice } from "@reduxjs/toolkit";

export const activePageNameSlice = createSlice({
    name: "activePage",
    initialState: {
        name: "home",
    },
    reducers: {
        setPageNameAction: (state, action) => {
            state.name = action.payload;
        },
    },
});

export const { setPageNameAction } = activePageNameSlice.actions;

export default activePageNameSlice.reducer;
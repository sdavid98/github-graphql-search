import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    activePageNum: 0,
    totalPageCount: null,
    activeEndCursor: true
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setActivePageNum: (state, action) => {
            state.activePageNum = action.payload
        },
        setTotalPageCount: (state, action) => {
            state.totalPageCount = action.payload
        },
        toNextPage: (state) => {
            state.activePageNum++
        },
        toPreviousPage: (state) => {
            state.activePageNum--
        },
        setActiveEndCursor: (state, action) => {
            state.activeEndCursor = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setActivePageNum, setTotalPageCount, toNextPage, toPreviousPage, setActiveEndCursor} = pageSlice.actions

export default pageSlice.reducer
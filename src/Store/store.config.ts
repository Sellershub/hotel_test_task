import { configureStore } from "@reduxjs/toolkit";
import {chambermaidReducer } from './chambermaid.slice'


const store = configureStore({
    reducer: {
        chambermaidReducer,
    }
});

export {store};
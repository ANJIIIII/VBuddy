import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./slices/inventorySlice.js"
import petSlice from "./slices/petSlice.js"
import visitSlice from "./slices/visitSlice.js"
import authSlice from "./slices/authSlice.js"
import attendanceSlice from "./slices/attendanceSlice.js"
export const store=configureStore({
    reducer:{
        inventory:inventorySlice,
        pets:petSlice,
        visits:visitSlice,
        auth:authSlice,
        attendance:attendanceSlice
    }
})
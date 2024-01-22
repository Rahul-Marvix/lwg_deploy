import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "./slices/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine reducers (if you have more than one)
const rootReducer = combineReducers({
    user: userSlice,
    // Add other reducers here if you have any
});

// Configuration for Redux Persist
const persistConfig = {
    key: "root",
    storage,
    // Add any other config options here
};

// Apply Redux Persist to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer, // Use the persistedReducer here
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };

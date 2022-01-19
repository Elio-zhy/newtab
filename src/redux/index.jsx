import { configureStore } from "@reduxjs/toolkit";

import quicklinkReducer from "./reducers/quicklink";

const store = configureStore({
    reducer: {
        quicklink: quicklinkReducer
    }
});

export default store;
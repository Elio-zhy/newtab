import { createAction } from "redux-actions";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { urlToDataUrl } from "../../utils";

export const addLink = createAsyncThunk(
    "link/add",
    async (payload_, thunkAPI) => {
        let payload = payload_;
        try {
            const dataUrl = await urlToDataUrl(payload.icon)
            payload = { ...payload, icon: dataUrl }
        } catch (error) {
            console.log("failed to convert \"" + payload.icon + "\"\n", error);
        }

        return payload;
    }
);
export const deleteLink = createAction("link/delete");

export const toggleEditor = createAction("editor/toggle");
export const submitEditor = createAction("editor/submit");
export const toggleAdder = createAction("adder/toggle");
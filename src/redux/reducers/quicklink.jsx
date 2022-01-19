import { handleActions } from "redux-actions";

const initialState = () => ({
    quicklinks: JSON.parse(localStorage.getItem("quicklinks")) || [],
    adder: false,
    editor: {
        visibility: false,
        name: "",
        uuid: "",
        icon: ""
    }
});

export const quicklinkReducer = handleActions({
    "link/add/fulfilled"(state, action) {
        const quicklinks = [...state.quicklinks, action.payload];
        localStorage.setItem("quicklinks", JSON.stringify(quicklinks));
        return { ...state, quicklinks: quicklinks };
    },
    "link/delete"(state, action) {
        const quicklinks = state.quicklinks.filter((item) => item.uuid !== action.payload);
        localStorage.setItem("quicklinks", JSON.stringify(quicklinks));
        return { ...state, quicklinks: quicklinks };
    },

    "editor/toggle"(state, action) {
        const visibility = action.payload.visibility;
        switch (visibility) {
            case false: {
                return { ...state, editor: { visibility: false, name: "", uuid: "" } };
            }
            case true: {
                const uuid = action.payload.uuid;
                const link = state.quicklinks.filter((item) => item.uuid === uuid)[0];

                return { ...state, editor: { visibility: true, name: link.name, icon: link.icon, uuid: uuid } };
            }
            default: {
                return state;
            }
        }
    },
    "editor/submit"(state, action) {
        const { uuid, ..._ } = state.editor;
        const quicklinks = state.quicklinks.map((item) => item.uuid === uuid ? { ...item, name: action.payload.name, icon: action.payload.icon } : item);
        localStorage.setItem("quicklinks", JSON.stringify(quicklinks));
        return { ...state, quicklinks: quicklinks };
    },

    "adder/toggle"(state, action) {
        return { ...state, adder: action.payload };
    }
}, initialState());

export default quicklinkReducer;
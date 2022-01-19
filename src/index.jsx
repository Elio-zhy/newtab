import React from "react";
import ReactDOM from "react-dom";

import NewTabPage from "./pages";

const MOUNT_NODE = document.getElementById("mount");

ReactDOM.render(
    <React.StrictMode>
        <NewTabPage />
    </React.StrictMode>,
    MOUNT_NODE
);
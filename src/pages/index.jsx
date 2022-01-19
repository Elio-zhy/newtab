import React, { Component } from "react";
import { Provider } from "react-redux";
import QuickLinkWidget from "../components/QuickLinkWidget";

import store from "../redux";
import "./index.scss";

class NewTabPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div className="newtab-page">
                    <QuickLinkWidget />
                </div>
            </Provider>
        );
    }
}

export default NewTabPage;
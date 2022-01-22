import React, { Component } from "react";
import { Provider } from "react-redux";

import QuickLinkWidget from "../components/QuickLinkWidget";
import SearchWidget from "../components/SearchWidget";
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
                    <SearchWidget />
                    <QuickLinkWidget />
                </div>
            </Provider>
        );
    }
}

export default NewTabPage;
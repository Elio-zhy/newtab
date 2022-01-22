import React, { Component } from "react";
import { Search } from "react-feather";

import "./styles/index.scss";

class SearchWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            q: ""
        };
    }

    render() {
        const action = "https://www.google.com/search";
        return (
            <form action={action} method={"get"} className="search-widget">
                <div className="input-container">
                    <input type={"text"} placeholder="Search the web" spellCheck={"false"} value={this.state.q} name="q"
                        onChange={(e) => this.setState({ q: e.target.value })}
                    />
                    <button className="search-icon-container" type={"submit"}>
                        <Search />
                    </button>
                </div>
            </form>
        );
    }
}

export default SearchWidget;
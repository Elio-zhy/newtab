import React, { Component } from "react";
import { batch, connect } from "react-redux";
import { X } from "react-feather";
import { v4 as uuidv4 } from "uuid";

import * as quicklinkActions from "../../redux/actions/quicklink";
import "./styles/adder.scss";

class _Adder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            url: "",
            icon: ""
        }
    }

    close = () => {
        this.setState({
            name: "",
            url: "",
            icon: ""
        });
        this.props.dispatch(quicklinkActions.toggleAdder(false));
    }

    add = () => {
        let url, icon;

        if (this.state.name.length <= 0 || this.state.url.length <= 0) {
            return;
        }

        if (!(this.state.url.startsWith("https://") || this.state.url.startsWith("http://"))) {
            url = "http://" + this.state.url;
        } else {
            url = this.state.url;
        }

        icon = this.state.icon ||
            "https://services.keeweb.info/favicon/" + url.replace("https://", "").replace("http://", "");

        this.setState({
            name: "",
            url: "",
            icon: ""
        });

        batch(() => {
            this.props.dispatch(quicklinkActions.addLink({
                name: this.state.name,
                url: url,
                icon: icon,
                uuid: uuidv4()
            }));
            this.props.dispatch(quicklinkActions.toggleAdder(false));
        });

    }

    render() {
        return (
            <div className="quicklink-adder">
                <div className="popup-window">
                    <div className="header">
                        <h1 className="header-title">Add a website</h1>
                        <div className="icon-btn" onClick={() => this.close()}>
                            <X />
                        </div>
                    </div>
                    <div className="body">
                        <div className="input-container">
                            <p>Name</p>
                            <input autoFocus tabIndex={"0"} type={"text"} spellCheck={"false"} placeholder="" title="Name"
                                value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}
                            />
                        </div>
                        <div className="input-container">
                            <p>URL</p>
                            <input tabIndex={"0"} type={"text"} spellCheck={"false"} placeholder="" title="URL"
                                value={this.state.url} onChange={(e) => this.setState({ url: e.target.value })}
                            />
                        </div>
                        <div className="input-container">
                            <p>Icon (optional)</p>
                            <input tabIndex={"0"} type={"text"} spellCheck={"false"} placeholder="" title="Icon"
                                value={this.state.icon} onChange={(e) => this.setState({ icon: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="footer">
                        <button className="btn" onClick={() => this.add()}>Add</button>
                        <button className="btn" onClick={() => this.close()}>Cancel</button>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        );
    }
}

const Adder = connect((state, props) => ({}))(_Adder);

export default Adder;
import React, { Component } from "react";
import { batch, connect } from "react-redux";
import { X } from "react-feather";

import * as quicklinkActions from "../../redux/actions/quicklink";
import "./styles/editor.scss";

class _Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.editor.name,
            icon: this.props.editor.icon
        };
    }

    close = () => {
        this.props.dispatch(quicklinkActions.toggleEditor({ visibility: false }));
    }

    save = () => {
        batch(() => {
            this.props.dispatch(quicklinkActions.submitEditor({
                name: this.state.name,
                icon: this.state.icon
            }));
            this.props.dispatch(quicklinkActions.toggleEditor({ visibility: false }));
        });
    }

    render() {
        return (
            <div className="quicklink-editor">
                <div className="popup-window">
                    <div className="header">
                        <h1 className="header-title">Edit a website</h1>
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
                            <p>Icon</p>
                            <input tabIndex={"0"} type={"text"} spellCheck={"false"} placeholder="" title="Icon"
                                value={this.state.icon} onChange={(e) => this.setState({ icon: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="footer">
                        <button className="btn" onClick={() => this.save()}>Save</button>
                        <button className="btn" onClick={() => this.close()}>Cancel</button>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        );
    }
}

const Editor = connect((state, props) => ({
    editor: state.quicklink.editor
}))(_Editor);

export default Editor;
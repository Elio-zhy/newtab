import React, { Component } from "react";
import { connect } from "react-redux";

import Adder from "./Adder";
import Editor from "./Editor";
import QuickLinks from "./QuickLinks";

class _QuickLinkWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="quicklink-widget">
                <QuickLinks />
                {this.props.adder ? (<Adder />) : null}
                {this.props.editor.visibility ? (<Editor />) : null}
            </div>
        );
    }
}

const QuickLinkWidget = connect((state, props) => ({
    adder: state.quicklink.adder, editor: state.quicklink.editor
}))(_QuickLinkWidget);

export default QuickLinkWidget;
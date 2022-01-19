import React, { Component, createRef, useRef } from "react";
import { MoreHorizontal, Edit, Trash2, Plus } from "react-feather";
import { connect } from "react-redux";

import "./styles/quicklinks.scss";
import * as quicklinkActions from "../../redux/actions/quicklink";

class _QuickLinkItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: false
        };
        this.dropdownRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(event) {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({
                dropdown: false
            });
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside, true);
    }

    render() {
        return (
            <div className="quicklink-item-container">
                <div className="quicklink-item" onClick={() => window.location = this.props.url}>
                    <div className="img-container">
                        <img src={this.props.icon} alt={this.props.name} />
                    </div>
                    <div className="title-container">
                        <p>{this.props.name}</p>
                    </div>
                    <div className="menu-btn" onClick={(e) => { this.setState({ dropdown: true }); e.stopPropagation(); }}>
                        <MoreHorizontal />
                    </div>
                </div>
                {
                    this.state.dropdown ? (
                        <div className="dropdown-menu" ref={this.dropdownRef}>
                            <div className="dropdown-item" onClick={() => this.props.dispatch(quicklinkActions.toggleEditor({ visibility: true, uuid: this.props.uuid }))}>
                                <div className="icon-container">
                                    <Edit />
                                </div>
                                <div className="title-container">
                                    <p>Edit</p>
                                </div>
                            </div>
                            <div className="dropdown-item" onClick={() => this.props.dispatch(quicklinkActions.deleteLink(this.props.uuid))}>
                                <div className="icon-container">
                                    <Trash2 />
                                </div>
                                <div className="title-container">
                                    <p>Delete</p>
                                </div>
                            </div>
                        </div>) : null
                }
            </div>
        );
    }
}
const QuickLinkItem = connect((state, props) => ({}))(_QuickLinkItem);

class _AddLinkBtn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="add-link-btn" onClick={() => this.props.dispatch(quicklinkActions.toggleAdder(true))}>
                <div className="plus-container">
                    <Plus />
                </div>
            </div>
        );
    }
}
const AddLinkBtn = connect((state, props) => ({}))(_AddLinkBtn);

class _QuickLinks extends Component {
    constructor(props) {
        super(props);
    }

    renderItem = (item) => {
        return (
            <QuickLinkItem
                key={item.uuid}
                name={item.name}
                url={item.url}
                icon={item.icon}
                uuid={item.uuid}
            />
        );
    }

    render() {
        return (
            <div className="quicklinks-container">
                {this.props.quicklinks.map((item) => this.renderItem(item))}
                <AddLinkBtn />
            </div>
        );
    }
}

const QuickLinks = connect((state, props) => ({
    quicklinks: state.quicklink.quicklinks
}))(_QuickLinks);

export default QuickLinks;
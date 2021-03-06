import PropTypes from "prop-types";
import React from "react";

// Main Window.
let browser = null;
// child window
let popup = null;
// interval
let timer = null;

// This function checks whether the popup is still open or not
function watcher () {
    // if popup is null then let's clean the intervals.
    if (popup === null) {
        clearInterval(timer);
        timer = null;
    // if popup is not null and it is not closed, then let's set the focus on it... maybe...
    } else if (popup !== null && !popup.closed) {
        popup.focus();
    // if popup is closed, then let's clean errthing.
    } else if (popup !== null && popup.closed) {
        clearInterval(timer);
        browser.focus();
        // the onCloseEventHandler it notifies that the child has been closed.
        browser.onClose("child was closed");
        timer = null;
        popup = null;
    }
}

export class WindowOpener extends React.Component {
    constructor (props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);

        browser = window.self;
        browser.onSuccess = (resp, result) => {
            props.bridge(null, resp, result);
        }

        // each time we failed we will use the `onError`
        browser.onError = (error) => {
            props.bridge(error);
        }
        // Tells when a child window is open
        browser.onOpen = (message) => {
            props.bridge(null, message, null);
        }
        // Tells when a child window is close
        browser.onClose = (message) => {
            props.bridge(null, message, null);
        }
    }

    onClickHandler () {
        const { url, name, opts } = this.props;
        // if there is  already a child open, let's set focus on it
        if (popup && !popup.closed) {
            popup.focus();

            return ;
        }
        
        // we open a new window.
        popup = browser.open(url, name, opts);

        setTimeout(() => {
            // The opener object is created once and only if a window has a parent
            popup.opener.onOpen("child was opened");
        }, 0);

        if (timer === null) {
            // each two seconds we check if the popup still open or not
            timer = setInterval(watcher, 2000);
        }

        return;

    }

    render () {
        const { children } = this.props;
        return (
            <div onClick={this.onClickHandler}>
                {children}
            </div>
        );
    }
}

WindowOpener.propTypes = {
    url: PropTypes.string.isRequired,
    bridge: PropTypes.func.isRequired,
    name: PropTypes.string,
    opts: PropTypes.string,
    children: PropTypes.object
}
WindowOpener.defaultProps = {
    name: "TestUrKnowledge",
    opts: `dependent=${1}, alwaysOnTop=${1}, alwaysRaised=${1}, alwaysRaised=${1}, width=${1200}, height=${800}`
}
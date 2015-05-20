/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * @providesModule ReactCSSTransitionGroupChild
 */

"use strict";

var React = require("react");

var CSSCore = require("./CSSCore");
var ReactTransitionEvents = require("./ReactTransitionEvents");

var TICK = 17;

var ReactCSSTransitionGroupChild = React.createClass({
  transition(animationType, finishCallback) {
    var node = this.getDOMNode();
    var className = this.props.name + '-' + animationType;
    var activeClassName = className + '-active';

    if (this.endListener) {
      this.endListener();
    }

    this.endListener = (e) => {
      if (e && e.target !== node) {
        return;
      }

      CSSCore.removeClass(node, className);
      CSSCore.removeClass(node, activeClassName);

      ReactTransitionEvents.removeEndEventListener(node, this.endListener);
      this.endListener = null;

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    ReactTransitionEvents.addEndEventListener(node, this.endListener);

    CSSCore.addClass(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClass(activeClassName);
  },

  queueClass(className) {
    this.classNameQueue.push(className);

    if (!this.timeout) {
      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
    }
  },

  stop() {
    //console.log('force stop')
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.classNameQueue.length = 0;
      this.timeout = null;
    }
    if (this.endListener) {
      this.endListener();
    }
  },

  flushClassNameQueue() {
    if (this.isMounted()) {
      this.classNameQueue.forEach(
        CSSCore.addClass.bind(CSSCore, this.getDOMNode())
      );
    }
    this.classNameQueue.length = 0;
    this.timeout = null;
  },

  componentWillMount() {
    this.classNameQueue = [];
  },

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },

  componentWillEnter(done) {
    if (this.props.enter) {
      this.transition('enter', done);
    } else {
      done();
    }
  },

  componentWillLeave(done) {
    if (this.props.leave) {
      this.transition('leave', done);
    } else {
      done();
    }
  },

  render() {
    return this.props.children;
  }
});

module.exports = ReactCSSTransitionGroupChild;

/** @jsx React.DOM */

var React = require('react');
var ReactTransitionChildMapping = require('./ReactTransitionChildMapping');
var CSSTransitionGroupChild = require('./CSSTransitionGroupChild');

var CSSTransitionGroup = React.createClass({
  protoTypes: {
    component: React.PropTypes.any,
    transitionName: React.PropTypes.string.isRequired,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      component: 'span',
      transitionEnter: true,
      transitionLeave: true
    };
  },

  getInitialState: function () {
    var ret = [];
    React.Children.forEach(this.props.children, function (c) {
      ret.push(c);
    });
    return {
      children: ret
    };
  },

  componentWillMount: function () {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  },

  componentWillReceiveProps: function (nextProps) {
    var nextChildMapping = [];
    React.Children.forEach(nextProps.children, function (c) {
      nextChildMapping.push(c);
    });
    var prevChildMapping = this.state.children;
    var newChildren = ReactTransitionChildMapping.mergeChildMappings(
      prevChildMapping,
      nextChildMapping
    );
    this.setState({
      children: newChildren
    });

    var self = this;

    nextChildMapping.forEach(function (c) {
      var key = c.key;
      var hasPrev = prevChildMapping && ReactTransitionChildMapping.inChildren(prevChildMapping, c);
      if (!hasPrev && !self.currentlyTransitioningKeys[key]) {
        self.keysToEnter.push(key);
      }
    });

    prevChildMapping.forEach(function (c) {
      var key = c.key;
      var hasNext = nextChildMapping && ReactTransitionChildMapping.inChildren(nextChildMapping, c);
      if (!hasNext && !self.currentlyTransitioningKeys[key]) {
        self.keysToLeave.push(key);
      }
    });
  },

  performEnter: function (key) {
    this.currentlyTransitioningKeys[key] = true;
    var component = this.refs[key];
    if (component.componentWillEnter) {
      component.componentWillEnter(
        this._handleDoneEntering.bind(this, key)
      );
    } else {
      this._handleDoneEntering(key);
    }
  },

  _handleDoneEntering: function (key) {
    delete this.currentlyTransitioningKeys[key];

    var currentChildMapping = this.props.children;

    if (!currentChildMapping || !ReactTransitionChildMapping.inChildrenByKey(currentChildMapping, key)) {
      // This was removed before it had fully entered. Remove it.
      this.performLeave(key);
    }
  },

  performLeave: function (key) {
    this.currentlyTransitioningKeys[key] = true;

    var component = this.refs[key];
    if (component.componentWillLeave) {
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
    } else {
      // Note that this is somewhat dangerous b/c it calls setState()
      // again, effectively mutating the component before all the work
      // is done.
      this._handleDoneLeaving(key);
    }
  },

  _handleDoneLeaving: function (key) {
    delete this.currentlyTransitioningKeys[key];

    var currentChildMapping = this.props.children;

    if (currentChildMapping && ReactTransitionChildMapping.inChildrenByKey(currentChildMapping, key)) {
      // This entered again before it fully left. Add it again.
      this.performEnter(key);
    } else {
      var newChildren = [];
      this.state.children.map(function (c) {
        if (c.key === key) {
          return;
        }
        newChildren.push(c);
      });
      this.setState({children: newChildren});
    }
  },

  componentDidUpdate: function () {
    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(this.performEnter);
    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(this.performLeave);
  },

  render: function () {
    var props = this.props;
    var children = this.state.children.map(function (child) {
      return <CSSTransitionGroupChild
        key={child.key}
        ref={child.key}
        name={props.transitionName}
        enter={props.transitionEnter}
        leave={props.transitionLeave}>{child}</CSSTransitionGroupChild>;
    });
    var Component = this.props.component;
    return <Component {...this.props}>{children}</Component>;
  }
});
module.exports = CSSTransitionGroup;

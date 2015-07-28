webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var style = '.alert-outer{\
	position: fixed;\
	width:100%;\
	top: 50px;\
	z-index: 9999;\
	}\
	\
	.alert-outer .alert {\
	  background:yellow;\
	  width: 600px;\
	  padding:20px;\
	  margin-left:auto;\
	  margin-right:auto;\
	}\
	\
	.alert-outer p{\
	  padding: 15px;\
	}\
	\
	.alert-anim-enter {\
	  opacity: 0.01;\
	  transition: opacity 1s ease-in;\
	  -webkit-transition: opacity 1s ease-in;\
	}\
	\
	.alert-anim-enter.alert-anim-enter-active {\
	  opacity: 1;\
	}\
	\
	.alert-anim-leave {\
	  opacity: 1;\
	  transition: opacity 1s ease-in;\
	  -webkit-transition: opacity 1s ease-in;\
	}\
	\
	.alert-anim-leave.alert-anim-leave-active {\
	  opacity: 0.01;\
	}';
	
	var React = __webpack_require__(2);
	var CSSTransitionGroup = __webpack_require__(3);
	var seed = 0;
	
	var Alert = React.createClass({
	  displayName: 'Alert',
	
	  protoTypes: {
	    time: React.PropTypes.number,
	    type: React.PropTypes.number,
	    str: React.PropTypes.string,
	    onEnd: React.PropTypes.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onEnd: function onEnd() {},
	      time: 2000,
	      type: 'success'
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    var props = this.props;
	    setTimeout(function () {
	      props.onEnd();
	    }, props.time);
	  },
	
	  render: function render() {
	    var props = this.props;
	    return React.createElement(
	      'div',
	      { className: "alert alert-" + props.type },
	      props.str
	    );
	  }
	});
	
	var AlertGroup = React.createClass({
	  displayName: 'AlertGroup',
	
	  getInitialState: function getInitialState() {
	    return {
	      alerts: []
	    };
	  },
	  addAlert: function addAlert(a) {
	    this.setState({
	      alerts: this.state.alerts.concat(a)
	    });
	  },
	  onEnd: function onEnd(key) {
	    var alerts = this.state.alerts;
	    var ret = [];
	    var target;
	    alerts.forEach(function (a) {
	      if (a.key === key) {
	        target = a;
	      } else {
	        ret.push(a);
	      }
	    });
	    if (target) {
	      this.setState({
	        alerts: ret
	      }, function () {
	        if (target.callback) {
	          target.callback();
	        }
	      });
	    }
	  },
	  render: function render() {
	    var alerts = this.state.alerts;
	    var self = this;
	    var children = alerts.map(function (a) {
	      if (!a.key) {
	        seed++;
	        a.key = seed + '';
	      }
	      return React.createElement(Alert, _extends({}, a, { onEnd: self.onEnd.bind(self, a.key) }));
	    });
	    return React.createElement(
	      'div',
	      { className: "alert-outer" },
	      React.createElement(
	        CSSTransitionGroup,
	        { transitionName: "alert-anim" },
	        children
	      )
	    );
	  }
	});
	
	var alertGroup;
	
	function alert(str, time, type, callback) {
	  if (!alertGroup) {
	    var div = document.createElement('div');
	    document.body.appendChild(div);
	    alertGroup = React.render(React.createElement(AlertGroup, null), div);
	  }
	  alertGroup.addAlert({
	    str: str,
	    time: time,
	    type: type,
	    callback: callback
	  });
	}
	
	function onClick() {
	  for (var i = 0; i < 4; i++) {
	    (function (i) {
	      setTimeout(function () {
	        alert(i);
	      }, 1000 * i);
	    })(i);
	  }
	}
	
	React.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    'h1',
	    null,
	    'notification'
	  ),
	  React.createElement(
	    'style',
	    null,
	    style
	  ),
	  React.createElement(
	    'button',
	    { onClick: onClick },
	    'show notification'
	  )
	), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=alert.js.map
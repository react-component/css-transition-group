webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	
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
	
	/** @jsx React.DOM */
	var React = __webpack_require__(5);
	var CSSTransitionGroup = __webpack_require__(1);
	var seed = 0;
	
	var Alert = React.createClass({displayName: "Alert",
	  protoTypes: {
	    time: React.PropTypes.number,
	    type: React.PropTypes.number,
	    str: React.PropTypes.string,
	    onEnd: React.PropTypes.func
	  },
	
	  getDefaultProps: function () {
	    return {
	      onEnd: function () {
	      },
	      time: 2000,
	      type: 'success'
	    }
	  },
	
	  componentDidMount: function () {
	    var props = this.props;
	    setTimeout(function () {
	      props.onEnd();
	    }, props.time);
	  },
	
	  render: function () {
	    var props = this.props;
	    return React.createElement("div", {className: "alert alert-" + props.type}, props.str);
	  }
	});
	
	
	var AlertGroup = React.createClass({displayName: "AlertGroup",
	  getInitialState: function () {
	    return {
	      alerts: []
	    }
	  },
	  addAlert: function (a) {
	    this.setState({
	      alerts: this.state.alerts.concat(a)
	    });
	  },
	  onEnd: function (key) {
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
	      })
	    }
	  },
	  render: function () {
	    var alerts = this.state.alerts;
	    var self = this;
	    var children = alerts.map(function (a) {
	      if (!a.key) {
	        seed++;
	        a.key = seed + '';
	      }
	      return React.createElement(Alert, React.__spread({},  a, {onEnd: self.onEnd.bind(self, a.key)}))
	    });
	    return React.createElement("div", {className: "alert-outer"}, 
	      React.createElement(CSSTransitionGroup, {transitionName: "alert-anim"}, children)
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
	
	React.render(React.createElement("div", null, 
	    React.createElement("h1", null, "notification"), 
	    React.createElement("style", null, style), 
	    React.createElement("button", {onClick: onClick}, "show notification")
	  ),
	  document.getElementById('__react-content'));


/***/ }
]);
//# sourceMappingURL=alert.js.map
webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var style = '.example-enter {\
	opacity: 0.01;\
	transition: opacity 1s ease-in;\
	}\
	\
	.example-enter.example-enter-active {\
	  opacity: 1;\
	}\
	\
	.example-leave {\
	  opacity: 1;\
	  transition: opacity 1s ease-in;\
	}\
	\
	.example-leave.example-leave-active {\
	  opacity: 0.01;\
	}\
	\
	.item {\
	  width:100px;\
	  border:1px solid red;\
	  padding:10px;\
	  margin:10px;\
	}';
	
	var CSSTransitionGroup = __webpack_require__(1);
	var React = __webpack_require__(5);
	var assign = __webpack_require__(6);
	
	var Todo = React.createClass({displayName: "Todo",
	  getDefaultProps: function () {
	    return {
	      visible: true,
	      end: function () {
	      }
	    }
	  },
	  componentWillUnmount: function () {
	    console.log('componentWillUnmount');
	    console.log(this.props.children);
	    this.props.end();
	  },
	  render: function () {
	    var props = this.props;
	    return React.createElement("div", {onClick: this.props.onClick, 
	      style: {display: props.visible ? 'block' : 'none'}, 
	      className: "item"}, 
	      props.children
	    );
	  }
	});
	var TodoList = React.createClass({displayName: "TodoList",
	  getInitialState: function () {
	    return {
	      items: [
	        {content: 'hello', visible: true},
	        {content: 'world', visible: true},
	        {content: 'click', visible: true},
	        {content: 'me', visible: true}]
	    };
	  },
	  handleHide: function (i, item) {
	    var newItems = this.state.items.concat([]);
	    newItems[i] = assign({}, item, {
	      visible: false
	    });
	    this.setState({items: newItems});
	  },
	  render: function () {
	    var items = this.state.items.map(function (item, i) {
	      return (
	        React.createElement(Todo, {key: item.content, 
	          visible: item.visible, 
	          onClick: this.handleHide.bind(this, i, item)}, 
	          item.content
	        )
	      );
	    }.bind(this));
	    return (
	      React.createElement("div", null, 
	        React.createElement(CSSTransitionGroup, {
	          showProp: "visible", 
	          transitionName: "example"}, 
	          items
	        )
	      )
	    );
	  }
	});
	
	React.render(React.createElement("div", null, 
	  React.createElement("h1", null, "Hide Todo"), 
	  React.createElement("style", null, style), 
	  React.createElement(TodoList, null)
	), document.getElementById('__react-content'));


/***/ },
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));
	
			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}
	
		return to;
	};


/***/ }
]);
//# sourceMappingURL=hide-todo.js.map
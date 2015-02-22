webpackJsonp([1],[
/* 0 */
/*!******************!*\
  !*** multi todo ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./examples/todo.js */2);


/***/ },
/* 1 */,
/* 2 */
/*!**************************!*\
  !*** ./examples/todo.js ***!
  \**************************/
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
	
	var CSSTransitionGroup = __webpack_require__(/*! rc-css-transition-group */ 4);
	var React = __webpack_require__(/*! react */ 3);
	var Todo = React.createClass({displayName: "Todo",
	  getDefaultProps: function () {
	    return {
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
	    return React.createElement("div", {onClick: this.props.onClick, className: "item"}, 
	             props.children
	    );
	  }
	});
	var TodoList = React.createClass({displayName: "TodoList",
	  getInitialState: function () {
	    return {items: ['hello', 'world', 'click', 'me']};
	  },
	  handleAdd: function () {
	    var newItems =
	      this.state.items.concat([prompt('Enter some text')]);
	    this.setState({items: newItems});
	  },
	  handleRemove: function (i) {
	    var newItems = this.state.items;
	    newItems.splice(i, 1);
	    this.setState({items: newItems});
	  },
	  render: function () {
	    var items = this.state.items.map(function (item, i) {
	      return (
	        React.createElement(Todo, {key: item, onClick: this.handleRemove.bind(this, i)}, 
	          item
	        )
	      );
	    }.bind(this));
	    return (
	      React.createElement("div", null, 
	        React.createElement("button", {onClick: this.handleAdd}, "Add Item"), 
	        React.createElement(CSSTransitionGroup, {transitionName: "example"}, 
	          items
	        )
	      )
	    );
	  }
	});
	
	React.render(React.createElement("div", null, 
	  React.createElement("h1", null, "Todo"), 
	  React.createElement("style", null, style), 
	  React.createElement(TodoList, null)
	), document.getElementById('__react-content'));


/***/ }
]);
//# sourceMappingURL=todo.js.map
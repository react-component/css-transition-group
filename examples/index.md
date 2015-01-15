# rc-css-transition-group@1.x
---

````html
<style>
  .example-enter {
      opacity: 0.01;
      transition: opacity 1s ease-in;
  }

  .example-enter.example-enter-active {
      opacity: 1;
  }

  .example-leave {
      opacity: 1;
      transition: opacity 1s ease-in;
  }

  .example-leave.example-leave-active {
      opacity: 0.01;
  }

  .item {
    width:100px;
    border:1px solid red;
    padding:10px;
    margin:10px;
  }
</style>
<div id='react-content'>
</div>
````

````js
/** @jsx React.DOM */
var CSSTransitionGroup = require('../');
var React = require('react');
var Todo = React.createClass({
  getDefaultProps: function(){
    return {
      end: function(){
      }
    }
  },
  componentWillUnmount: function(){
    console.log('componentWillUnmount');
    console.log(this.props.children);
    this.props.end();
  },
  render: function(){
    var props = this.props;
    return <div onClick={this.props.onClick} className="item">
             {props.children}
           </div>;
  }
});
var TodoList = React.createClass({
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
        <Todo key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </Todo>
      );
    }.bind(this));
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <CSSTransitionGroup transitionName="example">
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
});

React.render(<TodoList />, document.getElementById('react-content'));

````
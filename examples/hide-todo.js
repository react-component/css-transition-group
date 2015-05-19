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

var CSSTransitionGroup = require('rc-css-transition-group');
var React = require('react');
var assign = require('object-assign');

var Todo = React.createClass({
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
    return <div onClick={this.props.onClick}
      style={{display: props.visible ? 'block' : 'none'}}
      className="item">
      {props.children}
    </div>;
  }
});
var TodoList = React.createClass({
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
    newItems.forEach((n, index)=> {
      newItems[index] = assign({}, n, {
        visible: true
      });
    });
    newItems[i] = assign({}, item, {
      visible: false
    });
    this.setState({items: newItems});
  },
  render: function () {
    var items = this.state.items.map(function (item, i) {
      return (
        <Todo key={item.content}
          visible={item.visible}
          onClick={this.handleHide.bind(this, i, item)}>
          {item.content}
        </Todo>
      );
    }.bind(this));
    return (
      <div>
        <CSSTransitionGroup
          showProp="visible"
          transitionName="example">
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
});

React.render(<div>
  <h1>Hide Todo</h1>
  <style>{style}</style>
  <TodoList />
</div>, document.getElementById('__react-content'));

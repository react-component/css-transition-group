# rc-css-transition-group@1.x
---

<link rel="stylesheet" href="https://a.alipayobjects.com/bootstrap/3.3.1/css/bootstrap.css">

## alert

````html
<style>
.alert-outer{
  position: fixed;
  width:100%;
  top: 50px;
  z-index: 9999;
}

.alert-outer .alert {
  width: 600px;
  margin-left:auto;
  margin-right:auto;
}

.alert-outer p{
  padding: 15px;
}

.alert-anim-enter {
  opacity: 0.01;
  transition: opacity 1s ease-in;
  -webkit-transition: opacity 1s ease-in;
}

.alert-anim-enter.alert-anim-enter-active {
  opacity: 1;
}

.alert-anim-leave {
  opacity: 1;
  transition: opacity 1s ease-in;
  -webkit-transition: opacity 1s ease-in;
}

.alert-anim-leave.alert-anim-leave-active {
  opacity: 0.01;
}
</style>
````

````js
/** @jsx React.DOM */
var React = require('react');
var CSSTransitionGroup = require('../');
var seed = 0;

var Alert = React.createClass({
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
    return <div className={"alert alert-" + props.type}>{props.str}</div>;
  }
});


var AlertGroup = React.createClass({
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
      return <Alert {...a} onEnd={self.onEnd.bind(self, a.key)}/>
    });
    return <div className="alert-outer">
      <CSSTransitionGroup transitionName="alert-anim">{children}</CSSTransitionGroup>
    </div>;
  }
});

var alertGroup;

function alert(str, time, type, callback) {
  if (!alertGroup) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    alertGroup = React.render(<AlertGroup/>, div);
  }
  alertGroup.addAlert({
    str: str,
    time: time,
    type: type,
    callback: callback
  });
}

for(var i=0;i<4;i++){
  (function(i){
    setTimeout(function(){
      alert(i);
    }, 1000*i);
  })(i);
}
````

## TodoList

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


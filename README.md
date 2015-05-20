# rc-css-transition-group
---

standalone and enhanced CSSTransitionGroup for React.addons.CSSTransitionGroup

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/css-transition-group)](https://saucelabs.com/u/css-transition-group)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/css-transition-group.svg)](https://saucelabs.com/u/css-transition-group)

[npm-image]: http://img.shields.io/npm/v/rc-css-transition-group.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-css-transition-group
[travis-image]: https://img.shields.io/travis/react-component/css-transition-group.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/css-transition-group
[coveralls-image]: https://img.shields.io/coveralls/react-component/css-transition-group.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/css-transition-group?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/css-transition-group.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/css-transition-group
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-css-transition-group.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-css-transition-group

## Screenshots

![](http://gtms02.alicdn.com/tps/i2/TB1l3yrHXXXXXXWXpXXM9PE9pXX-446-343.png)

## Feature

* support ie8,ie8+,chrome,firefox,safari

## install

[![rc-css-transition-group](https://nodei.co/npm/rc-css-transition-group.png)](https://npmjs.org/package/rc-css-transition-group)

## Usage

```js
var CSSTransitionGroup = require('rc-css-transition-group');
var React = require('react');
React.render(<CSSTransitionGroup><p>1</p><p>2</p></CSSTransitionGroup>, container);
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>component</td>
          <td>React.Element/String</td>
          <td>'span'</td>
          <td>wrap dom node or component for children</td>
        </tr>
        <tr>
          <td><span style="color:red;">showProp</span></td>
          <td>String</td>
          <td></td>
          <td>using prop for show and hide. [demo](http://react-component.github.io/css-transition-group/build/examples/hide-todo.html) </td>
        </tr>
        <tr>
          <td><span style="color:red;">exclusive</span></td>
          <td>Boolean</td>
          <td></td>
          <td>whether allow only one set of animations(enter and leave) at the same time. </td>
        </tr>
        <tr>
          <td>transitionName</td>
          <td>String</td>
          <td></td>
          <td>transitionName, need to specify corresponding css</td>
        </tr>
        <tr>
          <td>transitionEnter</td>
          <td>Boolean</td>
          <td>true</td>
          <td>whether support transition enter anim</td>
        </tr>
       <tr>
         <td>transitionLeave</td>
         <td>Boolean</td>
         <td>true</td>
         <td>whether support transition leave anim</td>
       </tr>
    </tbody>
</table>

http://facebook.github.io/react/docs/animation.html

## Development

```
npm install
npm start
```

## Example

http://localhost:8010/examples/index.md

online example: http://react-component.github.io/css-transition-group/build/examples/

## Test Case

http://localhost:8010/tests/runner.html?coverage

## Coverage

http://localhost:8010/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8010/tests/runner.html?coverage

## License

rc-css-transition-group is released under the MIT license.

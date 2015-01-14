var React = require('react');

function inChildren(children, child) {
  var found = 0;
  children.forEach(function (c) {
    if (found) {
      return;
    }
    found = c.key === child.key;
  });
  return found;
}

module.exports = {
  inChildren: inChildren,

  inChildrenByKey: function (children, key) {
    var found = 0;
    children.forEach(function (c) {
      if (found) {
        return;
      }
      found = c.key === key;
    });
    return found;
  },

  mergeChildMappings: function (prev, next) {
    var ret = [];

    // For each key of `next`, the list of keys to insert before that key in
    // the combined list
    var nextChildrenPending = {};
    var pendingChildren = [];
    prev.forEach(function (c) {
      if (inChildren(next, c)) {
        if (pendingChildren.length) {
          nextChildrenPending[c.key] = pendingChildren;
          pendingChildren = [];
        }
      } else {
        pendingChildren.push(c);
      }
    });

    next.forEach(function (c) {
      if (nextChildrenPending.hasOwnProperty(c.key)) {
        ret = ret.concat(nextChildrenPending[c.key]);
      }
      ret.push(c);
    });

    ret = ret.concat(pendingChildren);

    return ret;
  }
};

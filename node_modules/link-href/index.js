'use strict';

var dom5 = require('dom5');
var pred = dom5.predicates;

function getHref(link) {
  var href = null;

  if (link.attrs) {
    link.attrs.forEach(function(attr) {
      if (attr.name === 'href') {
        href = attr;
      }
    });
  }

  return href;
}

function linkHref(html, evaluate) {
  var doc = dom5.parse(html);
  var res = {
    html: html,
    links: []
  };

  res.links = dom5.queryAll(doc, pred.hasTagName('link'));


  if (res.links) {
    res.links.forEach(function (link) {
      var attr = getHref(link);

      if (attr && evaluate) {
        var href = evaluate(attr.value, attr);

        if (attr.value !== href) {
          attr.value = href;
        }
      }
    });

    res.html = dom5.serialize(doc);
  }

  return res;
}

module.exports = linkHref;

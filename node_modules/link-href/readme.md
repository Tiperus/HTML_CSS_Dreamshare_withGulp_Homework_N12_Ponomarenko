# link-href [![Build Status](https://travis-ci.org/ragingwind/link-href.svg?branch=master)](https://travis-ci.org/ragingwind/link-href)

> Change a link href in html to where you want


## Install

```
$ npm install --save link-href
```


## Usage

```js
var linkHref = require('link-href');
var tack = linkHref(html, function(href, attr) {
  // return updated url value if you want to change the href
  return href + '/changeurl';
});

console.log(tack.html, tack.link);
```

## API

### linkHref(html, evaluate)

#### html

HTML string that includes link with google font href

#### evaluate

To evaluate a link which could be updated or not

## Return

Return updated html with link information

```
{
  html: String
  link: []
}
```

## License

MIT © [Jimmy Moon](http://ragingwind.me)

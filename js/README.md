# Encoji JS

A quick and dirty node module to encode and decode encoji data

## Install

`npm install --save encoji`

## Usage

```javascript
var encoji = require('encoji')

encoji.encode("Hello, world!")
=> '😜😅😎🙈😹😅🐞🙈😇😆🐶🐒😻🐮🐧🐨😇😙🐳🐳'

encoji.decode("😜😅😎🙈😹😅🐞🙈😇😆🐶🐒😻🐮🐧🐨😇😙🐳🐳")
=> 'Hello, world!'
```

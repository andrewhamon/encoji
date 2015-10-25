# Encoji

Encode your data as Emojis!

## Install

`go get github.com/andrewhamon/encoji`

## Usage

Encodes standard in by default

```
echo "Hello, world!" | encoji
😜😅😎🙈😹😅🐞🙈😇😆🐶🐒😻🐮🐧🐨😇😙🐽🐳
```

Decode standard in using `-d`
```
echo '😜😅😎🙈😹😅🐞🙈😇😆🐶🐒😻🐮🐧🐨😇😙🐽🐳 ' | encoji -d
Hello, world!
```

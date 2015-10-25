# Encoji

Encode data as emojis!

## Install

`go get github.com/andrewhamon/encoji`

## Usage

Encode stdin:

```
echo 'Hello, world!' | encoji
😜😅😎🙈😹😅🐞🙈😇😆🐶🐒😻🐮🐧🐨😇😙🐽🐳
```

Decode stdin using `-d` flag:
```
echo '😜😅😎🙈😹😅🐞🙈😇😆🐶🐒😻🐮🐧🐨😇😙🐽🐳 ' | encoji -d
Hello, world!
```

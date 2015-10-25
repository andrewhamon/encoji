package main

import (
	"bytes"
	"encoding/base64"
	"flag"
	"io/ioutil"
	"os"
)

func makeEncoding(decode bool) (encoding map[rune]rune) {
	base64Runes := bytes.Runes([]byte("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="))
	encojiRunes := bytes.Runes([]byte("😀😬😁😂😃😄😅😆😇😉😊😋😌😍😘😗😙😚😜😝😛😎😏💩👻😺😸😹😻🐶🐱🐭🐹🐰🐻🐼🐨🐯🐮🐷🐽🐸🐙🐵🙈🙉🙊🐒🐔🐧🐦🐤🐣🐥🐺🐗🐴🐝🐛🐌🐞🐜🐘🐬🐳"))

	if len(base64Runes) != len(encojiRunes) {
		panic("Charsets must be of same length")
	}

	encoding = make(map[rune]rune)

	var from, to []rune

	if decode {
		from = encojiRunes
		to = base64Runes
	} else {
		from = base64Runes
		to = encojiRunes
	}

	for i := 0; i < len(from); i++ {
		encoding[from[i]] = to[i]
	}
	return encoding
}

func makeMapper(encoding map[rune]rune) func(rune) rune {
	return func(in rune) rune {
		if out, ok := encoding[in]; ok {
			return out
		} else {
			return rune(-1)
		}
	}
}

func encode(in []byte) (out []byte) {
	intermediate := make([]byte, base64.StdEncoding.EncodedLen(len(in)))
	base64.StdEncoding.Encode(intermediate, in)
	return bytes.Map(makeMapper(makeEncoding(false)), intermediate)
}

func decode(in []byte) (out []byte) {
	intermediate := bytes.Map(makeMapper(makeEncoding(true)), in)
	out = make([]byte, base64.StdEncoding.DecodedLen(len(intermediate)))
	base64.StdEncoding.Decode(out, intermediate)
	return out
}

func main() {
	decodeFlag := flag.Bool("d", false, "Decode encoji data (default is to encode)")
	flag.Parse()

	raw, err := ioutil.ReadAll(os.Stdin)
	if err != nil {
		panic("Could not read from stdin\n")
	}

	if *decodeFlag {
		os.Stdout.Write(decode(raw))
	} else {
		os.Stdout.Write(encode(raw))
	}
}

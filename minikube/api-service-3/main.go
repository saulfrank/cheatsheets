package main

// the alias is p
import p "fmt"
import t "time"

func main() {
// reference alias p instead
p.Println("Hello World")
p.Println(t.Now())
}

// multi line comments: /* */
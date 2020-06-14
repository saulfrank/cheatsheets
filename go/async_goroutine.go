package main

import (
"fmt"
"net/http"
"time"
)

func checkUrl(url string){
    _,err:=http.Get(url)
    if err != nil{
        fmt.Println(url, " is down!")
        return
    }
    fmt.Println(url, " is up :)")
}

func main(){

// slice of urls
urls:=[]string{
    "https://www.easyjet.com/",
    "https://www.skyscanner.de/",
    "https://wizzair.com/",
}

for k, url := range urls {
    fmt.Println("key: ",k," - ",url)
    go checkUrl(url)
}
time.Sleep(5 * time.Second)

}
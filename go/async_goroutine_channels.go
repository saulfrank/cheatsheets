package main

import (
"fmt"
"net/http"
)

type urlStatus struct{
url string
status bool
}

func checkUrl(url string, c chan urlStatus) {
    _,err := http.Get(url)

    if err != nil {
        c <- urlStatus{url, false}
    }else{
    c <- urlStatus{url, true}
    }

}

func main(){

// slice of urls
urls:=[]string{
    "https://www.easyjet.com/",
    "https://www.skyscanner.de/",
    "https://wizzair.com/",
}

c:=make(chan urlStatus)

for k, url := range urls {
    fmt.Println("key: ",k," - ",url)

    go checkUrl(url, c)
}

// get the results back
result :=make([]urlStatus, len(urls))

for i, _ :=range result {
    result[i] = <-c
    if result[i].status {
    fmt.Println(result[i].url, " is up :)")
    }else{
    fmt.Println(result[i].url, " is down!")
    }

}

}
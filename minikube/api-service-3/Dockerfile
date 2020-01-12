FROM golang:1.13.6-buster
RUN go get -u github.com/gin-gonic/gin
COPY bon.go .
RUN go build -o bongo .
EXPOSE 8001
CMD ["./bongo"]
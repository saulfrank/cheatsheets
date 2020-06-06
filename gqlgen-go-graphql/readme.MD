### Get started
```shell script
mkdir gqlgen-todos
cd gqlgen-todos
go mod init github.com/[username]/gqlgen-todos
go get github.com/99designs/gqlgen

go run github.com/99designs/gqlgen init

# make updates
go run github.com/99designs/gqlgen generate
```

* schema.graphqls -> model.models_gen.go
* in schema.resolvers.go: 
```shell script
hello := &model.Hello{Message: "hello"}
```

schema.graphqls
```shell script
type Hello {
 message: String!
}
```
The message: String! is first letter capital because when generated into 
models_gen.go, this becomes:
```shell script
type Hello struct {
	Message string `json:"message"`
}
```


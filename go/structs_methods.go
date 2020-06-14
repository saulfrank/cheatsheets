package main


import (
	"fmt"
	"encoding/json"
)

type Config struct {
	Database Database
}

type Database struct {
	User     string
	Password string
	Database string
	Host  string
	Port  uint
	ENV string
}

// method can be a pointer or value
// receiver
func (r *Database) output_func() Config {
    result := Config{
        		Database {
        		User: r.User,
        		Password: r.Password,
            	}}
      return result
}

func main(){

input := Database {
    		User: "user",
    		Password: "pwd",
    		Database: "db_staging",
    		Host: "xyz.com",
    		}

    c, _ := json.Marshal(input.output_func().Database)
	b, err := json.Marshal(input.output_func())
	if err !=nil{ fmt.Println(err) }
	fmt.Println(string(b))
	fmt.Println(string(c))
}
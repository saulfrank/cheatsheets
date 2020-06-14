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

func GetConfig() Config {
// 	db_config := Database {}
// 	db_config.ENV = "staging"
// 	db_config.Host = "xyz.com"
// 	db_config.Database = "db_staging"
// 	db_config.User = "user"
// 	db_config.Password = "pwd"
// 	db_config.Port = 5432
// 	config := Config{db_config}

	//another way but needs to be in order
    	result := Config{
    		Database {
    		User: "user",
    		Password: "pwd",
    		Database: "db_staging",
    		Host: "xyz.com"},
        	}

	return result
}

func main(){
    c, _ := json.Marshal(GetConfig().Database)
	b, err := json.Marshal(GetConfig())
	if err !=nil{ fmt.Println(err) }
	fmt.Println(string(b))
	fmt.Println(string(c))
}
### Docker login

```shell script
#Gitlab login
docker login registry.example.com -u <username> -p <token>
docker tag xxx docker push registry.example.com/group/project/image
docker push registry.example.com/group/project/image
```
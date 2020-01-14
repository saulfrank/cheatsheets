# Build and deploy
```shell script
eval $(minikube docker-env)
docker build -t saul/redis .
```

NB troubleshooting networking and labels:<br/>
```shell script
kubectl get ep redis-service 
#does a network endpoint attached? if no - then likely label is wrong
kubectl get pod --show-labels=true
```

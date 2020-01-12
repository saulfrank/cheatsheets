# Kubernetes notes

Delete all pods in namespace
```shell script
kubectl delete --all pods --namespace=default
kubectl delete deployment.apps/hello-deployment --namespace=default
```

```shell script
#Local minikube
minikube start
minikube addons list
minikube addons enable ingress
minikube addons enable heapster
minikube addons enable metrics-server
minikube dashboard

#get service url
minikube service hello-service --url

# setup local environment
# get ip and and map hello.info to ip in /etc/hosts
minikube ip
sudo nano /etc/hosts
#use .localhost to avoid Chrome searching in Google
# do not use .localhost it is blocked by chrome. Use .local and put http:// in url
<ip> hello.localhost

```

# logging
```shell script
kubectl logs -l app=hello

# use stern to tail multiple logs
brew install stern
stern -n default hello -t --since 10m
stern -n default hello -t
```

# build and run docker image
```shell script
eval $(minikube docker-env)
docker build -t saul/express-example .
docker run -d -p 3000:3000 --rm --name=express-example saul/express-example
docker run -p 3000:3000 --rm --name=express-example saul/express-example
docker logs express-example --follow

// show running and stopped containers
docker ps -a
```

# kubernetes
```shell script
//set to kubernetes docker registry - per terminal
eval $(minikube docker-env)
//unset away from kubernetes docker registry
eval $(minikube docker-env -u)
```
1. Set the environment variables with eval $(minikube docker-env)
2. Build the image with the Docker daemon of Minikube (eg docker build -t my-image .)
3. Set the image in the pod spec like the build tag (eg my-image)
4. Set the imagePullPolicy to Never, otherwise Kubernetes will try to download the image.
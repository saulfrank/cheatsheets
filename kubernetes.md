# Kubernetes notes

Delete all pods in namespace
```shell script
kubectl delete --all pods --namespace=default
kubectl delete deployment.apps/hello-deployment --namespace=default
```

```shell script
# show client and server version
kubectl version
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
# do not use .localhost or.local it is blocked by chrome. Use .internal and put http:// in url
<ip> hello.internal

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

# After changing a secret or configmap, you can roll out a restart
```shell script
# one deployment
kubectl rollout restart deployment/nginx

# all deployments
kubectl rollout restart deployments

```

# Troubleshooting K8
```shell script
kubectl config view
sudo kubectl cluster-info
```

#### How networking out works
* https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
* ClusterIP = internal ip address
* Nodeport = mapped external port
* externalname = CNAME mapping requires CoreDNS
* Loadbalancer = Cloud provider external load balancer

# test the node app
```shell script
npm install -g nodemon
nodemon server.js
```

# build docker image, deploy to kubernetes
```shell script

kubectl delete deployment.apps/api-service-1-deployment --namespace=default

eval $(minikube docker-env)
docker build -t saul/api-service-1 .
#test docker image
docker run -p 3000:3000 --rm --name=api-service-1 saul/api-service-1
docker stop <container ID>
kubectl apply -f kube/deployment.yaml
# test url on nodeport
minikube service api-service-2-service --url
# add on url 
<url>/randomadd
```
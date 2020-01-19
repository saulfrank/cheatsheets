#!/bin/sh
#chmod +x <this file>
# Brings up all the services for minikube

#--- edit /etc/hosts
#minikube ip
#sudo nano /etc/hosts
#use .localhost to avoid Chrome searching in Google
# do not use .localhost or .local (slow on mac) it is blocked by chrome. Use .internal and put http:// in url
#<ip> hello.internal

#--- load postgresql data when first loaded

#--- Global configuration
kubectl apply -f a_globalconfig/global-dev.yaml

# --- REDIS
eval $(minikube docker-env)
#-- not needed in deployment yaml: docker build -t saul/redis redis/.
kubectl apply -f redis/redis-pod.yaml

#---- Postgres
docker build -t saul/postgresql postgresql/.
kubectl apply -f postgresql/storage.yaml
kubectl apply -f postgresql/secret.yaml
kubectl apply -f postgresql/deployment.yaml

#---- GO micro-service
docker build -t saul/api-service-3 api-service-3/.
kubectl apply -f api-service-3/kube/deployment.yaml

#---- Python micro-service
docker build -t saul/api-service-2 api-service-2/.
kubectl apply -f api-service-2/kube/deployment.yaml

#---- Express micro-service
docker build -t saul/api-service-1 api-service-1/.
kubectl apply -f api-service-1/kube/deployment.yaml
kubectl apply -f api-service-1/kube/service.yaml
kubectl apply -f api-service-1/kube/ingress.yaml

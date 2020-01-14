#!/bin/sh

POD1=$(kubectl get pod -l app=api-service-1 -o jsonpath="{.items[0].metadata.name}")
echo '🛳 Ship to development server - '$POD1
kubectl cp server.js $POD1:/
kubectl exec $POD1 -- sh -c "pm2 reload all"

echo '👷‍♀️ Docker build...'
#eval $(minikube docker-env)
#docker build -t saul/api-service-1 .


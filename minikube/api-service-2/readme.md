### create a virtual environment
```bash
python3 -m venv ./venv
source venv/bin/activate
```

## run uvicorn
```
uvicorn main:app --reload --log-level critical --workers 6

```

# build docker image, deploy to kubernetes
```shell script

kubectl delete deployment.apps/api-service-2-deployment --namespace=default

eval $(minikube docker-env)
docker build -t saul/api-service-2 .
#test docker image
docker run -p 8080:8080 --rm --name=api-service-2 saul/api-service-2
docker stop <container ID>
kubectl apply -f kube/deployment.yaml
# test url on nodeport
minikube service api-service-2-service --url
# add on url 
<url>/randomadd
```

#logging 
```
stern -n default api-service-2 -t
```
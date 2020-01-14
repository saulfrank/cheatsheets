# Deploy postgresql

```shell script
kubectl apply -f storage.yaml
kubectl apply -f secret.yaml

#build docker image and deploy to registry
eval $(minikube docker-env)
docker build -t saul/postgresql .

kubectl apply -f deployment.yaml

#TODO: load data automatically or perform migrations when postgresql is ready. Readiness and liveness testing?
#TODO: service dependencies: https://www.alibabacloud.com/blog/kubernetes-demystified-solving-service-dependencies_594110
#on firts load login into pod and load data
POD=$(kubectl get pod -l app=postgresql -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $POD -- /bin/bash
psql -f "pagila-schema.sql" -d postgres --user=test_user
psql -f "pagila-data.sql" -d test_db --user=test_user
```

#Update pg_hba.conf
```shell script
vi  /var/lib/postgresql/data/pg_hba.conf
#add:
host    all     all     0.0.0.0/0   
#ESC and :x to save and exit

psql --user=test_user -d postgres
SELECT pg_reload_conf();
```

# Create secrets
```shell script
#From file:
kubectl create secret generic db-user-pass --from-file=./username.txt --from-file=./password.txt

#base64 contentsfor Opaque
echo -n 'Hello123^' | base64
```

#MAC setup
```shell script
psql -c "CREATE USER test_user SUPERUSER;" -d postgres
psql -f "pagila-schema.sql" -d postgres --user=test_user
psql -f "pagila-data.sql" -d test_db --user=test_user
```

#Logging and port forwarding
```shell script
stern -n default postgresql-service -t
kubectl port-forward service/postgresql 5400:5432 -n default

POD=$(kubectl get pod -l app=postgresql -o jsonpath="{.items[0].metadata.name}")
 kubectl exec -it $POD -- /bin/bash
```


# Testing cockroach db
UI admin local:  http://localhost:26256

```shell script
# install
brew install cockroachdb/tap/cockroach
Connect insecure using root, no password and import test database:
cockroach workload init movr 'postgresql://root@localhost:26257?sslmode=disable'

```
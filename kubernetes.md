# Kubernetes notes

Delete all pods in namespace
```shell script
kubectl delete --all pods --namespace=default
kubectl delete deployment.apps/hello-deployment --namespace=default
```

Create an nginx deployment from image
```shell script
kubectl create deployment nginx --image=nginx
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
* Good article: https://www.ovh.com/blog/getting-external-traffic-into-kubernetes-clusterip-nodeport-loadbalancer-and-ingress/
* ClusterIP = internal ip address
* Nodeport = mapped external port
* externalname = CNAME mapping requires CoreDNS
* Loadbalancer = Cloud provider external load balancer
* Use Expose: 
    * kubectl expose deployment hello-world --type=LoadBalancer --name=my-service
    
    
### Get tokens for dashboards
```shell script
# Kubeapps: https://github.com/kubeapps/kubeapps/blob/master/docs/user/getting-started.md
kubectl create serviceaccount kubeapps-operator
kubectl create clusterrolebinding kubeapps-operator --clusterrole=cluster-admin --serviceaccount=default:kubeapps-operator

Connect to dashboard and get token for K3S
https://rancher.com/docs/k3s/latest/en/installation/kube-dashboard/
```

### Get Kubectl to run locally from remote cluster
```shell script
#On the server move to readable directory - scp cant use sudo
sudo cp /etc/rancher/k3s/k3s.yaml ~ 
sudo chown ubuntu:ubuntu ~/k3s.yaml
scp -r ubuntu@<ip>:~/k3s.yaml .
# Change ip address to ip address of node
# move or copy file to kube config location locally
cp k3s.yaml ~/.kube/config

```

### Create a secret
https://longhorn.io/docs/0.8.0/users-guide/backup-and-restore/backupstores-and-backuptargets/
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: aws-secret
  namespace: longhorn-system
type: Opaque
stringData:
  AWS_ACCESS_KEY_ID: 'xxx'
  AWS_SECRET_ACCESS_KEY: 'yyy'
```

### Working with helm charts
```shell script
# list all released helm charts
sudo helm ls --all-namespaces --all --kubeconfig /etc/rancher/k3s/k3s.yaml
sudo helm install harbor --namespace harbor-system harbor/harbor
sudo helm uninstall harbor --namespace harbor-system
kubectl delete namespace harbor-system
```

### Provisioning storage
* https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
* https://github.com/rancher/k3s/issues/1037


### Exec into pod
```shell script
kubectl exec -it shell-demo -- /bin/bash
```

### Pulling private registry with K3S
https://github.com/containerd/containerd/issues/3291
```shell script

#after docker login 
cat ~/.docker/config.json
kubectl create secret generic regcred \
    --from-file=.dockerconfigjson="/Users/xxx/.docker/config.json" \
    --type=kubernetes.io/dockerconfigjson
# create credentials for docker to connect:
kubectl create secret docker-registry regcred --docker-server=https://docker.pkg.github.com --docker-username=<user | org> --docker-password=xxx --docker-email=<email>
```

## MicroK8s
### Enabling public ip to K8S API in MicroK8s
```shell script
# add dns and ip address - on save it automatically reissues certs, no need to restart cluster
sudo nano /var/snap/microk8s/current/certs/csr.conf.template

# those IP and DNS needed for ingress too
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --type=ClusterIP --name=nginx --port=80 --external-ip=xxx
curl http://xxx:80

# Enable nginx ingress controller & point domain to instance
sudo microk8s enable ingress dns
curl http://xyz.com/healthz
```

### Common commands
````shell script
# list of enabled services
sudo microk8s status
token=$(microk8s kubectl -n kube-system get secret | grep default-token | cut -d " " -f1)
microk8s kubectl -n kube-system describe secret $token
````

### Get pod by labe'
```shell script
kubectl get pods --selector=app=cassandra -o jsonpath='{.items[*].metadata.labels.version}'
kubectl exec -it shell-demo -- /bin/bash
```

### set current context
```shell script
# set the current context
kubectl config use-context staging
```


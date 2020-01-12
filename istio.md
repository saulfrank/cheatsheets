# Isitio notes

Learning Bookinfo example: https://istio.io/docs/examples/bookinfo/


Check if pod has isitio injection in the namespace
```shell script
kubectl get namespace -L istio-injection
```

Ename isitio injection for namespace
```shell script
kubectl label namespace default istio-injection=enabled
```
# Google Cloud SDK

Get a list of components to install
```shell script
gcloud components list
gcloud components install <id>
```

Init Google Cloud
```shell script
gcloud init
gcloud components update

# login
gcloud auth login

# set a new project
gcloud config set project YOUR_PROJECT_ID

# for Kubernetes (kubectl to access)
gcloud auth application-default login
```

Google endpoints
```shell script
# test to see if yaml end point is valid
gcloud endpoints services deploy "Google Cloud"/endpoints/openapi.yaml --validate-only

# deploy openapi
gcloud endpoints services deploy "Google Cloud"/endpoints/openapi.yaml
```
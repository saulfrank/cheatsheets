### Configure docker to use Github Packages & Actions

* https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-docker-for-use-with-github-packages
* Flow: Push to github branch -> github action: build -> github tests -> publish to registry for use

#### Steps
1. Get Github token
2. Login into Docker:
```shell script
cat ~/TOKEN.txt | docker login docker.pkg.github.com -u USERNAME --password-stdin
```
3. Build the docker image
```shell script

```
4. Tag the docker image where OWNER = organisation name
```shell script
docker tag IMAGE_ID docker.pkg.github.com/OWNER/REPOSITORY/IMAGE_NAME:VERSION
```
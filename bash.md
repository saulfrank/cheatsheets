# make sh file executable
```shell script
chmod 755 YourScriptName.sh
```

#### Check disk space on EC2
```shell script
sudo du -sh /*
```

#### MAC environment variables
```shell script
# get all your environment variables
printenv

# set a temp environment variable
export x="hello"
echo $x

# set a permanent environment variable (only mac using bash). 
nano ./bash_profile
source ~/.bash_profile # or retart terminal

# set a permanent environment variable using zsh
echo 'export ENV_VAR=12345' >> ~/.zshenv
source ~/.zshenv # or restart terminal

# for linux use 
nano .bashrc

```
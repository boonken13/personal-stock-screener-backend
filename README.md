# Personal stock screener back end Dockerized

1. Clone this repo
2. run `npm install`
3. Make sure you have docker installed and running on your computer
4. Run `docker-compose up` ( you may have to run `docker-compose up --build` for the first setup phase)
5. You will also need to update Line 22 in server.js to your client app port (i.e. 3001)


To access backend's bash:
Run `docker-compose exec *** bash`

To access redis:
Run `docker-compose exec redis redis-cli`



aws cloudformation create-stack --stack-name docker-compose-code-pipeline --template-body file://operations/code-pipeline-cloudformation.yaml --capabilities CAPABILITY_NAMED_IAM --enable-termination-protection --region ap-southeast-1 --parameters ParameterKey=DockerPullSecretsManagerArn,ParameterValue=%DOCKER_PULL_SECRETS_MANAGER% ParameterKey=GitHubOwner,ParameterValue='boonken13'

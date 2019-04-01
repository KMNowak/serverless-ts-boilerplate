# serverless-ts-boilerplate
## Boilerplate for multi microservices API written in Typescript with use of AWS Lambda
[![Serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)


Repo to help you create quick deployed, nicely typed microservice.
# Before we start

Due to serverless nature of repo there are some custom names used:
- **handler**: main logic of lambda, executed on API call
- **operations**: in standard model they would be called service. Business logic for separated context. **Handler** uses some **operations** methods to return result 
- **service**: separated part of the API concerning operations on particular context (user, posts etc.) with use of **operations**. In final result our api looks this way: `www.domain.com/{service}/{uri}` e.g  `GET` on www.mydomain.com/user/post 

# Prerequisites:
- `aws cli`
- `serverless cli`
- `node 8.10 or higher`

# Description:
Below boilerplate allow you to deploy `serverless`, multi-microservices REST API written in `TypeScript` and using `knex` with `RDBMS` (`Aurora MySQL 5.6` by default, but can be changed to your needs). Each lambda can be placed on layers (e.g. with `node_modules` so it is deployed only on layer deploy). `joi` validation and `middy` middleware included.

`AWS` resources used:

- `CloudFormation` - creates stack by `serverless`

- `Lambda` - executes code of handler

- `APIGateway` - Manages API of each service (one API per service (look at **Before we start** section above))

- `RDS` - stores data, can be queried by `knex`

- `Route53` - routes to our API from main domain

- `CloudWatch` - lambda logs, useful for debugging, set up underneath, no configuration needed


There are also some plugins included:
- `serverless-webpack` - compiling typescript and packing service
- `serverless-offline` - testing offline
- `serverless-pseudo-parameters` - allow to get values like `AWS:AccountId`
- `serverless-domain-manager` - sets up custom domain and routes form it to our services lambdas 
- `serverless-plugin-warmup` - keeping lambdas warm preventing cold (long) starts

# Setting up:
There are few steps, which must be taken before we can deploy
1) **Credentials:** if you did not before set your `aws configuration` credentials. They will let us deploy to `AWS`.
2) **Environment variables:** create folder `src/.envs` and `[dev/prod].yml` in it. It should include values specified below in section **Env vabriables**
3) **Modules:** `npm i` in project root. Installed `node_modules` should be copied to each service (e.g. `service/user/`). It is necessary because each service is webpacked locally.
4) **Setting up project:** go to `src/services/serverlessCommon` and set up all files to your needs (authorizer, domain, certificates etc.).
5) **Layer:** Create layer by running `npm run layer-create:[dev/prod]`. It will go to `src/layers/layer_node-[dev/prod]` and create layer, with all production modules required by lambdas.
6) **Layer deploy:** change `src/layers/layer_node[dev/prod]` to your needs, `cd` to it and run `sls deploy --stage YOUR_STAGE`. It is important to remember the version number of created layer. It will be used in setting up `serverless.yml` of services.
7) **Service local tests:** create your service functions. Change service `serverless.yml` to your needs (write `layerVersion` from layer deploy). `cd` to your service and run `sls offline --stage [dev/prod] to test your functions`
8) **Service deploy:** When you want to deploy your service online simply run `sls deploy --stage [dev/prod]`. It will create domain, uri, all stack and make your API callable

## Env variables
`src/.envs/.env.[dev/prod].yml` file MUST include

```yml
MY_SQL_HOST: [value]
MY_SQL_USER: [value]
MY_SQL_PASSWORD: [value]
MY_SQL_DATABASE: [value]
MY_SQL_VERSION: [value]

NODE_PATH: "./:/opt/node_modules" # new path to layered node_modules
STAGE: ${self:provider.stage}

COGNITO_USER_POOL_ID: [value]
COGNITO_CLIENT_APP_ID: [value]
```

## layer `serverless.yml` basic shape

```yml
service:
  name: ${self:custom.service.mainName}-layers

provider:
  name: aws
  runtime: nodejs8.10
  stage: dev #choose stage to deploy
  tags:
    environment: ${self:provider.stage}
    project: ${self:service.name}

custom:
  service:
    mainName: serverless-ts-boilerplate

layers:
  layerNode:
    name: ${self:service.name}-${self:provider.stage}
    path: layer_node-${self:provider.stage} #remember to copy node_modules to specified layer directory
    description: All required by ${self:provider.stage} project node modules
    compatibleRuntimes:
      - nodejs8.10
```

## `service serverless.yml` basic shape

```yml
service:
  name: ${self:custom.service.mainName}-${self:custom.service.subService}

plugins:
  - serverless-webpack
  - serverless-offline
  - serverless-pseudo-parameters
  - serverless-domain-manager
  - serverless-plugin-warmup

provider:
  name: aws
  region: YOUR_REGION
  runtime: nodejs8.10
  stage: ${opt:stage} #choose in cli: serverless --stage {dev/prod} to deploy
  role: arn:aws:iam::#{AWS::AccountId}:role/lambda-basic-execution # previous hash is not comment due to usage of serverless-pseudo-parameters
  memorySize: 256
  timeout: 10
  environment: ${self:custom.environment}
  tags:
    project: ${self:custom.service.mainName}

custom:
  service:
    mainName: serverless-ts-boilerplate
    subService: sample #choose name of the service, it will be path to rest of endpoints e.g myApi.com/sample/{myEndpointUri}
  webpack: ${file(../serverlessCommon/webpack.yml)}
  warmup: ${file(../serverlessCommon/warmup.yml)}
  layers:
    layerVersion: 1 # version of deployed layer
    layerNode: arn:aws:lambda:${self:provider.region}:#{AWS::AccountId}:layer:${self:custom.service.mainName}-layers-layerNode-${self:provider.stage}:${self:custom.layers.layerVersion}
  customDomain: ${file(../serverlessCommon/customDomain.yml)}
  domains: ${file(../serverlessCommon/domains.yml)}
  environment: ${file(../../.envs/${self:provider.stage}.yml)}
  common:
    cors: ${file(../serverlessCommon/cors.yml)}
    apiGateway: ${file(../serverlessCommon/apiGateway.yml)}
    authorizer: ${file(../serverlessCommon/authorizer.yml)}
  isProd:
    dev: false
    prod: true

functions:
  sampleGet:
    handler: sampleGet.handler
    warmup: false
    layers:
      - ${self:custom.layers.layerNode}
    events:
      - http:
          method: GET
          path: / # is uri which root is ${self:custom.service.subService}
          private: false
          authorizer: ${self:custom.common.authorizer}
          cors: ${self:custom.common.cors.${self:provider.stage}.defaultCache}

resources:
  Resources:
    GatewayResponseExpiredToken: ${self:custom.common.apiGateway.GatewayResponseExpiredToken}
    GatewayResponseDefault4XX: ${self:custom.common.apiGateway.GatewayResponseDefault4XX}

```

## Contribution

I am opened to your ideas . Once you have any idea how to improve it please don't hesitate to PR.

* Fork repo
* Install the dependencies with `npm i`
* Create a feature branch `git checkout -b your_new_feature`
* Add your code and add tests if you implement a new feature
* Validate your changes `npm run lint` 

## License

This software is released under the MIT license.

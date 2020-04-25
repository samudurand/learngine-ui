UI for Learngine API

# Development

```
yarn install
```
Run app on http://localhost:3000
```
yarn start
```
Run all tests with coverage and watch
```
yarn test --coverage --watchAll
```
Run all tests once
```
CI=true yarn test --coverage
```
Run eslint 
```
yarn eslint "src/**/*.js"
```
Docker
```
docker build -t firens/learngine-ui .
```
Wiremock
```
cd wiremock
java -jar wiremock.jar --port 9000
```
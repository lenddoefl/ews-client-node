# EFL Web Services Node.js Client
Demonstrates how to authenticate to EFL Web Services in Node applications.

# Install packages
```npm install```

# Installation
This library is distributed on `npm`. In order to add it as a dependency, run the following command:
```
npm install ews-client-node --save
```

# Running the Demo
## Applicant Journey API

```
# Run the AJ API Client Demo
node demos/ajapiclientdemo.js <hostname> <pathToApiKey>
```
Where:

- `hostname` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The demo authenticates to the Applicant Journey API and starts a new session.

## Scores API

```
# Run the Scores API Client Demo
node demos/scoresapiclientdemo.js <hostname> <pathToApiKey>
```
Where:

- `hostname` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The demo authenticates to the Scores API and returns any subjects with ID numbers that match the query.

# Running the test

## Test for Applicant Journey API
```
npm test tests/ajapitest.js <hostname> <pathToApiKey>
```
Where:
- `hostname` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

## Test for Scores API
```
npm test tests/scoresapitest.js <hostname> <pathToApiKey>
```
- `hostname` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

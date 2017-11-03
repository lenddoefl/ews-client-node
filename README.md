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
node demos/ajApiClientDemo.js <hostname> <pathToApiKey>
```
Where:

- `<hostname>` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The demo authenticates to the Applicant Journey API and starts a new session.

In order to process the response it is necessary to write:

```
<nameInstanceClass>.<nameEndpoint>(...)
    .then(response => {
        //If got error from server, then write
        if (response.data.errors) { ... }
        ...

        //If got success response from server, then write
        if (response.data) { ... }
    })
```

Where:

- `<nameEndpoint>` is the name of call endpoint (for example, startSession, finishStep and etc.).
- `<nameInstanceClass>` is the name instance of the class AJ API Client.

## Scores API

```
# Run the Scores API Client Demo
node demos/scoresApiClientDemo.js <hostname> <pathToApiKey>
```
Where:

- `<hostname>` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The demo authenticates to the Scores API and returns any subjects with ID numbers that match the query.

In order to process the response it is necessary to write:

```
<nameInstanceClass>.<nameEndpoint>(...)
    .then(response => {
        if (response.data) { ... }
        ...
})

```

Where:

- `<nameEndpoint>` is the name of call endpoint (for example, dateQuery, subject).
- `<nameInstanceClass>` is the name instance of the class Scores API Client.

# Running the test

## Test for Applicant Journey API
```
npm test <nameFileTest> -- --hostname=<hostname> --pathToApiKey=<pathToApiKey>
```
Where:
- `<nameFileTest>` is the name of the file to run test (e.g., `tests/integration/ajApiTest.js`, `tests/unit/ajApiTest.js`)
- `<hostname>` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

## Test for Scores API
```
npm test <nameFileTest> -- --hostname=<hostname> --pathToApiKey=<pathToApiKey>
```
Where:
- `<nameFileTest>`  is the name of the file to run test (e.g., `tests/integration/scoresApiTest.js`, `tests/unit/scoresApiTest.js`)
- `<hostname>` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

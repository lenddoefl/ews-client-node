# EFL Web Services Node.js Client

The library demonstrates how to authenticate to EFL Web Services in Node applications including Applicant Journey and Scores APIs.

## Installation
### Using NPM
This library is distributed on `npm`. In order to add it as a dependency in package.json file, run the following command:
```
npm install ews-client-node --save
```
### Manually
For a manual installation, complete the following steps:
1. `git clone https://github.com/eflglobal/ews-client-node.git`.
2. Install packages with the help of the command `npm install` to install the necessary packages for further run demos and tests.

To use requests to the APIs, you can copy the files from `ews-client-node/apiClient` into your project. But you should be sure that the packages (`dependencies` and `devDependencies`) from the `ews-client-node/package.json` file are installed in your project.

## Usage
### Applicant Journey API
To send requests to the Applicant Journey API use the `ajApiClient` class.
The ajApiClient constructor has two main properties:

- `hostname`: is the hostname of the API service (e.g., `uat-external.eflglobal.com`).
- `APIKey`: is the object with three values from `identifier.txt`, `decryption.key`, `encryption.key` files.

The `identifier.txt`, `decryption.key` and `encryption.key` files can be found in the API Key archive downloaded from the EFL Webapp. Contact EFL Support for more information.

An example of the use of this class is demonstrated in `ews-client-node/demos/ajApiClientDemo` file.
The [`further`](https://github.com/eflglobal/ews-client-node#applicant-journey-api-1) will describe in more detail how to use ajApiClient.

#### Sending AJ API Requests

##### `login`
Method connects to [`login`](https://developers.eflglobal.com/applicant-journey-api/endpoints/login.html) endpoint and returns JSON response.

##### `startSession`
Method connects to [`startSession`](https://developers.eflglobal.com/applicant-journey-api/endpoints/startSession.html) endpoint and returns JSON response.

Arguments:

- `data`: contents of the `data` for call endpoint.

##### `finishSession`
Method connects to [`finishSession`](https://developers.eflglobal.com/applicant-journey-api/endpoints/finishSession.html) endpoint and returns JSON response.

Arguments:

- `data`: contents of the `data` for call endpoint.

##### `finishStep`
Method connects to [`finishStep`](https://developers.eflglobal.com/applicant-journey-api/endpoints/finishStep.html) endpoint and returns JSON response.

Arguments:

- `data`: contents of the `data` for call endpoint.

##### `createAttachment`
Method connects to [`createAttachment`](https://developers.eflglobal.com/applicant-journey-api/endpoints/createAttachment.html) endpoint and returns JSON response.

Arguments:

- `data`: contents of the `data` for call endpoint.

##### `getApplication`
Method connects to [`getApplication`](https://developers.eflglobal.com/applicant-journey-api/endpoints/getApplication.html) endpoint and returns JSON response.

Arguments:

- `data`: contents of the `data` for call endpoint.

##### `prefetchApplications`
Method connects to [`prefetchApplications`](https://developers.eflglobal.com/applicant-journey-api/endpoints/prefetchApplications.html) endpoint and returns JSON response.

Arguments:

- `data`: contents of the `data` for call endpoint.

##### `resumeSession`
Method connects to [`resumeSession`](https://developers.eflglobal.com/applicant-journey-api/endpoints/resumeSession.html) endpoint and returns JSON response.

Arguments:

- `data`: contents of the `data` for call endpoint.

#### Handling Errors

If an error occurs (e.g., non-200 response from the web service), the `errors` object will be returned.

In order to process the response it is necessary to write:

```
<nameInstanceClass>.<nameEndpoint>(...)
    .then(response => {
        if (response.data.errors) {
            // Handle error case.
        } else {
            // Handle success case.
        }
    })
```

Where:

- `<nameEndpoint>` is the name methods of call endpoint (e.g., startSession, finishStep and etc.).
- `<nameInstanceClass>` is the name instance of the class AJ API Client.

See the [`documentation`](https://developers.eflglobal.com/applicant-journey-api/gettingStarted/error-responses.html) for more details about AJ API Error Responses.

### Scores API
To send requests to the Scores API use the `scoresApiClient` class.
The scoresApiClient constructor has two main properties:

- `hostname`: is the hostname of the API service (e.g., `uat-external.eflglobal.com`).
- `APIKey`: is the object with three values from `identifier.txt`, `decryption.key`, `encryption.key` files.

The `identifier.txt`, `decryption.key` and `encryption.key` files can be found in the API Key archive downloaded from the EFL Webapp. Contact EFL Support for more information.

An example of the use of this class is demonstrated in `ews-client-node/demos/scoresApiClientDemo` file.
The [`further`](https://github.com/eflglobal/ews-client-node#scores-api-1) will describe in more detail how to use scoresApiClient.

#### Sending Scores API Requests

##### `login`
Sends a connects to [`login`](https://developers.eflglobal.com/scores-api/endpoints/login.html) endpoint and returns JSON response.

##### `subject`
Sends a request to [`subject`](https://developers.eflglobal.com/scores-api/endpoints/subject.html) endpoint and returns JSON response.

Arguments:

- `data`: contents of the `data` for call endpoint.

##### `dateQuery`
Sends a request to [`dateQuery`](https://developers.eflglobal.com/scores-api/endpoints/dateQuery.html) endpoint and returns JSON response.

Arguments:

- `data`: contents of the `data` for call endpoint.

#### Handling Errors

In order to process the response it is necessary to write:

```
<nameInstanceClass>.<nameEndpoint>(...)
    .then(response => {
        // The API request was unsuccessful then value of `status` from `data` object will be `0`,
        // The API request was successful then value of `status` from `data` object will be `1`,        
        
        if (response.data) { ... }
})
```

Where:

- `<nameEndpoint>` is the name methods of call endpoint (e.g., dateQuery, subject).
- `<nameInstanceClass>` is the name instance of the class Scores API Client.

See the [`documentation`](https://developers.eflglobal.com/scores-responses/) for more details about Scores API Responses.

## Additional Features
### Demos
In `demos` directory you can find demo files (`demos/AjApiClientDemo.js`, `demos/ScoresApiClientDemo.js`). They show how to access methods of both client classes.

#### Applicant Journey API

The demo authenticates to the [`Applicant Journey API`](https://developers.eflglobal.com/applicant-journey-api/) and starts a new session.

##### Run the AJ API Client Demo

```
# Run the AJ API Client Demo from the root folder (ews-client-node).
node demos/ajApiClientDemo.js <hostname> <pathToApiKey>
```
Where:

- `<hostname>` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the relative path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The `identifier.txt`, `decryption.key` and `encryption.key` files can be found in the API Key archive downloaded from the EFL Webapp. Contact EFL Support for more information.

Examples:
```
node demos/ajApiClientDemo.js uat-external.eflglobal.com path/to/zip/archive/with/APIKeys
```
or
```
node demos/ajApiClientDemo.js uat-external.eflglobal.com path/to/folder/with/APIKeys
```

##### Description of the demo

The first, include file `ews-client-node/index` (general file of the library) and create a new instance class of AJ API Client.
```js
var module = require('path/to/file/index.js'),
    ajModule = new module.ajApiClient;
```

If you copy only folder `ews-client-node/apiClient`, then include file `ews-client-node/apiClient/ajApiClient` and create a new instance class of AJ API Client.
For example:
```js
var module = require('path/to/file/ajApiClient.js'),
    ajModule = new module;
```
The next, call methods `init` for setting values of APIKey and hostname for an instance of ajApiClient class. 
```js
ajModule.init({hostname: process.argv[2], pathFolder: process.argv[3]});
```

Argument:
- object with two field `hostname` and `pathFolder`. 

Where:
- `<hostname>` - is the value of hostname (from the command line when you run demo).
- `<pathFolder>` - is the value of path to folder (zip file) with three files (`identifier.txt`, `decryption.key`, `encryption.key`) from the command line when the demo run.

The `identifier.txt`, `decryption.key` and `encryption.key` files can be found in the API Key archive downloaded from the EFL Webapp. Contact EFL Support for more information.

You can manually write these values in these field without writing to the command line.

Examples:
```js
ajModule.init({hostname: 'uat-external.eflglobal.com', pathFolder: 'path/to/zip/archive/with/APIKeys'});
```
or
```js
ajModule.init({hostname: 'uat-external.eflglobal.com', pathFolder: 'path/to/folder/with/APIKeys'});
```

Further, examples of method calls of the ajApiClient class are shown.

Example:

```js
let dataForStartSession = {
    applicant: {},
    application: "sdkExample"
};

ajModule.startSession(dataForStartSession)
    .then(response => {
        if(response) {
            console.log('Response calling startSession');
            console.log('Application hash: ' + response.data.applicationHash);
            console.log('Public Key: ' + response.data.publicKey);
            console.log('UID: ' + response.data.uid);
        }
    })
    .then(() => {    
        // Call other methods of the ajApiClient.
        ...
    })
```

#### Scores API

The demo authenticates to the [`Scores API`](https://developers.eflglobal.com/scores-api/).

##### Run the Scores API Client Demo

```
# Run the Scores API Client Demo from the root folder (ews-client-node).
node demos/scoresApiClientDemo.js <hostname> <pathToApiKey>
```
Where:

- `<hostname>` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the relative path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The `identifier.txt`, `decryption.key` and `encryption.key` files can be found in the API Key archive downloaded from the EFL Webapp. Contact EFL Support for more information.

Examples:
```
node demos/scoresApiClientDemo.js uat-external.eflglobal.com path/to/zip/archive/with/APIKeys
```
or
```
node demos/scoresApiClientDemo.js uat-external.eflglobal.com path/to/folder/with/APIKeys
```

##### Description of the demo

The first, include file `ews-client-node/index` (general file of the library) and create a new instance class of Scores API Client.
```js
var module = require('path/to/file/index.js'),
    scoresModule = new module.scoresApiClient;
```
If you copy only folder `ews-client-node/apiClient`, then include file `ews-client-node/apiClient/scoresApiClient` and create a new instance class of Scores API Client.
For example:
```js
var module = require('path/to/file/scoresApiClient.js'),
    scoresModule = new module;
```

The next, call methods `init` for setting values of APIKey and hostname for an instance of ajApiClient class.
```js
scoresModule.init({hostname: process.argv[2], pathFolder: process.argv[3]});
```

Argument:
- object with two field `hostname` and `pathFolder`. 

Where:
- `<hostname>` - is the value of hostname (from the command line when you run demo).
- `<pathFolder>` - is the value of path to folder (zip file) with three files (`identifier.txt`, `decryption.key`, `encryption.key`) from the command line when the demo run.

The `identifier.txt`, `decryption.key` and `encryption.key` files can be found in the API Key archive downloaded from the EFL Webapp. Contact EFL Support for more information.

You can manually write these values in these field without writing to the command line.

Examples:
```js
scoresModule.init({hostname: 'uat-external.eflglobal.com', pathFolder: 'path/to/zip/archive/with/APIKeys'});
```
or
```js
scoresModule.init({hostname: 'uat-external.eflglobal.com', pathFolder: 'path/to/folder/with/APIKeys'});
```

Further, examples of method calls of the scoresApiClient class are shown.

Example:

```js
let dataForDateQuery = "2017-11-02 00:00:00";

scoresModule.dateQuery(dataForDateQuery).then(response => {
   console.log('Response calling dateQuery', response);
});
```

### Tests
The library ships with a complete test suite. These tests can be used to verify the functionality of the library, and you can use them as additional documentation (in particular, reading the assertions in each test is a great way to see exactly what the structure of each response payload will be).

#### Integration tests
##### Applicant Journey API

```
# Run the integration tests for Applicant Journey API from the root folder (ews-client-node).
npm test <nameFileTest> -- --hostname=<hostname> --pathToApiKey=<pathToApiKey>
```
Where:
- `<nameFileTest>` is the path to the file to run test (`tests/integration/ajApiTest.js`)
- `<hostname>` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the relative path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The `identifier.txt`, `decryption.key` and `encryption.key` files can be found in the API Key archive downloaded from the EFL Webapp. Contact EFL Support for more information.

##### Scores API

```
# Run the integration tests for Scores API from the root folder (ews-client-node).
npm test <nameFileTest> -- --hostname=<hostname> --pathToApiKey=<pathToApiKey>
```
Where:
- `<nameFileTest>` is the path to the file to run test (`tests/integration/scoresApiTest.js`)
- `<hostname>` is the hostname of the API service to send requests to (e.g., `uat-external.eflglobal.com`).
- `<pathToApiKey>` is the relative path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The `identifier.txt`, `decryption.key` and `encryption.key` files can be found in the API Key archive downloaded from the EFL Webapp. Contact EFL Support for more information.

#### Unit tests
##### Applicant Journey API

```
# Run the unit tests for Applicant Journey API from the root folder (ews-client-node).
npm test <nameFileTest>
```
Where:
- `<nameFileTest>` is the path to the file to run test (`tests/unit/ajApiTest.js`)

##### Scores API
```
# Run the unit tests for Scores API from the root folder (ews-client-node).
npm test <nameFileTest>
```
Where:
- `<nameFileTest>` is the path to the file to run test (`tests/unit/scoresApiTest.js`)

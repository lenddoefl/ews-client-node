# EFL Web Services Node.js Client
Demonstrates how to authenticate to EFL Web Services in Node applications.

# Install packages
```npm install```

# Running the Demo
## Applicant Journey API

```
# Run the Demo
node <nameFileDemo> <baseURL> <pathToApiKey>
```
Where:

- `<nameFileDemo>` is the name of the file to run ApplicantJourneyClient demo (e.g., `ajapiclientdemo.js`).
- `baseURL` is the url of the API service to send requests to (e.g., `https://uat-external.eflglobal.com/api/v2/applicant_journey/`).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The demo authenticates to the Applicant Journey API and starts a new session.

## Scores API

```
# Run the Demo
node <nameFileDemo> <baseURL> <pathToApiKey>
```
Where:

- `<nameFileDemo>` is the name of the file to run ScoresClient demo (e.g., `scoresapiclientdemo.js`).
- `baseURL` is the url of the API service to send requests to (e.g., `https://uat-external.eflglobal.com/api/v1/scores/`).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The demo authenticates to the Scores API and returns any subjects with ID numbers that match the query.

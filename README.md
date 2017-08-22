# EFL API Authentication Demo
Demonstrates how to authenticate to EFL Web Services in Node applications.

# Install packages
```npm install```

# Running the Demo
## Applicant Journey API

```
# Run the Demo
node <nameFileDemo> <valueVariableEWSAJ_prod> <pathToApiKey>
```
Where:

- `<nameFileDemo>` is the name of the file to run ApplicantJourneyClient demo (e.g., `ApplicantJourneyClientDemo.js`).
- `valuesVariableEWSAJ_prod` is value of the variable EWSAJ_prod. The value can be `false` or `true`.
   The EWSAJ_prod variable is needed to determine which API URL to send requests to
   (e.g., if value is `false`, then API URL for testing the client is `https://uat-external.eflglobal.com/api/v2/applicant_journey/`)
  - `false` - if run demo for testing the client (UATE).
  - `true` - if run demo for production the client (PROD).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The demo authenticates to the Applicant Journey API and starts a new session.

## Scores API

```
# Run the Demo
node <nameFileDemo> <valueVariableEWSScores_prod> <pathToApiKey>
```
Where:

- `<nameFileDemo>` is the name of the file to run ScoresClient demo (e.g., `ScoresClientDemo.js`).
- `valuesVariableEWSAJ_prod` is value of the variable EWSScores_prod. The value can be `false` or `true`.
   The EWSScores_prod variable is needed to determine which API URL to send requests to
   (e.g., if value is `false`, then API URL for testing the client is `https://uat-external.eflglobal.com/api/v1/scores/`)
  - `false` - if run demo for testing the client (UATE).
  - `true` - if run demo for production the client (PROD).
- `<pathToApiKey>` is the path to the API key on the local filesystem (can be a ZIP archive or a folder containing the three files (`identifier.txt`, `encryption.key`, `decryption.key`)).

The demo authenticates to the Scores API and returns any subjects with ID numbers that match the query.

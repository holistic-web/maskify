# Cloud Functions
Provides a cloud function to identify where best to place a mask on the image to support the Maskify website.

## Factsheet
| **Category**            | **Value**                |
|-------------------------|--------------------------|
| **Project Type**        | Firebase Cloud functions |

## Developing Locally
_TBC._

## Continous Integration
This project is supported by continous integreation in the following ways:

### on commit to any branch but master
Github Actions will run `npm run lint` to confirm no linting errors have been made. If any errors are found the linter will attempt to automatically fix the issue and commit the change to the branch.

See `.github/workflows/functions-lint.yml`.

### on commit to master branch
Github Actions will run `firebase deploy` to publish the latest version of the functions. It relies on the `FIREBASE_TOKEN` secret being available in github.

See `.github/workflows/functions-deploy.yml`.

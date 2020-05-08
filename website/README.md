# Website
Allows a user to upload a photo (or provide a url) to a photo. It [will then] then calls a cloud function to get facial recognition data for that image, and overlays a mask on the original image using this data.

## Factsheet
| **Category**            | **Value**                 |
|-------------------------|---------------------------|
| **Project Type**        | Vue.js Web App            |
| **Live URL**            | www.maskify-f6f41.web.app |

## Developing Locally
1. install dependencies
	```bash
	npm install
	```

2. run in local development mode
	```bash
	npm run serve
	```

## Continous Integration
This project is supported by continous integreation in the following ways:

### on commit to any branch but master
Github Actions will run `npm run lint` to confirm no linting errors have been made. If any errors are found the linter will attempt to automatically fix the issue and commit the change to the branch.

See `.github/workflows/website-lint.yml`.

### on commit to master branch
Github Actions will run `npm run build` and `firebase deploy` to publish the latest version of the site. It relies on the `FIREBASE_TOKEN` secret being available in github.

See `.github/workflows/website-deploy.yml`.

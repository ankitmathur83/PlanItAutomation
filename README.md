This Project is to test PlanIt Careers website using Playwright using Javascript. 


## Installation
npm init playwright@latest

## To update Playwright to the latest version run the following command:
npx playwright install --with-deps

## You can always check which version of Playwright you have by running the following command:
npx playwright --version


## What's Installed
Playwright will download the browsers needed as well as create the following files.

playwright.config.ts

package.json

package-lock.json

tests/
  example.spec.ts
  planitcareers.spec.js

tests-examples/
  demo-todo-app.spec.ts

##  Usage
npx playwright test tests/planitcareers.spec.js --project=chromium

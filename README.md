<div align="center"><img src="https://live.staticflickr.com/65535/50695950941_526e15d2f1.jpg" width="40%" alt="dims-logo"/></div>

<hr/>

[![Netlify Status](https://api.netlify.com/api/v1/badges/850b0708-502c-4bdb-b5f3-6bdff801bfd5/deploy-status)](https://app.netlify.com/sites/dims-11/deploys)
[![codecov](https://codecov.io/gh/Dev-incubator/DIMS-cra/branch/main/graph/badge.svg?token=OGFOYAC3VK)](https://codecov.io/gh/Dev-incubator/DIMS-cra)
[![Build Status](https://travis-ci.com/Dev-incubator/DIMS-cra.svg?branch=main)](https://travis-ci.com/Dev-incubator/DIMS-cra)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Dev-incubator/DIMS-cra)
![GitHub issues](https://img.shields.io/github/issues/Dev-incubator/DIMS-cra)

### The link to principal idea of design [mockup](https://symu.co/freebies/templates-4/merkury-dashboard-psd-template/). <br/> **You do not have to follow it, just use it as a guide**

### In **[wiki-ui](https://github.com/Dev-incubator/Wiki-UI)** you can find all other guides regarding project structure, plan etc.

### Read about good commits, git workflow requirements etc. in repo [guide](https://github.com/Dev-incubator/git)

### Main scripts 📄

```bash
  "start" - start app
  "build" - build app
  "test" - run tests
  "test:coverage:ci:codecov" - run test and submit codecoverage to codecov
  "format" - format code with prettier
  "lint" - check your code with eslint
  "lint:fix" - fix your code with eslint
  "cm" - run commitizen to create a good commit
```

To commit message you have to write following commands
```bash
   git add .
   git commit 
```
then follow commitizen prompts and write a good commit

### Main technologies ℹ️

- react
- eslint + air bnb style guide + some additional rules
- prettier
- codecov with Travis CI
- commitizen

### Publish with netlify button 🚀

You need to have an account on [netlify](https://www.netlify.com/)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Dev-incubator/DIMS-cra#CUSTOM_LOGO=https://live.staticflickr.com/65535/50695950941_526e15d2f1.jpg&DIMS_TITLE="Dims%20app")

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete.

### Env variables 📝

 - **CUSTOM_LOGO** - here you can pass a link to your app logo
 - **DIMS_TITLE** - here you can pass your app title

### Some important points ⚠️️

#### :small_red_triangle: Yarn-package manager only :small_red_triangle:

#### VSCode integration
For ESLint warnings inline with your code and run formatting automatically with Prettier in VSCode, we need to install:
 - **[ESLint](https://github.com/Microsoft/vscode-eslint)** extension
 - **[Prettier](https://github.com/prettier/prettier-vscode)** extension
 - Edit VSCode settings.json to set up formatting on every file change or on save

#### Basic webstorm setup is in .idea 

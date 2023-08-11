---
date: 2023-08-11T00:00:00.000Z
title: Deploy a .NET web app to Azure App Service with GitHub actions
description: "Setup CI for your .NET web app in a few steps"
heroImages:
  - alt: Screenshot of GitHub Actions log
    image: /assets/deploy-dot-net.jpg
thumbnail:
  - alt: Screenshot of GitHub Actions log
    image: /assets/deploy-dot-net.jpg
xrMa: false
hide: false
archive: false
category: words
---

Getting [CI](https://www.atlassian.com/continuous-delivery/continuous-integration) set up at the start of a project is so important in terms of knowing your app actually works when deployed and being able to test out your app with different users and devices. If we were building a static website or had a few Javascript serverless functions services like [Netlify](https://netlify.com/) make this very easy. Unfortunately with .NET we have a few more steps, but the process does not take too long. Azure currently offers a free tier for App Service, with 60 CPU minutes / day.

Our goal is to have CI test up so that when we push to our repo:

1. [GitHub Actions](https://docs.github.com/en/actions) runs the tests in our .NET app
2. GitHub Actions builds the .NET app
3. If build succeeds, GitHub Actions runs tests within .NET app
4. If tests pass, GitHub Actions publishes the app to a local folder
5. GitHub Actions sends the published app to Azure App Service
6. Azure App Service deploys the new version of our app

## Prerequisites

- A .NET app that is pushed to a GitHub repo
- An Azure account with an App Service web app, configured to run .NET Core ([tutorial](https://learn.microsoft.com/en-gb/azure/app-service/tutorial-dotnetcore-sqldb-app))

## Write a basic GitHub action

We will use GitHub Actions for CI. Actions uses [YML format to configure workflows](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions). Workflows are run when certain things happen, in our case when the repo is pushed to. You can then define jobs and steps for that workflow, functions that GitHub Actions will automatically run.

A good place to start is [GitHub’s .NET starter workflow](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-net), which if added to your repo will do the following on pushing to it:

- Start a workflow called “build”, that runs on ubuntu-latest
- Checks out the repo
- Sets up .NET version 3.1.x and 6.0.x
- Installs the app’s dependencies
- Build the app
- Run tests within the app

```csharp
name: "[your app name] Build"

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        dotnet-version: [ '3.1.x', '6.0.x' ]

    steps:
      - uses: actions/checkout@v3
      - name: Setup .NET Core SDK ${{ matrix.dotnet-version }}
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: ${{ matrix.dotnet-version }}
      - name: Install dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build --configuration Release --no-restore
      - name: Test
        run: dotnet test --no-restore --verbosity normal
```

In this example the sections are:

- `name` the name of your workflow as it appears in GitHub
- `on` the trigger for the workflow, for a list of available events, see [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows).
- `jobs` one or more jobs that will be run when `on` is triggered, their name is controllable by you, for example `build` could be renamed to whatever we find useful
- `steps` a set of sequential steps that run either a script or action, these consist of
  - `uses` the script or action to be run on that step. Above example `actions/checkout@v3` and `actions/setup-dotnet@v3` are actions that GitHub provide and can be found in the [](https://github.com/actions)[Actions Marketplace](https://github.com/marketplace?type=actions). You can see their readme files to see what they do. In the final three steps command line commands are used, e.g. `dotnet restore`
  - `name` internal name for that step, call it something that will make sense to you in logs

Visual Studio Code seems to have better support for editing GitHub Action files, there is an extension in the VS Code Marketplace that can validate your file as you edit it.

## Add Action to your repo

Save your action to `.github/workflows/build.yml` as this is where GitHub looks for Actions to be run. The filename can be customised as you like.

## Add Publish and Deploy to Action

Returning to our goal, our Action so far achieves 3 out of our 6 steps, so we just need add in the following:

1. If tests pass, GitHub Actions publishes the app to a local folder
2. GitHub Actions sends the published app to Azure App Service
3. Azure App Service deploys the new version of our app

The “Publish” and “Deploy to Azure” steps have been added in below, we are also now using environment variables at the top of the file.

```csharp
name: "[your app name] Build"

on: [push]

env:
  AZURE_WEBAPP_NAME: your-app-name         # set this to your application's name
  AZURE_WEBAPP_PACKAGE_PATH: './published' # set this to the path to your web app project, defaults to the repository root
  DOTNET_VERSION: '7.0.307'                # set this to the dot net version to use

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Setup .NET Core SDK ${{ env.DOTNET_VERSION }}
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: ${{ env.DOTNET_VERSION }}
      - name: Install dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build --configuration Release --no-restore
      - name: Test
        run: dotnet test --no-restore --verbosity normal
      - name: Publish
        run: dotnet publish -c Release -o '${{ env.AZURE_WEBAPP_PACKAGE_PATH }}'
      - name: 'Deploy to Azure'
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }} # Replace with your Azure app name
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE  }} # Define secret variable in repository settings as per action documentation
          package: '${{ env.AZURE_WEBAPP_PACKAGE_PATH }}'
```

## Add Azure Publish Profile as Secret

The final thing we need to do is to provide the Azure Publish Profile, which is referenced as `secrets.AZURE_WEBAPP_PUBLISH_PROFILE` , so we will store it as a Secret in GitHub Actions:

1. Go to your web app in the Azure dashboard and click the “Download Publish Profile” button (see [Get a publish profile from Azure App Service](https://learn.microsoft.com/en-us/visualstudio/azure/how-to-get-publish-profile-from-azure-app-service?view=vs-2022)).
2. Copy the contents of this file
3. Create a new GitHub Action secret with name `AZURE_WEBAPP_PUBLISH_PROFILE` and paste in the contents of the publish profile file as the secret (see [Creating encrypted secrets for a repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)).

## Push to GitHub

After that you can push the updated Action to GitHub, it should run and push your app to Azure 🎉.

## Further reading / watching

- Example [build.yml](https://github.com/jonjhiggins/fav-choons-csharp/blob/main/.github/workflows/build.yml) and [log of Actions](https://github.com/jonjhiggins/fav-choons-csharp/actions) on one of my projects
- [Learn how to deploy .NET Core apps to Azure with GitHub Actions | Azure Friday](https://www.youtube.com/watch?v=cGvmbYE4HOY)

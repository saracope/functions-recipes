# Functions Recipes — Trial Org Setup

## Introduction

If you are have received a Salesforce Functions Trial Org, it comes pre-loaded with Functions-enhanced demos that we call "Functions Recipes". But, in order for those demos to work, some configuration is required. Please complete all of the following steps before trying to use any of the demos in your Trial Org.

## Configure Your Trial Org

Follow the [directions in the Functions documentation](http://sfdc.co/functions-org-config) to configure your trial org for use with Functions and as a Developer Hub.

Be sure that you flipped the toggle switch to "Enable Production Space".

A note about Permission Sets: you will find that your default system administrator user has already been granted the "FunctionsAccess" and "FunctionsProdAccess" permission sets, so you can skip that section of the documentation initially, but any new users you choose to add to your trial org will need these permissions in order to access the Functions CLI.

## Install Prerequisite Tools

Please refer to the section in our documentation called [Set Up Your Development Environment](https://sfdc.co/functions-install-guide) and install all of the required tools on your computer before proceeding to the next step.

## Clone Salesforce Functions Recipes Repository

Clone the branch of this repository from GitHub that corresponds with the version that is installed on your Trial Org with the following commands in your terminal:

```sh
git clone https://github.com/trailheadapps/functions-recipes
cd functions-recipes
git checkout -t origin/trial/1.1
```

## Log Into Your Trial Org With CLI

Run this command in your terminal and use the username and password you received for your Trial Org to connect your CLI with your Trial Org:

```sh
sf login org -a functions_recipes
```

## Log Into Your Functions Account With CLI

Run this command in your terminal and use the same username and password you used in the previous step to connect your CLI to your Salesforce Functions account:

```sh
sf login functions
```

## Create Compute Environment For The Functions

Run this command in your terminal to create a compute environment to install the Functions into:

```sh
sf env create compute --connected-org=functions_recipes --alias=recipes_env
```

## Deploy The Functions

Run this command in your terminal to deploy the Functions into the Compute Environment created in the previous step:

```sh
sf deploy functions --connected-org=functions_recipes
```

## Log Out Of The CLI

Now that the pieces are deployed, you can disconnect your CLI from your Trial Org and Functions account:

```sh
sf logout org --no-prompt -o functions_recipes
sf logout functions
```

## Explore The Functions Demos In Your Trial Org

It can take a few minutes for all of the Functions in this project to be ready for invocation, so consider taking a break.

Then, with the Functions installed, you now can try out the demos listed down the left column of the start page of your Trial Org.

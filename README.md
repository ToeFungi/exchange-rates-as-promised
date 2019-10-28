# Base App
[![Build Status](https://travis-ci.org/ToeFungi/nodelib-base.svg?branch=master)](https://travis-ci.org/ToeFungi/nodelib-base)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=nodelib-base&metric=alert_status)](https://sonarcloud.io/dashboard?id=nodelib-base)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=nodelib-base&metric=bugs)](https://sonarcloud.io/dashboard?id=nodelib-base)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=nodelib-base&metric=code_smells)](https://sonarcloud.io/dashboard?id=nodelib-base)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=nodelib-base&metric=coverage)](https://sonarcloud.io/dashboard?id=nodelib-base)

This base application is designed to be a basic starting point for Node based libraries that utilise TypeScript and the 
mocha test framework.

## Getting Started
This is how to get a copy of this working locally. The only requirement is that Node is installed on the base machine.
```bash
$ git clone git@github.com:ToeFungi/nodelib-base.git
$ cd nodelib-base
$ npm i
```

Ensure to update the README, badges and sonar settings according to the new project. 

## Running Tests
To run tests, you should be able to simply run be able to run 
```bash
$ npm run test
$ npm run coverage
```

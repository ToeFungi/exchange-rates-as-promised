# Exchange Rates As Promised
[![Build Status](https://travis-ci.org/ToeFungi/exchange-rates-as-promised.svg?branch=master)](https://travis-ci.org/ToeFungi/exchange-rates-as-promised)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=exchange-rates-as-promised&metric=alert_status)](https://sonarcloud.io/dashboard?id=exchange-rates-as-promised)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=exchange-rates-as-promised&metric=bugs)](https://sonarcloud.io/dashboard?id=exchange-rates-as-promised)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=exchange-rates-as-promised&metric=code_smells)](https://sonarcloud.io/dashboard?id=exchange-rates-as-promised)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=exchange-rates-as-promised&metric=coverage)](https://sonarcloud.io/dashboard?id=exchange-rates-as-promised)

This is an unofficial client for the [Exchange Rates API](https://exchangeratesapi.io/) and encapsulates all 
functionality in an easy to use, easy to implement, promised based fashion. The codebase is completely covered by unit
tests and includes a code analysis through Sonar. There is appropriate documentation illustrating use-cases and examples
of implementation.

## Getting Started
This is how to get a copy of this working locally. The only requirement is that Node is installed on the base machine.
```bash
$ git clone git@github.com:ToeFungi/exchange-rates-as-promised.git
$ cd exchange-rates-as-promised
$ npm i
```

## Running Tests
To run tests, you should be able to simply run be able to run the following.
```bash
$ npm run test
$ npm run coverage
```

The testing framework used is Mocha. Chai, Chai-as-promised, nyc and nock are used for assertions, coverage reporting
and mocking external requests, respectively. Should you make a change request, please ensure that the new changes are
appropriately covered by accompanying unit tests.

## Usage
Import the file ExchangeRate client and instantiate a new instance.
```typescript
import { ExchangeRate } from './ExchangeRate'

const exchangeRate = new ExchangeRate()
```

#### .setBaseCurrency(string)
Set the base currency that the returned currencies will be converted against. You can use the existing enumerated list 
of supported currencies to select this base currency.
```typescript
exchangeRate.setBaseCurrency(Currencies.GBP)
```

#### .setCurrencies(array<Currencies>) 
Set the currencies you want to be returned from the API. These currency will be converted against the currency 
stipulated as the base above, alternatively it will default to have a base of USD. Use the existing enumerated list of 
supported currencies to populate the requested list of currencies.
```typescript
exchangeRate.setCurrencies([
  Currencies.USD,
  Currencies.ZAR
])
```

#### .setDate(Date)
Set the date for which you want the exchange rate data from. This can be any date as far back to 1999. It accepts a
standard JavaScript Date object.
```typescript
const date = new Date('2012-01-31')

exchangeRate.setDate(date)
```

#### .getRates()
Generates and submits the request to the API and returns a typed response object within a promise containing the data 
that has been requested.
```typescript
import { ExchangeResponse } from './ExchangeResponse'

exchangeRate.getRates()
  .then((response: ExchangeResponse) => console.log({
    base: response.base,
    date: response.date,
    rates: response.rates
  }))
```

#### Chaining Setters
All of the appropriate setters contained in this library return the instance of the `ExchangeRate` client that the
method call is being executed on. This means that you can chain the setters for an easier and cleaner implementation.
```typescript
import { ExchangeRate } from './ExchangeRate'

const date = new Date('2012-01-30')
const exchangeRate = new ExchangeRate()

exchangeRate.setBaseCurrency(Currencies.GBP)
  .setCurrencies([
    Currencies.USD,
    Currencies.ZAR
  ])
  .setDate(date)
  .getRates()
  .then((response: ExchangeResponse) => console.log({
    base: response.base,
    date: response.date,
    rates: response.rates
  }))
```

## Contributions
This project is completely open source and as such, you are invited to make contributions. Fork the project, make a some
changes and make the pull request. Should you have any feedback regarding the functionality, please don't hesitate to
open an issue so this can be resolved. 

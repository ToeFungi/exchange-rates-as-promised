# Exchange Rates As Promised
[![NPM Version](https://badge.fury.io/js/exchange-rates-as-promised.svg)](https://badge.fury.io/js/exchange-rates-as-promised)
[![Build Status](https://travis-ci.org/ToeFungi/exchange-rates-as-promised.svg?branch=master)](https://travis-ci.org/ToeFungi/exchange-rates-as-promised)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=exchange-rates-as-promised&metric=alert_status)](https://sonarcloud.io/dashboard?id=exchange-rates-as-promised)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=exchange-rates-as-promised&metric=bugs)](https://sonarcloud.io/dashboard?id=exchange-rates-as-promised)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=exchange-rates-as-promised&metric=code_smells)](https://sonarcloud.io/dashboard?id=exchange-rates-as-promised)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=exchange-rates-as-promised&metric=coverage)](https://sonarcloud.io/dashboard?id=exchange-rates-as-promised)

This is an unofficial client for the [Exchange Rates API](https://exchangeratesapi.io/) and encapsulates all 
functionality in an easy to use, easy to implement, promised based fashion. The codebase is completely covered by unit
tests and includes a code analysis through Sonar. There is appropriate documentation illustrating use-cases and examples
of implementation.

## Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
  - [Setting base currency](#setbasecurrencystring)
  - [Setting exchange currencies](#setcurrenciesarraycurrencies)
  - [Setting specific date](#setdatedate)
  - [Setting historical date range](#sethistoricaldatedate-date)
  - [Get exchange rates](#getrates)
  - [Chaining methods](#chaining-setters)
  - [Responses](#responses)
- [Supported Currencies](#supported-currencies)
- [Unit Tests](#running-tests)
- [Issues](#issues)
- [Contributions](#contributions)
- [License](#license)

## Getting Started
This is how to get a copy of this working locally. The only requirement is that Node is installed on the base machine.
```bash
$ git clone git@github.com:ToeFungi/exchange-rates-as-promised.git
$ cd exchange-rates-as-promised
$ npm i
```

## Installation
Install this Exchange Rates API client via npm.
```bash
$ npm i --save exchange-rates-as-promised
```
This project only has a single dependency.

## Usage
Import the file ExchangeRate client and instantiate a new instance.
```typescript
import { ExchangeRate } from 'exchange-rates-as-promised'

const exchangeRate = new ExchangeRate()
```

#### .setBaseCurrency(string)
Set the base currency that the returned currencies will be converted against. You can use the existing enumerated list 
of supported currencies to select this base currency.
```typescript
import { Currencies } from 'exchange-rates-as-promised'

exchangeRate.setBaseCurrency(Currencies.GBP)
```

#### .setCurrencies(array<Currencies>) 
Set the currencies you want to be returned from the API. These currency will be converted against the currency 
stipulated as the base above, alternatively it will default to have a base of USD. Use the existing enumerated list of 
supported currencies to populate the requested list of currencies.
```typescript
import { Currencies } from 'exchange-rates-as-promised'

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

#### .setHistoricalDate(Date, Date)
Set the historical dates for which the exchange rates should be returned. Note that these rates may not be available for
each day in the requested time period. The API provides historical data dated back to 1999.
```typescript
const endDate = new Date('1999-01-04')
const startDate = new Date('1999-01-01')

exchangeRate.setHistoricalDate(startDate, endDate)
```

#### .getRates()
Generates and submits the request to the API and returns a typed response object within a promise containing the data 
that has been requested.
```typescript
import { ExchangeResponse } from 'exchange-rates-as-promised'

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
import { ExchangeRate, Currencies, ExchangeResponse } from 'exchange-rates-as-promised'

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

#### Responses
There is a standardised response type of `ExchangeResponse` which is altered depending on the request. In the event of
querying historical data, the `rates` within `ExchangeResponse` will contain the type of `HistoricalRates` whereas any
other request will contain the type of `Rates`.

## Supported Currencies
The following currencies are currently supported by this client. All of these currencies are listed on the 
[European Central Bank](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html)
and updated periodically.

![](https://www.ecb.europa.eu/shared/img/flags/AUD.gif) Australian Dollar (AUD)<br />
![](https://www.ecb.europa.eu/shared/img/flags/BRL.gif) Brazilian Real (BRL)<br />
![](https://www.ecb.europa.eu/shared/img/flags/GBP.gif) British Pound Sterline (GBP)<br />
![](https://www.ecb.europa.eu/shared/img/flags/BGN.gif) Bulgarian Lev (BGN)<br />
![](https://www.ecb.europa.eu/shared/img/flags/CAD.gif) Canadian Dollar (CAD)<br />
![](https://www.ecb.europa.eu/shared/img/flags/CNY.gif) Chinese Yuan Renminbi (CNY)<br />
![](https://www.ecb.europa.eu/shared/img/flags/HRK.gif) Croatian Kuna (HRK)<br />
![](https://www.ecb.europa.eu/shared/img/flags/CZK.gif) Czech Koruna (CZK)<br />
![](https://www.ecb.europa.eu/shared/img/flags/DKK.gif) Danish Krone (DKK)<br />
![](https://www.ecb.europa.eu/shared/img/flags/EUR.gif) Euro (EUR)<br />
![](https://www.ecb.europa.eu/shared/img/flags/HKD.gif) Hong Kong Dollar (HKD)<br />
![](https://www.ecb.europa.eu/shared/img/flags/HUF.gif) Hungarian Forint (HUF)<br />
![](https://www.ecb.europa.eu/shared/img/flags/ISK.gif) Icelandic Krona (ISK)<br />
![](https://www.ecb.europa.eu/shared/img/flags/IDR.gif) Indonesian Rupiah (IDR)<br />
![](https://www.ecb.europa.eu/shared/img/flags/INR.gif) Indian Rupee (INR)<br />
![](https://www.ecb.europa.eu/shared/img/flags/ILS.gif) Israeli Shekel (ILS)<br />
![](https://www.ecb.europa.eu/shared/img/flags/JPY.gif) Japanese Yen (JPY)<br />
![](https://www.ecb.europa.eu/shared/img/flags/MYR.gif) Malaysian Ringgit (MYR)<br />
![](https://www.ecb.europa.eu/shared/img/flags/MXN.gif) Mexican Peso (MXN)<br />
![](https://www.ecb.europa.eu/shared/img/flags/NZD.gif) New Zealand Dollar (NZD)<br />
![](https://www.ecb.europa.eu/shared/img/flags/NOK.gif) Norwegian Krone (NOK)<br />
![](https://www.ecb.europa.eu/shared/img/flags/PHP.gif) Philippine Peso (PHP)<br />
![](https://www.ecb.europa.eu/shared/img/flags/PLN.gif) Polish Zloty (PLN)<br />
![](https://www.ecb.europa.eu/shared/img/flags/RON.gif) Romanian Leu (RON)<br />
![](https://www.ecb.europa.eu/shared/img/flags/RUB.gif) Russian Rouble (RUB)<br />
![](https://www.ecb.europa.eu/shared/img/flags/SGD.gif) Singapore Dollar (SGD)<br />
![](https://www.ecb.europa.eu/shared/img/flags/ZAR.gif) South African Rand (ZAR)<br />
![](https://www.ecb.europa.eu/shared/img/flags/KRW.gif) South Korean Won (KRW)<br />
![](https://www.ecb.europa.eu/shared/img/flags/SEK.gif) Swedish Krona (SEK)<br />
![](https://www.ecb.europa.eu/shared/img/flags/CHF.gif) Swiss Franc (CHF)<br />
![](https://www.ecb.europa.eu/shared/img/flags/THB.gif) Thai Baht (THB)<br />
![](https://www.ecb.europa.eu/shared/img/flags/TRY.gif) Turkish Lira (TRY)<br />
![](https://www.ecb.europa.eu/shared/img/flags/USD.gif) US Dollar (USD)<br />

## Running Tests
To run tests, you should be able to simply run be able to run the following.
```bash
$ npm run test
$ npm run coverage
```
The testing framework used is Mocha. Chai, Chai-as-promised, nyc and nock are used for assertions, coverage reporting
and mocking external requests, respectively. Should you make a change request, please ensure that the new changes are
appropriately covered by accompanying unit tests.

## Issues
If you find any problems while working with this library, please log an issue 
[here](https://github.com/ToeFungi/exchange-rates-as-promised/issues) so that development can begin to rectify the 
error.

Follow development on the Trello board [here](https://trello.com/b/b1t2qIK0/exchange-rates-as-promised).

## Contributions
This project is completely open source and as such, you are invited to make contributions. Fork the project, make some
changes and make the pull request. Should you have any feedback regarding the functionality, please don't hesitate to
open an issue so this can be resolved. Please ensure that any pull requests have unit tests that cover any additional
functionality.

## License
MIT License

Copyright (c) 2019 Alex Pickering

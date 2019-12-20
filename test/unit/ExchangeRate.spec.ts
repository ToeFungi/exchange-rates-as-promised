import * as nock from 'nock'

import { Currencies, ExchangeRate } from '../../src'

import * as successDefaultResponse from '../samples/success-default-response.json'
import * as successSetDateResponse from '../samples/success-set-date-response.json'
import * as successSetBaseResponse from '../samples/success-set-base-response.json'
import * as successSetCurrenciesResponse from '../samples/success-set-currencies-response.json'

describe('ExchangeRate', () => {
  const base = 'https://api.exchangeratesapi.io'

  let exchangeRate: ExchangeRate

  beforeEach(() => {
    exchangeRate = new ExchangeRate()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('#setBaseCurrency', () => {
    const baseCurrency = Currencies.GBP

    it('returns an instance of `ExchangeRate`', () => {
      return exchangeRate.setBaseCurrency(baseCurrency)
        .should.be.instanceof(ExchangeRate)
    })
  })

  describe('#setCurrencies', () => {
    const currencies = [
      Currencies.GBP
    ]

    it('returns an instance of `ExchangeRate`', () => {
      return exchangeRate.setCurrencies(currencies)
        .should.be.instanceof(ExchangeRate)
    })
  })

  describe('#setDate', () => {
    const date = new Date()

    it('returns an instance of `ExchangeRate`', () => {
      return exchangeRate.setDate(date)
        .should.be.instanceof(ExchangeRate)
    })
  })

  describe('#getRates', () => {
    it('resolves an `ExchangeResponse` with default date, base and currencies', () => {
      nock(base)
        .get('/latest?base=USD&symbols=USD,EUR,GBP')
        .reply(200, successDefaultResponse)

      return exchangeRate.getRates()
        .should.become(successDefaultResponse)
    })

    it('resolves an `ExchangeResponse` with historical date and default base and currencies', () => {
      const dateValue = '2013-06-20'
      const date = new Date(dateValue)

      nock(base)
        .get(`/${dateValue}?base=USD&symbols=USD,EUR,GBP`)
        .reply(200, successSetDateResponse)

      return exchangeRate.setDate(date)
        .getRates()
        .should.become(successSetDateResponse)
    })

    it('resolves an `ExchangeResponse` with set base and default date and currencies', () => {
      const currency = Currencies.ZAR

      nock(base)
        .get('/latest?base=ZAR&symbols=USD,EUR,GBP')
        .reply(200, successSetBaseResponse)

      return exchangeRate.setBaseCurrency(currency)
        .getRates()
        .should.become(successSetBaseResponse)
    })

    it('resolves an `ExchangeResponse` with set currencies and default date and base', () => {
      const currencies = [
        Currencies.CHF,
        Currencies.SEK
      ]

      nock(base)
        .get('/latest?base=USD&symbols=CHF,SEK')
        .reply(200, successSetCurrenciesResponse)

      return exchangeRate.setCurrencies(currencies)
        .getRates()
        .should.become(successSetCurrenciesResponse)
    })

    it('rejects when an error occurs getting data from the API', () => {
      nock(base)
        .get('/latest?base=USD&symbols=USD,EUR,GBP')
        .replyWithError('Something strange is afoot')

      return exchangeRate.getRates()
        .should.be.rejectedWith(Error, 'Something strange is afoot')
    })
  })
})

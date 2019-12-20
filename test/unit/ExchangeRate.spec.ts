import * as nock from 'nock'

import { Currencies, ExchangeRate, Queries } from '../../src'

import * as successResponse from '../samples/success-response.json'

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
    it('returns an instance of `ExchangeRate`', () => {
      return exchangeRate.setBaseCurrency(Currencies.GBP)
        .should.be.instanceof(ExchangeRate)
    })
  })

  describe('#setCurrencies', () => {
    it('returns an instance of `ExchangeRate`', () => {
      return exchangeRate.setCurrencies([ Currencies.GBP ])
        .should.be.instanceof(ExchangeRate)
    })
  })

  describe('#getRates', () => {
    it('resolves an `ExchangeResponse` object containing correct data', () => {
      nock(base)
        .get('/latest?base=USD&symbols=USD,EUR,GBP')
        .reply(200, successResponse)

      return exchangeRate.getRates()
        .should.become(successResponse)
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

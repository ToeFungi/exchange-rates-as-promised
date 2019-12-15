import * as nock from 'nock'

import { Currencies, ExchangeRate } from '../../src'

describe('ExchangeRate', () => {
  let exchangeRate: ExchangeRate

  beforeEach(() => {
    exchangeRate = new ExchangeRate()
  })

  afterEach(() => {
    nock.restore()
  })

  describe('#setBaseCurrency', () => {
    it('sets the base currency to be converted from', () => {
      exchangeRate.setBaseCurrency(Currencies.GBP)
      return exchangeRate.base.should.deep.equal(Currencies.GBP)
    })

    it('returns an instance of `ExchangeRate`', () => {
      return exchangeRate.setBaseCurrency(Currencies.GBP)
        .should.be.instanceof(ExchangeRate)
    })
  })

  describe('#setCurrencies', () => {
    it('set the returned converted currencies', () => {
      exchangeRate.setCurrencies([ Currencies.GBP ])
      return exchangeRate.currencies.should.deep.equal([ Currencies.GBP ])
    })

    it('returns an instance of `ExchangeRate`', () => {
      return exchangeRate.setCurrencies([ Currencies.GBP ])
        .should.be.instanceof(ExchangeRate)
    })
  })
})

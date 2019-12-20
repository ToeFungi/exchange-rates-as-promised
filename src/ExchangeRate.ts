import { Queries } from './types/Queries'
import { Currencies } from './enums/Currencies'
import { ExchangeResponse } from './types/ExchangeResponse'

import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * ExchangeRate class used to query the Exchange Rates API
 */
class ExchangeRate {
  /**
   * Client used to query Exchange Rates API
   */
  private client: AxiosInstance
  /**
   * Base currency used to convert against
   */
  private base: string
  /**
   * Currencies to be converted to
   */
  private currencies: Currencies[]

  /**
   * ExchangeRate constructor
   */
  constructor() {
    // Default base currency USD
    this.base = Currencies.USD

    // Default returned conversions USD, EUR, GBP
    this.currencies = [
      Currencies.USD,
      Currencies.EUR,
      Currencies.GBP
    ]

    this.client = Axios.create({
      baseURL: 'https://api.exchangeratesapi.io'
    })
  }

  /**
   * Set the base currency for the other currencies to be converted against
   */
  public setBaseCurrency(base: Currencies): ExchangeRate {
    this.base = base
    return this
  }

  /**
   * Set the currencies to convert to
   */
  public setCurrencies(currencies: Currencies[]): ExchangeRate {
    this.currencies = currencies
    return this
  }

  /**
   * Get the exchange rates from the Exchange Rates API
   */
  public getRates(): Promise<ExchangeResponse> {
    /**
     * Setup Axios request configuration
     */
    const config: AxiosRequestConfig = {
      params: {
        base: this.base,
        symbols: this.currencies.toString()
      } as Queries
    }

    /**
     * Format response from API into appropriately typed response
     */
    const formatResponse = (response: AxiosResponse): ExchangeResponse => response.data as ExchangeResponse

    /**
     * Tap log error and rethrow the error
     */
    const tapError = (error: Error): never => {
      throw error
    }

    // Get data from Exchange Rates API
    return this.client.get('/latest', config)
      .then(formatResponse)
      .catch(tapError)
  }
}

export { ExchangeRate }

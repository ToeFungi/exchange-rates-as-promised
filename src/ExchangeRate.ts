import { Queries } from './types/Queries'
import { Currencies } from './enums/Currencies'
import { ExchangeResponse } from './types/ExchangeResponse'

import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * ExchangeRate class used to query the Exchange Rates API
 */
class ExchangeRate {
  /**
   * The URI for particular endpoints of the Exchange Rates API
   */
  private uri: string
  /**
   * Client used to query Exchange Rates API
   */
  private client: AxiosInstance
  /**
   * Query parameters used to query the Exchange Rates API
   */
  private readonly queryParams: Queries

  /**
   * ExchangeRate constructor
   */
  constructor() {
    // Default URI is getting latest exchange rates
    this.uri = 'latest'

    // Query parameters
    this.queryParams = {
      base: Currencies.USD,
      symbols: [
        Currencies.USD,
        Currencies.EUR,
        Currencies.GBP
      ].toString()
    }

    // Client used to make request to API
    this.client = Axios.create({
      baseURL: 'https://api.exchangeratesapi.io'
    })
  }

  /**
   * Set the base currency for the other currencies to be converted against
   */
  public setBaseCurrency(base: Currencies): ExchangeRate {
    this.queryParams.base = base
    return this
  }

  /**
   * Set the currencies to convert to
   */
  public setCurrencies(currencies: Currencies[]): ExchangeRate {
    this.queryParams.symbols = currencies.toString()
    return this
  }

  /**
   * Set the date for which you want historical exchange rate data for. This will still use the currencies and base
   * currency set in the request
   */
  public setDate(date: Date): ExchangeRate {
    this.uri = date.toISOString()
      .split('T')[0]
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
      params: this.queryParams
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
    return this.client.get(`/${this.uri}`, config)
      .then(formatResponse)
      .catch(tapError)
  }
}

export { ExchangeRate }

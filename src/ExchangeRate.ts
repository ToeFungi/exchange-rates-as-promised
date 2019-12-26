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
    this.uri = this.extractDatestamp(date)
    return this
  }

  /**
   * Set the historical dates that the exchange rate data for the specific currencies provided should be returned for
   */
  public setHistoricalDate(startDate: Date, endDate: Date): ExchangeRate {
    this.uri = 'history'

    this.queryParams.end_at = this.extractDatestamp(endDate)
    this.queryParams.start_at = this.extractDatestamp(startDate)
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
    const formatResponse = (response: AxiosResponse): any => {
      const template = response.data

      if (this.uri === 'history') {
        const formattedRates: { [name: string]: { [name: string]: string } } = {}
        const symbols = Object.keys(template.rates[Object.keys(template.rates)[0]]) as Currencies[]
        const dates = Object.keys(template.rates)

        const latest = dates.reduce((acc, date) => {
          if (acc < date) {
            return date
          }
          return acc
        })

        symbols.forEach((symbol: Currencies) => {
          formattedRates[symbol] = {}

          for (const date in template.rates) {
            if (date === latest) {
              formattedRates[symbol]['latest'] = template.rates[date][symbol]
            } else {
              formattedRates[symbol][date] = template.rates[date][symbol]
            }
          }
        })

        return formattedRates
      }
    }

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

  /**
   * Extract the stamp yyyy-mm-dd from the given Date
   */
  private extractDatestamp(date: Date): string {
    return date.toISOString()
      .split('T')[0]
  }
}

export { ExchangeRate }

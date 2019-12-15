import { Queries } from './types/Queries'
import { Currencies } from './enums/Currencies'
import { ExchangeResponse } from './types/ExchangeResponse'

import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class ExchangeRate {
  private client: AxiosInstance
  private base: string
  private currencies: Currencies[] | Currencies

  constructor() {
    this.base = Currencies.USD
    this.currencies = [
      Currencies.USD,
      Currencies.EUR,
      Currencies.GBP
    ]

    this.client = Axios.create({
      baseURL: 'https://api.exchangeratesapi.io'
    })
  }

  public setBaseCurrency(base: Currencies): ExchangeRate {
    this.base = base
    return this
  }

  public setCurrencies(currencies: Currencies[]): ExchangeRate {
    this.currencies = currencies
    return this
  }

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
      console.error('Error occurred querying Exchange Rates API', {
        message: error.message,
        stack: error.stack
      })
      throw error
    }

    return this.client.get('/latest', config)
      .then(formatResponse)
      .catch(tapError)
  }
}

export { ExchangeRate }

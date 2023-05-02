import dotenv from 'dotenv'
import PaginatorDT from '../domain/dts/PaginatorDT'
dotenv.config()

const { PAGINATION_LIMIT = 20 } = process.env

export default class ParamsValidator {

  static validator(keys: string[], data: {}): string[] {
    const errors: string[] = []
    keys.forEach(key => {
      if (!data.hasOwnProperty(key)) errors.push(key)
    })

    return errors
  }

  static paginator(query: any): PaginatorDT {
    let take: number = Number(PAGINATION_LIMIT);
    if (query.limit && !isNaN(Number(query.limit))) {
      take = Number(query.limit)
    }

    let skip = 0;
    if (query.page && !isNaN(Number(query.page)) && Number(query.page) > 0) {
      skip = Number(query.page) - 1;
    }

    return {
      skip: skip * take,
      take
    }
  }

}
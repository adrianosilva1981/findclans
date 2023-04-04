export default class ParamsValidator {

  static validator(keys: string[], data: {}): string[] {
    const errors: string[] = []
    keys.forEach(key => {
      if (!data.hasOwnProperty(key)) errors.push(key)
    })

    return errors
  }

}
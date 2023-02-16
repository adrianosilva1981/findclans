export default class ParamsValidator {

  public errors: Array<string> = []

  isRequired(value: any, message: string) {
    if (!value || value.length <= 0) {
      this.errors.push(message)
    }
  }

  hasMinLen(value: any, min: number, message: string) {
    if (!value || value.length < min) {
      this.errors.push(message)
    }
  }

  hasMaxLen(value: any, max: number, message: string) {
    if (!value || value.length > max) {
      this.errors.push(message)
    }
  }

  IsFixedLenght(value: any, len: number, message: string) {
    if (value.length !== len) {
      this.errors.push(message)
    }
  }

  isEmail(value: any, message: string) {
    const reg = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (!reg.test(value)) {
      this.errors.push(message)
    }
  }

  isObjectEmpty(obj: object, message: string) {
    if (!Object.keys(obj).length) {
      this.errors.push(message)
    }
  }

  isArray(arr: [], message: string) {
    if (!Array.isArray(arr)) {
      this.errors.push(message)
    }
  }

  isArrayEmpty(arr: [], message: string) {
    if (Array.isArray(arr) && !arr.length) {
      this.errors.push(message)
    }
  }

  clear() {
    this.errors = []
  }

  isValid() {
    return this.errors.length === 0
  }
}

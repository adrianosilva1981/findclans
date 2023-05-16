export default class GeneralUtils {

  static getFileExtension(fileName: string): string | undefined {
    const info = fileName.split('.')
    return info.pop()
  }

}

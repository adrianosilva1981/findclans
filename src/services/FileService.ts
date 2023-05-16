import fs from 'fs';

export default class FileService {

  saveFile(name: string, content: any, path: string): string | Boolean {
    var buf = Buffer.from(content, 'base64');
    try {
      const filePath = `./tmp/${path}/${name}`
      fs.writeFileSync(filePath, buf);
      return filePath;
    } catch (error) {
      return false
    }
  }

  copyFileName(name: string): string {
    const info = name.split('.')
    if (info.length < 2) return name
    const ext = info.pop()
    return `${info.join('')}_copy.${ext}`;
  }

}
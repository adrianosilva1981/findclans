import infoUtils from '../../utils/info.util'

export default class Info {

  private name = infoUtils.NAME
  private domain = infoUtils.DOMAIN
  private version = infoUtils.VERSION
  private port = infoUtils.PORT

  constructor(){
  }

  echo () {
    try {
      const { name, domain, version, port } = this
      return { name, domain, version, port }
    } catch (error) {
      return {
        error: true,
        message: error
      }
    }
  }

}

import FindClansService from "../services/FindClansService";


class getCharacters {

  async run() {
    try {
      const findClansService = new FindClansService()
      const { body = {} } = await findClansService.getCharacters()
      const { character = [] } = body

      if (!Array.isArray(character) || !character.length) {
        return {
          success: false,
          message: 'Characters is empty'
        }
      }



      // return response

    } catch (error) {
      return error
    }

    /* const requestService = new RequestService()
    const 

    const response = await requestService.request('GET', '') */
  }

}

new getCharacters()
  .run()
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => {
    console.log('exit')
  })

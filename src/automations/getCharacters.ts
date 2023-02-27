import FindClansService from '../services/FindClansService'
import CharacterDTO from '../dts/characterDT'
import CreateCharacter from '../modules/characters/useCases/createCharacter/CreateCharacter'


class getCharacters {

  async run() {
    try {
      const findClansService = new FindClansService()

      let characters = []
      const prismaResponse = []
      for (let page = 1; (page === 1 || characters.length); page++) {
        console.log(`Getting page ${page}...`)
        const { body = {} } = await findClansService.getCharacters(page)
        characters = body.characters || []

        if (!characters.length) continue

        const characterTransformed = CharacterDTO(characters)
        const createUserUseCase = new CreateCharacter()

        prismaResponse.push(await createUserUseCase.execute(characterTransformed))
      }

      console.log(`Prisma response ${JSON.stringify(prismaResponse)}...`)

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

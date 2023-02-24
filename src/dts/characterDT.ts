import { CharacterDTO } from "../modules/characters/dtos/CharacterDTO"

export default function dt(data: Array<any>): Array<CharacterDTO> {
  return data.map(el => {
    const { info } = el
    return {
      id: el.id,
      name: el.name,
      sex: info['Sexo'],
      birthday: info['Aniversário'],
      height: info['Altura'],
      weight: info['Peso'],
      bloodType: info['Tipo Sanguíneo'],
      ocupation: info['Ocupação'],
      afiliation: info['Afiliação'],
      patent: info['Patente Ninja'],
      register: info['Registro Ninja'],
      webpage: el.page,
    }
  })
}
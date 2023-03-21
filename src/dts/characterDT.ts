import { CharacterDTO } from "../domain/interfaces/Character/CharacterDTO"

export default function dt(data: Array<any>): Array<CharacterDTO> {
  return data.map(el => {
    const { info } = el
    return {
      name: el.name || '',
      status: info['Estado'],
      description: Array.isArray(el.about) ? el.about.join('\n') : '',
      sex: info['Sexo'] || '',
      birthday: info['Aniversário'] || '',
      height: info['Altura'] || '',
      weight: info['Peso'] || '',
      bloodType: info['Tipo Sanguíneo'] || '',
      ocupation: info['Ocupação'] || '',
      afiliation: info['Afiliação'] || '',
      patent: info['Patente Ninja'] || '',
      register: info['Registro Ninja'] || '',
      webpage: el.page || '',
      clanId: el.clanId || null
    }
  })
}
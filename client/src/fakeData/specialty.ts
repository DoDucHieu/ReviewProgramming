import { faker } from '@faker-js/faker'
import { SpecialtyType } from 'src/types'

export const SPECIALTY_DATA: SpecialtyType[] = []

for (let i = 0; i < 4; i++) {
  SPECIALTY_DATA.push({
    id: faker.random.number(),
    specialty_name: faker.internet.userName(),
  })
}

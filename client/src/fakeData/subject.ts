import { faker } from '@faker-js/faker'
import { SubjectType } from 'src/types'

export const SUBJECT_DATA: SubjectType[] = []

for (let i = 0; i < 6; i++) {
  SUBJECT_DATA.push({
    id: faker.random.number(),
    subject_name: faker.internet.userName(),
    specialty_id: faker.random.number(),
    credit_id: faker.random.number(),
  })
}

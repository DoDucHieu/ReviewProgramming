import { faker } from '@faker-js/faker'
import { ClassType } from 'src/types'

export const CLASS_DATA: ClassType[] = []

for (let i = 0; i < 20; i++) {
  CLASS_DATA.push({
    class_id: faker.internet.userName(),
    start_date: faker.date.past().toString(),
    max_number_students: faker.random.number(),
    current_number_students: faker.random.number(),
    user_id: faker.random.number(),
    subject_id: faker.random.number(),
    status: faker.random.boolean(),
  })
}

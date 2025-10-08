import type { QueryInterface } from "sequelize"

export async function up({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.bulkInsert('gyms', [
    { name: 'Sukhti Muay Thai & MMA', address: '527 Central Ave', city: 'Albany', state: 'NY', postal_code: '12206' }
  ])

  await queryInterface.bulkInsert('roles', [
    { name: 'admin' },
    { name: 'owner' },
    { name: 'member' }
  ])

  await queryInterface.bulkInsert('members', [
    { first_name: 'Michael', last_name: 'Curry', email: 'michaelcurry95@gmail.com', gym_id: 1, role_id: 1 },
    { first_name: 'Jeremy', last_name: 'Hunt', email: 'jeremy@sukhti.com', gym_id: 1, role_id: 2 },
    { first_name: 'Andrew', last_name: 'Peterson', email: 'andypete@yahoo.com', gym_id: 1, role_id: 3 }
  ])

  await queryInterface.bulkInsert('schedules', [
    { class_name: 'Capoeira', gym_id: 1, time_stare: '09:30', day: 'sunday', duration: 60 },
    { class_name: 'Muay Thai', gym_id: 1, time_stare: '10:30', day: 'sunday', duration: 60 },
    { class_name: 'Muay Thai', gym_id: 1, time_stare: '17:30', day: 'monday', duration: 60 },
    { class_name: 'Wrestling', gym_id: 1, time_stare: '18:30', day: 'monday', duration: 60 },
    { class_name: 'Sparring', gym_id: 1, time_stare: '17:30', day: 'tuesday', duration: 60 },
    { class_name: 'BJJ', gym_id: 1, time_stare: '18:30', day: 'tuesday', duration: 60 },
    { class_name: 'Capoiera', gym_id: 1, time_stare: '17:30', day: 'wednesday', duration: 60 },
    { class_name: 'Muay Thai', gym_id: 1, time_stare: '18:30', day: 'wednesday', duration: 60 },
    { class_name: 'BJJ', gym_id: 1, time_stare: '09:30', day: 'thursday', duration: 60 },
    { class_name: 'Muay Thai', gym_id: 1, time_stare: '10:30', day: 'thursday', duration: 60 },
    { class_name: 'Sparring', gym_id: 1, time_stare: '09:30', day: 'friday', duration: 60 },
    { class_name: 'Wrestling', gym_id: 1, time_stare: '10:30', day: 'friday', duration: 60 },
    { class_name: 'Capoiera', gym_id: 1, time_stare: '12:30', day: 'saturday', duration: 60 },
    { class_name: 'Muay Thai', gym_id: 1, time_stare: '13:30', day: 'saturday', duration: 60 },
  ])
}

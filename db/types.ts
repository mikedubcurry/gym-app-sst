import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely'

export interface Database {
  members: MembersTable
  gyms: GymsTable
  schedules: SchedulesTable
}

export interface MembersTable {
  id: Generated<number>
  first_name: string
  last_name: string
  email: string
  create_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, string>
  gym_id: number
  role_id: number
}

export type Member = Selectable<MembersTable>
export type NewMember = Insertable<MembersTable>
export type MemberUpdate = Updateable<MembersTable>

export interface GymsTable {
  id: Generated<number>
  name: string
  address: string
  city: string
  postal_code: string
  create_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, string>
}

export type Gym = Selectable<GymsTable>
export type NewGym = Insertable<GymsTable>
export type GymUpdate = Updateable<GymsTable>

export interface SchedulesTable {
  id: Generated<number>
  gym_id: number
  day: string
  time_start: string
  duration: number
  class: string
}

export type Schedule = Selectable<SchedulesTable>
export type NewSchedule = Insertable<SchedulesTable>
export type ScheduleUpdate = Updateable<SchedulesTable>

export interface RolesTable {
  id: Generated<number>
  name: string
}

export type Role = Selectable<RolesTable>


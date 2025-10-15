import { DataTypes, QueryInterface } from "sequelize"

export async function up({ context: q }: { context: QueryInterface }) {
  // members updates
  await q.addColumn('members', 'phone_number', { type: DataTypes.STRING })
  await q.addColumn('members', 'street_address', { type: DataTypes.STRING })
  await q.addColumn('members', 'city', { type: DataTypes.STRING })
  await q.addColumn('members', 'state', { type: DataTypes.STRING(2) })
  await q.addColumn('members', 'postal_code', { type: DataTypes.STRING(10) })
  await q.addColumn('members', 'prior_experience', { type: DataTypes.INTEGER })
  await q.addColumn('members', 'goals', { type: DataTypes.TEXT })

  // class table
  await q.createTable('classes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    class_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    gym_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "gyms",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    description: {
      type: DataTypes.TEXT,
    }
  })

  // schedules updates
  await q.removeColumn('schedules', 'duration')
  await q.addColumn('scheduels', 'time_end', { type: DataTypes.STRING(5) })
  await q.addColumn('schedules', 'class_id', {
    type: DataTypes.INTEGER,
    references: {
      model: 'classes',
      key: 'id'
    }
  })

  // gym_visits table
  await q.createTable('gym_visits', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    member_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'members',
        key: 'id'
      }
    },
    gym_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'gyms',
        key: 'id'
      }
    },
    class_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'classes',
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.TEXT
    }
  })
}

async function down ({ context: q }: { context: QueryInterface }) {
  await q.dropTable('gym_visits')
}

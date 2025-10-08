import { DataTypes, Sequelize } from "sequelize"

export async function up({ context: q }) {
  // ---- gyms ----
  await q.createTable("gyms", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(128),
    },
    city: {
      type: DataTypes.STRING(128),
    },
    state: {
      type: DataTypes.STRING(2),
    },
    postal_code: {
      type: DataTypes.STRING(10),
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  // ---- members ----
  await q.createTable("members", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
  });

  // ---- schedules ----
  await q.createTable("schedules", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    time_start: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // ---- roles ----
  await q.createTable("roles", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
  });

  // ---- alter members: add role_id ----
  await q.addColumn("members", "role_id", {
    type: DataTypes.INTEGER,
    references: {
      model: "roles",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  });
}

export async function down({ context: q }) {
  await q.removeColumn("members", "role_id");
  await q.dropTable("roles");
  await q.dropTable("schedules");
  await q.dropTable("members");
  await q.dropTable("gyms");
}

//export async function up({ context: queryInterface }) {
//  try {
//    await queryInterface.createTable('gyms', {
//      id: { type: 'integer', primaryKey: true, autoIncrement: true },
//      name: { type: 'varchar(128)', unique: true, allowNull: false },
//      address: { type: 'varchar(128)' },
//      city: { type: 'varchar(128)' },
//      state: { type: 'varchar(2)' },
//      postal_code: { type: 'varchar(10)' },
//      created_at: {
//        type: DataTypes.DATE,
//        allowNull: false,
//        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//      },
//      updated_at: {
//        type: DataTypes.DATE,
//        allowNull: false,
//        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
//      },
//    })
//
//    await queryInterface.createTable('members', {
//      
//    })
//  } catch (e) {
//    console.log('error: ', e)
//  }
//  await db.schema
//    .createTable('gyms')
//    .ifNotExists()
//    .addColumn('id', 'serial', col => col.primaryKey().autoIncrement())
//    .addColumn('name', 'varchar(128)', col => col.notNull().unique())
//    .addColumn('address', 'varchar(128)')
//    .addColumn('city', 'varchar(128)')
//    .addColumn('state', 'varchar(2)')
//    .addColumn('postal_code', 'varchar(10)')
//    .addColumn('created_at', 'timestamp', col =>
//      col.defaultTo(sql`now()`)
//    )
//    .execute()
//
//  await db.schema
//    .createTable('members')
//    .ifNotExists()
//    .addColumn('id', 'serial', col => col.primaryKey().autoIncrement())
//    .addColumn('first_name', 'varchar(64)', col => col.notNull())
//    .addColumn('last_name', 'varchar(64)', col => col.notNull())
//    .addColumn('email', 'varchar(64)', col => col.notNull().unique())
//    .addColumn('created_at', 'timestamp', col =>
//      col.defaultTo(sql`now()`)
//    )
//    .addColumn('gym_id', 'integer', col => col.references('gyms.id'))
//    .execute()
//
//  await db.schema
//    .createTable('schedules')
//    .ifNotExists()
//    .addColumn('id', 'serial', col => col.primaryKey().autoIncrement())
//    .addColumn('gym_id', 'integer', col => col.references('gyms.id'))
//    .addColumn('time_start', 'varchar(5)', col => col.notNull())
//    .addColumn('day', 'varchar(8)', col => col.notNull())
//    .addColumn('duration', 'integer', col => col.notNull())
//    .execute()
//
//  await db.schema
//    .createTable('roles')
//    .ifNotExists()
//    .addColumn('id', 'serial', col => col.primaryKey().autoIncrement())
//    .addColumn('name', 'varchar(64)', col => col.notNull().unique())
//    .execute()
//
//  await db.schema
//    .alterTable('members')
//    .addColumn('role_id', 'integer', col => col.references('roles.id'))
//    .execute()
//}

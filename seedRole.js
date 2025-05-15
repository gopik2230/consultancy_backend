const Role = require('./models/role');
const sequelize = require('./config/db');

const seedRoles = async () => {
  try {
    await sequelize.sync(); // Ensure tables exist

    const roles = [
      { id: 1, role_name: 'candidate' },
      { id: 2, role_name: 'client' },
      { id: 3, role_name: 'super_admin' },
    ];

    // Insert roles only if they don't exist
    for (const role of roles) {
      await Role.findOrCreate({
        where: { id: role.id },
        defaults: role,
      });
    }

    console.log('Roles seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed roles:', error);
    process.exit(1);
  }
};

seedRoles();

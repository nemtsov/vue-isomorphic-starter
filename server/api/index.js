const pool = require('../core/database').pool;

exports.getInfo = async function getInfo() {
  const { rows } = await pool.query(`
    SELECT table_schema, table_name
    FROM information_schema.tables;
  `);
  return rows[0];
};

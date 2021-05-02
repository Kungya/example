const createUser = (conn, fields) => {
  const { id, email, password, name } = fields;
  return conn.query("INSERT INTO users (id, email, passwd, name) VALUES(?,?,?,?)", [
    id,
    email,
    password,
    name,
  ]);
};

const findUser = (conn, field) => {
  const [column] = Object.keys(field);
  return conn.query(`SELECT ${column} FROM users WHERE ${column} = ?`, [field[column]]);
};

export default {
  createUser,
  findUser,
};

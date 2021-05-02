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
  return conn.query(`SELECT ${field} FROM users WHERE ${field} = ?`, [field]);
};

const passwordValidation = (password) => {
  const pattern1 = /[0-9]/;
  const pattern2 = /[a-zA-Z]/;

  if (!pattern1.test(password) || !pattern2.test(password) || password.length < 8) {
    return false;
  } else {
    return true;
  }
};

export default {
  createUser,
  findUser,
  passwordValidation,
};

const mysql2 = require("mysql2/promise");

const pool = mysql2.createPool({
  host: "localhost",
  user: "tester",
  password: "tester7",
  database: "main",
});

const signUp = async (req, res) => {
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    const { id, email, password, password2, name } = req.body;

    console.log(id, email, password, password2, name);

    if (!email) {
      return res.status(400).json({ message: "이메일 입력하세요" });
    }

    if (!password || !password2) {
      return res.status(400).json({ message: "비밀번호 입력하세요" });
    }

    if (password !== password2) {
      return res.status(400).json({ message: "비밀번호가 다릅니다. 비밀번호를 다시 입력하세요" });
    }

    if (!name) {
      return res.status(400).json({ message: "이름을 입력하세요" });
    }

    const [emailExists] = await connection.query("SELECT email FROM users WHERE email = ?", [
      email,
    ]);

    if (emailExists.length !== 0) {
      return res.status(409).json({ message: "이미 존재하는 이메일 입니다." });
    }

    const [idExists] = await connection.query("SELECT id FROM users WHERE id = ?", [id]);

    if (idExists.length !== 0) {
      return res.status(409).json({ message: "이미 존재하는 아이디 입니다." });
    }

    if (!passwordValidation(password)) {
      return res
        .status(400)
        .json({ message: "비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다." });
    }

    await connection.query("INSERT INTO users (id, email, passwd, name) VALUES(?,?,?,?)", [
      id,
      email,
      password,
      name,
    ]);

    return res.status(201).json({ message: "SUCCESS" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

const passwordValidation = (password) => {
  var pattern1 = /[0-9]/;
  var pattern2 = /[a-zA-Z]/;

  if (!pattern1.test(password) || !pattern2.test(password) || password.length < 8) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  signUp,
};

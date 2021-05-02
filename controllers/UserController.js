import pool from "../db/index.js";
import UserService from "../services/UserService.js";
import UserUtil from "../utils/UserUtil.js";

const signUp = async (req, res, next) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const { id, email, password, password2, name } = req.body;

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

    const [emailExists] = await UserService.findUser(conn, { email });

    if (emailExists) {
      return res.status(409).json({ message: "이미 존재하는 이메일 입니다." });
    }

    const [idExists] = await UserService.findUser(conn, { id });

    if (idExists) {
      return res.status(409).json({ message: "이미 존재하는 아이디 입니다." });
    }

    if (!UserUtil.passwordValidation(password)) {
      return res
        .status(400)
        .json({ message: "비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다." });
    }

    await UserService.createUser(conn, { id, email, password, name });

    return res.status(201).json({ message: "SUCCESS" });
  } catch (error) {
    console.log(error);
    next(error);
  } finally {
    if (conn) conn.end();
  }
};

export default {
  signUp,
};

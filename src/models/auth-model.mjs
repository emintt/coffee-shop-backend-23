import { promisePool } from "../utils/database.mjs";

const login = async (memberNum) => {
  try {
    // user_id is the member_number
    const sql = `SELECT user_id, password, user_level_id FROM Users
    WHERE user_id = ?`;
    const params = [memberNum];
    const result = await promisePool.query(sql, params);
    const [rows] = result;
    console.log('rows', rows);
    console.log('login, userfound', rows[0]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const loginAdmin = async (email) => {
  try {
    const sql = `SELECT user_id, email, password, user_level_id FROM Users
    WHERE email = ?`;
    const params = [email];
    const result = await promisePool.query(sql, params);
    const [rows] = result;
    console.log('rows', rows);
    console.log('login, userfound', rows[0]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};
export {login, loginAdmin};

import { promisePool } from "../utils/database.mjs";

/**
* Creates a new user in the database
*
* @param {object} user data
* @returns {number} - id of the inserted user in db
*/
const addUser = async (user) => {
  // user_level_id default 3
  try {
    const sql = `INSERT INTO Users (email, password, user_level_id)
                VALUES (?, ?, ?)`;
    // user level id defaults to 3 (normal user)
    const params = [user.email, user.password, 3];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// api/auth/register-admin
const addAdmin = async (user) => {
  // user_level_id default 2
  try {
    const sql = `INSERT INTO Users (email, password, user_level_id)
                VALUES (?, ?, ?)`;
    // user level id defaults to 2 (admin)
    const params = [user.email, user.password, 2];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {addUser, addAdmin};

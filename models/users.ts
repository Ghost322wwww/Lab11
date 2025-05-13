import * as db from '../helpers/database';

export const findByUsername = async (username: string) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const result = await db.run_query(query, [username]);

  console.log("DB query results：", result);

  return result;
};



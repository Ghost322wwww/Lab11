import * as db from '../helpers/database';

export const getById = async (id: any) => {
  let query = "SELECT * FROM articles WHERE id = ?";
  return await db.run_query(query, [id]);
};

export const getAll = async () => {
  let query = "SELECT * FROM articles;";
  return await db.run_query(query, null);
};

export const add = async (article: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(',');
  let param = keys.map(() => '?').join(',');
  let query = `INSERT INTO articles (${key}) VALUES (${param})`;

  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
};

export const CREATE_USER_TABLE_STATEMENT =
  "CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(75), email VARHCAR(75), password VARHCAR(75))";
export const CREATE_HEALTH_INFO_TABLE_STATEMENT =
  "CREATE TABLE IF NOT EXISTS health_info(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, gender VARCHAR(10), dateOfBirth VARCHAR(10), height VARCHAR(10), weight VARCHAR(10), FOREIGN KEY(user_id) REFERENCES user(user_id))";

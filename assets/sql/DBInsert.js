export const INSERT_INTO_USER_STATEMENT =
  "INSERT INTO user (name, email, password) VALUES (?,?,?)";
export const INSERT_INTO_HEALTH_INFO_STATEMENT =
  "INSERT INTO health_info (user_id, gender, dateOfBirth, height, weight) VALUES (?,?,?,?,?)";

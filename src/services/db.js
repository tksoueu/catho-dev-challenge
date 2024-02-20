import mysql from "mysql"

export const catho = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "senha",
  database: "catho"
})
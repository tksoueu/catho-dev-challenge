ALTER USER 'root'@'localhost' IDENTIFIED BY 'senha'; 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'senha';
ALTER USER 'host'@'localhost' IDENTIFIED BY 'senha'; 
ALTER USER 'host'@'localhost' IDENTIFIED WITH mysql_native_password BY 'senha';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS candidates (id VARCHAR(255) PRIMARY KEY, name TEXT NOT NULL, skills TEXT NOT NULL);
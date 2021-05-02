CREATE TABLE users
(
  id VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL, 
  passwd VARCHAR(100) NOT NULL,
  address VARCHAR(100) NULL,
  PRIMARY KEY (id, email) 
);

INSERT INTO users (id, email, name, passwd) VALUES ("test", "test@test.com","testname","testPW")
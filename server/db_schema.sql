-- if database already made run next line to delete it
-- DROP DATABASE pair_program;

CREATE DATABASE pair_program;

USE pair_program;

CREATE TABLE lobby (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at DATETIME,
  last_open DATETIME
);

CREATE TABLE challenge (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(20) NOT NULL UNIQUE,
  question text NOT NULL,
  tests text
);

CREATE TABLE lobby_challenge (
  lobby_id int NOT NULL,
  challenge_id int NOT NULL,
  complete TINYINT DEFAULT 0,
  editor_state TEXT,
  duration DOUBLE PRECISION,
  created_at DATETIME,
  last_open DATETIME,
  FOREIGN KEY (lobby_id) references lobby(id),
  FOREIGN KEY (challenge_id) references challenge(id),
  PRIMARY KEY (lobby_id, challenge_id)
);

CREATE INDEX idx_lobby_challenge on lobby_challenge (lobby_id, challenge_id);
CREATE INDEX idx_lobby on lobby_challenge (lobby_id);

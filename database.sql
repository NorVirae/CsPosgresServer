
CREATE DATABASE cyberspawns;

CREATE TABLE Address
(
  id       INTEGER NOT NULL,
  userId   uuid    NOT NULL,
  metamask TEXT    NULL    ,
  PRIMARY KEY (id)
);

CREATE TABLE Currencies
(
  id     uuid   NOT NULL,
  userId uuid   NOT NULL,
  cnd    DOUBLE PRECISION NULL,
  css    DOUBLE PRECISION NULL,
  cc     DOUBLE PRECISION NULL,
  PRIMARY KEY (id)
);

CREATE TABLE parts
(
	id     uuid	NOT NULL,
  name     VARCHAR(255) NULL,
  address  VARCHAR(255) NULL,
  class    VARCHAR(255) NULL,
  type    VARCHAR(255) NULL,
	PRIMARY KEY (id)
);


CREATE TABLE spawnFigures
(
  id     INTEGER NOT NULL,
  userId BIGINT NOT NULL,
  atlas  VARCHAR(255)  NULL,
  image  VARCHAR  NULL,
  model  VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE spawns
(
  spawnId  SERIAL  BIGINT NOT NULL,
  ownerId    uuid   NOT NULL,
  birthdate   DATE      NOT NULL,
  chain      VARCHAR  NOT NULL,
  level       INTEGER      NULL,
  class        VARCHAR     NULL,
  name          VARCHAR    NULL,
  parts      VARCHAR[]     NULL,
  breedcount   INTEGER     NULL,
  image       VARCHAR     NULL,

  PRIMARY KEY (spawnId)
);

CREATE TABLE stats
(
    id SERIAL NOT NULL ,
    moral INTEGER NULL,
    skill INTEGER NULL,
    health INTEGER NULL,
    speed INTEGER NULL,
    PRIMARY KEY (id)
)

CREATE TABLE tokens
(
  id     INTEGER NOT NULL,
  userId uuid    NOT NULL,
  token  VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users
(
  id         uuid    NOT NULL,
  username   VARCHAR NOT NULL,
  email      VARCHAR NULL    ,
  password   TEXT    NULL    ,
  role       VARCHAR NULL    ,
  image      TEXT    NULL    ,
  isVerified BOOLEAN NULL    ,
  PRIMARY KEY (id)
);

ALTER TABLE Currencies
  ADD CONSTRAINT FK_users_TO_Currencies
    FOREIGN KEY (userId)
    REFERENCES users (id);

ALTER TABLE tokens
  ADD CONSTRAINT FK_users_TO_tokens
    FOREIGN KEY (userId)
    REFERENCES users (id);

ALTER TABLE Address
  ADD CONSTRAINT FK_users_TO_Address
    FOREIGN KEY (userId)
    REFERENCES users (id);

ALTER TABLE spawnFigures
  ADD CONSTRAINT FK_spawns_TO_spawnFigures
    FOREIGN KEY (userId)
    REFERENCES spawns (spawnId);

ALTER TABLE spawns
  ADD CONSTRAINT FK_users_TO_spawns
    FOREIGN KEY (ownerId)
    REFERENCES users (id);

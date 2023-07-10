CREATE TABLE IF NOT EXISTS people (
    login varchar(64) CONSTRAINT pk_people PRIMARY KEY,
    people_type INTEGER,
    e_mail varchar(128),
    password varchar(128)
);

CREATE SEQUENCE seq_applications_id;

CREATE TABLE applications (
    id INTEGER DEFAULT nextval('seq_applications_id'),
    name VARCHAR(60),
    secret VARCHAR(60),
    callback_url VARCHAR(255),
    background VARCHAR(255),
    CONSTRAINT applications_pk PRIMARY KEY (id)
);

CREATE SEQUENCE seq_tokens_id;

CREATE TABLE tokens (
    id INTEGER DEFAULT nextval('seq_tokens_id'),
    token TEXT,
    expire_at TIMESTAMP,
    CONSTRAINT tokens_pk PRIMARY KEY (id)
);
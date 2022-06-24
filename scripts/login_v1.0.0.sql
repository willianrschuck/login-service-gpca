CREATE SEQUENCE seq_applications_id;

CREATE TABLE applications (
    id INTEGER DEFAULT nextval('seq_applications_id'),
    name VARCHAR(60),
    secret VARCHAR(60),
    callback_url VARCHAR(255),
    CONSTRAINT applications_pk PRIMARY KEY (id)
);
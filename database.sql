CREATE DATABASE schuelke;

--\c into schuelke

-- set uuid extension using 'create extension if not exists "uuid-ossp";'
CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  address VARCHAR(300) DEFAULT NULL,
  mobile VARCHAR(20) DEFAULT NULL,
  edu_background VARCHAR(255) DEFAULT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(3) DEFAULT NULL
);
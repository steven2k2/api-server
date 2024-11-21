CREATE TABLE clients
(
    client_id           SERIAL PRIMARY KEY,
    client_name         VARCHAR(50) NOT NULL,
    client_group        VARCHAR(50),
    email               VARCHAR(100) UNIQUE,
    mobile_number       VARCHAR(15),
    address_street      VARCHAR(100),
    address_city        VARCHAR(50),
    address_region      VARCHAR(50),
    address_postal_code VARCHAR(10),
    address_country     VARCHAR(50) DEFAULT 'Australia',
    created_at          TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);
-- Table structure for table `travel_logs`
--
CREATE TABLE travel_logs
(
    travel_id         SERIAL PRIMARY KEY,
    client_id         INT,
    travel_date       DATE          NOT NULL,
    start_address     VARCHAR(100)  NOT NULL,
    end_address       VARCHAR(100)  NOT NULL,
    distance_km       DECIMAL(5, 2) NOT NULL,
    travel_reason     VARCHAR(50),
    notes             TEXT,
    billing_period_id INT
);

-- Table structure for table `clients`
--

-- Table structure for table `billing_periods`
--
CREATE TABLE billing_periods
(
    period_id      SERIAL PRIMARY KEY,
    start_date     DATE NOT NULL,
    end_date       DATE NOT NULL,
    total_distance NUMERIC(6, 2) DEFAULT 0 CHECK (total_distance >= 0)
);

-- Table structure for table `users`
--
CREATE TABLE users
(
    user_id      SERIAL PRIMARY KEY,
    email        VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(50) NOT NULL,
    role         VARCHAR(20) DEFAULT 'user'
);

-- Insert data into billing_periods table
INSERT INTO billing_periods (start_date, end_date, total_distance)
VALUES ('2024-01-01', '2024-01-31', 350.75),
       ('2024-02-01', '2024-02-28', 420.50),
       ('2024-03-01', '2024-03-31', 390.25);

-- Insert data into users table
INSERT INTO users (email, display_name, role)
VALUES ('admin@digitalpathsnorway.no', 'Admin User', 'admin'),
       ('johannes.vik@digitalpathsnorway.no', 'Johannes Vik', 'user'),
       ('karin.holm@digitalpathsnorway.no', 'Karin Holm', 'user');

-- Insert data into travel_logs table
INSERT INTO travel_logs (client_id, travel_date, start_address, end_address, distance_km, travel_reason, notes, billing_period_id)
VALUES (1, '2024-01-10', 'Kirkegata 56, Oslo', 'Holbergs gate 13, Bergen', 120.50, 'Client Meeting', 'Met with client to discuss project requirements', 1),
       (2, '2024-01-15', 'Holbergs gate 13, Bergen', 'Storgata 25, Trondheim', 150.30, 'Consultation', 'On-site consulting for new product launch', 1),
       (3, '2024-02-05', 'Storgata 25, Trondheim', 'Kongens gate 81, Stavanger', 200.75, 'Installation', 'Installed new equipment at client premises', 2),
       (4, '2024-02-20', 'Kongens gate 81, Stavanger', 'Kirkegata 56, Oslo', 100.25, 'Maintenance', 'Performed routine maintenance check', 2),
       (1, '2024-03-12', 'Kirkegata 56, Oslo', 'Storgata 25, Trondheim', 180.00, 'Follow-up', 'Follow-up on previous consultation', 3);


CREATE TABLE gender_enum
(
    gender_id SERIAL PRIMARY KEY,
    gender    TEXT NOT NULL
);

-- Insert valid gender values
INSERT INTO gender_enum (gender)
VALUES ('Male'),
       ('Female'),
       ('Non-Binary'),
       ('Prefer not to say'),
       ('Other');

CREATE TABLE clients
(
    -- Identification fields
    client_id           SERIAL PRIMARY KEY,                 -- Unique identifier for the client
    client_name         TEXT NOT NULL,                      -- Name of the client

    -- Contact information
    email               TEXT NOT NULL,                      -- Email address of the client
    mobile_number       TEXT,                               -- Mobile phone number of the client
    address_street      TEXT,                               -- Street address
    address_city        TEXT,                               -- City of the address
    address_region      TEXT,                               -- Region or state of the address

    -- Personal details
    title               TEXT,                               -- Title, such as "Mr.", "Ms.", to be validated in the UI
    full_name           TEXT,                               -- Full name of the contact, including title
    given_name          TEXT,                               -- First name of the contact
    family_name         TEXT,                               -- Last name of the contact
    nickname            TEXT,                               -- Nickname of the contact
    gender              TEXT,                               -- Gender value (e.g., "Male", "Female")
    birthday            DATE,                               -- Birthday of the contact in yyyy-mm-dd format

    -- Professional and other details
    subject             TEXT,                               -- Subject or role associated with the contact
    occupation          TEXT,                               -- Occupation or job title
    billing_information TEXT,                               -- Billing information for the client
    directory_server    TEXT,                               -- Directory server associated with the contact

    -- Metadata
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when the contact was last updated
);

INSERT INTO clients (client_name, email, mobile_number, address_street, address_city, address_region,
                     title, full_name, given_name, family_name, nickname, gender, birthday,
                     subject, occupation, billing_information, directory_server)
VALUES ('Nordic Innovations AS', 'contact@nordicinnovations.no', '+47 923 45 678', 'Wessels gate 10', 'Trondheim', 'Trøndelag',
        'Mr.', 'Mr. Erik Johansen', 'Erik', 'Johansen', 'E.J.', 'Male', '1985-07-14',
        'Client Relations', 'Project Manager', 'Standard Billing', 'ldap://directory.nordicinnovations.no'),
       ('Viking Ventures AB', 'support@vikingventures.se', '+47 934 21 567', 'Sjøgata 25', 'Trondheim', 'Trøndelag',
        'Ms.', 'Ms. Lina Svensson', 'Lina', 'Svensson', 'Lina', 'Female', '1992-11-23',
        'Technology Consultant', 'IT Specialist', 'Premium Billing', 'ldap://directory.vikingventures.se'),
       ('ScandiTech Ltd.', 'info@scanditech.dk', '+47 940 88 321', 'Kongens gate 40', 'Trondheim', 'Trøndelag',
        'Dr.', 'Dr. Henrik Andersen', 'Henrik', 'Andersen', 'Henrik', 'Male', '1978-03-02',
        'Software Engineering', 'Lead Developer', 'Corporate Billing', 'ldap://directory.scanditech.dk'),
       ('Arctic Solutions Oy', 'hello@arcticsolutions.fi', '+47 978 56 432', 'Rosenkrantz gate 12', 'Trondheim', 'Trøndelag',
        'Mrs.', 'Mrs. Anja Lahtinen', 'Anja', 'Lahtinen', 'Annie', 'Female', '1980-06-15',
        'Client Services', 'Business Analyst', 'Standard Billing', 'ldap://directory.arcticsolutions.fi'),
       ('Digital Paths Norway', 'support@digitalpathsnorway.no', '+47 987 65 432', 'Wessels gate 181', 'Trondheim', 'Trøndelag',
        'Mr.', 'Mr. Lars Evensen', 'Lars', 'Evensen', 'Lasse', 'Male', '1990-08-10',
        'Web Development', 'Frontend Developer', 'Custom Billing', 'ldap://directory.digitalpathsnorway.no');
-- Create Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    role ENUM('system_admin', 'normal_user', 'store_owner') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_name (name)
);

-- Create Stores table
drop table stores;
CREATE TABLE stores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    owner_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_stores_name (name),
    INDEX idx_stores_email (email),
    INDEX idx_stores_owner (owner_id)
);

-- Create Ratings table
drop table ratings;
CREATE TABLE ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_store_rating (user_id, store_id),
    INDEX idx_ratings_store (store_id),
    INDEX idx_ratings_user (user_id),
    INDEX idx_ratings_rating (rating)
);

-- Create a view for store statistics
drop view store_stats;
CREATE VIEW store_stats AS
SELECT 
    s.id,
    s.name,
    s.email,
    s.address,
    s.owner_id,
    s.is_active,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(r.id) as total_ratings,
    s.created_at,
    s.updated_at
FROM stores s
LEFT JOIN ratings r ON s.id = r.store_id
GROUP BY s.id, s.name, s.email, s.address, s.owner_id, s.is_active, s.created_at, s.updated_at;

-- Create a view for dashboard statistics
CREATE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM users WHERE role = 'normal_user') as total_normal_users,
    (SELECT COUNT(*) FROM users WHERE role = 'store_owner') as total_store_owners,
    (SELECT COUNT(*) FROM users WHERE role = 'system_admin') as total_admin_users,
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM stores WHERE is_active = TRUE) as total_active_stores,
    (SELECT COUNT(*) FROM stores) as total_stores,
    (SELECT COUNT(*) FROM ratings) as total_ratings;

-- Insert sample data

-- Insert System Administrator
INSERT INTO users (name, email, password, address, role) VALUES 
('System Admin', 'admin@system.com', '$2b$10$hashedpassword1', '123 Admin Street, City, State', 'system_admin');

INSERT INTO users (name, email, password, address, role) VALUES 
('System Admin 5', 'admin5@system.com', '$2b$10$dERi2UFnYwQbDhuAgAF6ZeTXT9IzuwOMe/QzD3h8KTgFbt/kwhAIu', '123 Admin Street, City, State', 'system_admin');

	select * from users;
-- Insert Store Owners
INSERT INTO users (name, email, password, address, role) VALUES 
('John Store Owner', 'john@store1.com', '$2b$10$hashedpassword2', '456 Business Ave, City, State', 'store_owner'),
('Jane Store Owner', 'jane@store2.com', '$2b$10$hashedpassword3', '789 Commerce Blvd, City, State', 'store_owner');

-- Insert Normal Users
INSERT INTO users (name, email, password, address, role) VALUES 
('Alice Customer', 'alice@email.com', '$2b$10$hashedpassword4', '321 Customer Lane, City, State', 'normal_user'),
('Bob Customer', 'bob@email.com', '$2b$10$hashedpassword5', '654 User Road, City, State', 'normal_user'),
('Charlie Customer', 'charlie@email.com', '$2b$10$hashedpassword6', '987 Client Street, City, State', 'normal_user');

-- Insert Stores
INSERT INTO stores (name, email, address, owner_id) VALUES 
('Johns Electronics', 'contact@johnselectronics.com', '456 Business Ave, City, State', 2),
('Janes Fashion', 'info@janesfashion.com', '789 Commerce Blvd, City, State', 3);


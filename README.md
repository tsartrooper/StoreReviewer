# Store Rating System - Backend Database Setup

## Tech Stack

- **Frontend:** React  
- **Backend:** Node.js  
- **Database:** MySQL  

## Prerequisites

- Ensure that **MySQL server** is up and running.
- The schema supports multiple user types, store records, and a rating system with statistical views for reporting.

---

## 📦 Database Schema

### 1. Users Table

Handles all types of users: system admins, store owners, and normal users.

```sql
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
```
### 2.  Stores Table
Stores created and managed by store owners.
```sql
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
```

### 3. Ratings Table
Users can rate stores from 1 to 5. Each user can rate a store only once.
```sql
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
```

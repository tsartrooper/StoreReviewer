# Store Rating System - Backend Database Setup

## Tech Stack

- **Frontend:** React  
- **Backend:** Node.js  
- **Database:** MySQL  

## Prerequisites

- Ensure that **MySQL server** is up and running.
- The following database schema assumes the database is already created (e.g., `store_reviews_database`).
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

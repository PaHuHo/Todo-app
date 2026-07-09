# TodoList

A full-stack Todo List application built with **Laravel**, **React (Vite)** and **MySQL**.

## Tech Stack

### Backend
- Laravel
- PHP 8.3
- MySQL 8.4

### Frontend
- React
- Vite
- Axios

### DevOps
- Docker
- Docker Compose

---

# Project Structure

```
TodoList/
│
├── backend/          # Laravel Backend
├── frontend/         # React Frontend
├── docker/
│   ├── php/
│   │   └── Dockerfile
│   └── start.sh
├── docker-compose.yml
└── README.md
```

---

# Prerequisites

## Option 1 (Recommended)

Install:

- Docker Desktop
- Docker Compose

Check installation:

```bash
docker --version
docker compose version
```

---

## Option 2

Install manually:

- PHP 8.3+
- Composer
- NodeJS 20+
- npm
- MySQL 8.4+

---

# Run Project With Docker (Recommended)

### 1. Clone project

```bash
git clone project
cd Todo-app
```

### 2. Start project

```bash
docker compose up -d --build
```

The Docker container will automatically:

- Create `.env` from `.env.example` (if not exists)
- Install Composer dependencies
- Generate Laravel APP_KEY
- Run database migrations
- Start Laravel server
- Install React dependencies
- Start Vite development server

### 3. Open project

Frontend

```
http://localhost:5173
```

Backend API

```
http://localhost:8000
```

---

# Run Project Without Docker

## 1. Clone project

```bash
git clone project
cd Todo-app
```

---

## Backend

Go to backend folder

```bash
cd backend
```

Create file .env

```bash
cp .env.example .env
```

Install dependencies

```bash
composer install
```

Generate application key

```bash
php artisan key:generate
```

Configure database inside

```
backend/.env
```

Example

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_app
DB_USERNAME=root
DB_PASSWORD=
```

Run migration to create database

```bash
php artisan migrate
```

Start Laravel

```bash
php artisan serve
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## Frontend

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start React

```bash
npm run dev
```

Frontend runs at

```
http://127.0.0.1:5173
```

---

# Stop Docker

```bash
docker compose down
```

---

# Rebuild Docker

```bash
docker compose up -d --build
```

# Features

- Create task
- Complete task
- Delete task
- Clear task completed
- Filter tasks
- RESTful API
- Docker support

---

# License

This project is created for learning purposes.
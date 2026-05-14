# Nick's Pizza - Web App API

A REST API for managing menu items and orders for Nick's Pizza, built with Node.js, Express, and MySQL.

## Stack

- **OS:** Rocky Linux
- **Database:** MySQL
- **Backend:** Node.js + Express
- **Frontend:** React (port 3000)
- **Authentication:** Basic Auth with bcrypt password hashing
- **Logging:** Winston

## Running the App

### Start the API server
```bash
cd pizza_project
node server.js
```
Server runs on port `5000`.

### Start the React frontend
```bash
cd client
npm start
```
Frontend runs on `http://192.168.44.38:3000`

---

## Authentication

All endpoints except `/api/auth/register` require Basic Auth.

Include your username and password with every request using the `Authorization` header:
```
Authorization: Basic <base64 encoded username:password>
```

Or with curl use the `-u` flag:
```bash
curl http://192.168.44.38:5000/api/menu -u username:password
```

---

## API Endpoints

Base URL: `http://192.168.44.38:5000`

---

### Auth

#### Register a User
**POST** `/api/auth/register`
Auth required: No

Request body:
```json
{
  "username": "grace",
  "password": "password123"
}
```
Success (201):
```json
{
  "message": "User registered successfully",
  "user_id": 1
}
```
Errors:
- `400` — missing username or password
- `409` — username already taken

---

### Menu

#### Get All Menu Items
**GET** `/api/menu`
Auth required: Yes

Success (200):
```json
[
  {
    "id": 1,
    "name": "Cheese Pizza",
    "category": "Pizza",
    "description": "A large 8-slice pizza with lots of mozzarella.",
    "price": "15.00",
    "available": 1
  }
]
```

---

#### Get One Menu Item
**GET** `/api/menu/:id`
Auth required: Yes

Success (200):
```json
{
  "id": 1,
  "name": "Cheese Pizza",
  "category": "Pizza",
  "description": "A large 8-slice pizza with lots of mozzarella.",
  "price": "15.00",
  "available": 1
}
```
Errors:
- `404` — menu item not found

---

#### Add a Menu Item
**POST** `/api/menu`
Auth required: Yes

Request body:
```json
{
  "name": "BBQ Chicken Pizza",
  "category": "Pizza",
  "description": "Pizza with BBQ sauce and grilled chicken.",
  "price": 14.99,
  "available": 1
}
```
Success (201):
```json
{
  "id": 21,
  "name": "BBQ Chicken Pizza",
  "category": "Pizza",
  "description": "Pizza with BBQ sauce and grilled chicken.",
  "price": 14.99,
  "available": 1
}
```

---

#### Update a Menu Item
**PUT** `/api/menu/:id`
Auth required: Yes

Request body:
```json
{
  "name": "Cheese Pizza",
  "category": "Pizza",
  "description": "Updated description.",
  "price": 16.00,
  "available": 1
}
```
Success (200):
```json
{ "message": "Menu item updated" }
```
Errors:
- `404` — menu item not found

---

#### Delete a Menu Item
**DELETE** `/api/menu/:id`
Auth required: Yes

Success (200):
```json
{ "message": "Menu item deleted" }
```
Errors:
- `404` — menu item not found

---

### Orders

#### Get All Orders
**GET** `/api/orders`
Auth required: Yes

Success (200):
```json
[
  {
    "id": 1,
    "customer_name": "John",
    "status": "pending",
    "total_price": "32.99",
    "notes": null
  }
]
```

---

#### Get One Order
**GET** `/api/orders/:id`
Auth required: Yes

Success (200):
```json
{
  "id": 1,
  "customer_name": "John",
  "status": "pending",
  "total_price": "32.99",
  "notes": null,
  "items": [
    {
      "menu_item_id": 1,
      "quantity": 2,
      "name": "Cheese Pizza",
      "price": "15.00"
    }
  ]
}
```
Errors:
- `404` — order not found

---

#### Create an Order
**POST** `/api/orders`
Auth required: Yes

Request body:
```json
{
  "customer_name": "John",
  "notes": "Extra sauce please",
  "items": [
    { "menu_item_id": 1, "quantity": 2 }
  ]
}
```
Success (201):
```json
{
  "message": "Order created",
  "order_id": 1,
  "total_price": 30
}
```

---

#### Update an Order
**PUT** `/api/orders/:id`
Auth required: Yes

Request body:
```json
{
  "customer_name": "John",
  "status": "completed",
  "total_price": 30.00,
  "notes": "Extra sauce please"
}
```
Success (200):
```json
{ "message": "Order updated" }
```
Errors:
- `404` — order not found

---

#### Delete an Order
**DELETE** `/api/orders/:id`
Auth required: Yes

Success (200):
```json
{ "message": "Order deleted" }
```
Errors:
- `404` — order not found

---

## Database Schema

### users
| Column | Type | Notes |
|---|---|---|
| id | INT | Primary key, auto increment |
| username | VARCHAR(50) | Unique |
| password | VARCHAR(255) | Hashed with bcrypt |
| created_at | TIMESTAMP | Auto set on creation |

### menu_items
| Column | Type | Notes |
|---|---|---|
| id | INT | Primary key, auto increment |
| name | VARCHAR(100) | |
| category | VARCHAR(50) | |
| description | TEXT | |
| price | DECIMAL(10,2) | |
| available | TINYINT(1) | 1 = available, 0 = not |

### orders
| Column | Type | Notes |
|---|---|---|
| id | INT | Primary key, auto increment |
| customer_name | VARCHAR(100) | |
| status | VARCHAR(50) | pending, completed, cancelled |
| total_price | DECIMAL(10,2) | |
| notes | TEXT | Optional |

### order_items
| Column | Type | Notes |
|---|---|---|
| id | INT | Primary key, auto increment |
| order_id | INT | Foreign key → orders.id |
| menu_item_id | INT | Foreign key → menu_items.id |
| quantity | INT | |

---

## Logging

Every request is logged automatically to `requests.log` in the project folder and to the terminal.

Log format:
```
[timestamp] INFO: METHOD /endpoint | user: user_id
```

Example:
```
[2026-05-02T18:26:50.427Z] INFO: GET /api/menu | user: 1
```

---

## Team

| Name | Role |
|---|---|
| Chloe | Database |
| Kyle H | Frontend (React) |
| Kyle W | Backend (Node/Express) |
| Grace | Auth, Logging & Docs |




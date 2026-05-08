# Blogplatform Webalkalmazás

## Az alkalmazás felépítése

Ez egy teljes stack blogplatform alkalmazás, amely az alábbi technológiákra épül:

### Technológiák
- **Frontend:** React, Vite, Axios, React Router, SCSS, Moment.js, ReactQuill
- **Backend:** Node.js, Express.js
- **Adatbázis:** MySQL
- **Autentikáció:** JWT (JSON Web Token), bcryptjs
- **Konténerizáció:** Docker, Docker Compose

### Mappastruktúra
Weblap/
├── api/                    # Backend
│   ├── controllers/        # Üzleti logika
│   │   ├── auth.js         # Autentikáció
│   │   ├── comment.js      # Kommentek
│   │   └── post.js         # Posztok
│   ├── middleware/         # Köztes réteg
│   │   ├── validate.js     # Validáció
│   │   └── verifyToken.js  # JWT ellenőrzés
│   ├── routes/             # API útvonalak
│   │   ├── auth.js
│   │   ├── comments.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── tests/              # Automatizált tesztek
│   │   ├── auth.test.js
│   │   └── posts.test.js
│   ├── db.js               # Adatbázis kapcsolat
│   ├── index.js            # Szerver belépési pont
│   └── Dockerfile
├── client/                 # Frontend
│   ├── src/
│   │   ├── components/     # Újrafelhasználható komponensek
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── img/            # Képek
│   │   ├── Pages/          # Oldalak
│   │   │   ├── Home.jsx
│   │   │   ├── Single.jsx
│   │   │   ├── Write.jsx
│   │   │   ├── login.jsx
│   │   │   └── register.jsx
│   │   └── style.scss      # Globális stílusok
│   └── Dockerfile
├── docker-compose.yml
└── README.md

---

## Telepítési útmutató

### Követelmények
- Node.js (v18+)
- MySQL
- Docker (opcionális)

### Hagyományos telepítés

#### 1. Adatbázis beállítása
Hozd létre az adatbázist MySQL-ben:

```sql
CREATE DATABASE blog;

USE blog;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    img VARCHAR(255),
    isAdmin BOOLEAN DEFAULT 0
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    `desc` TEXT NOT NULL,
    img VARCHAR(255),
    date DATETIME NOT NULL,
    uid INT NOT NULL,
    cat VARCHAR(255),
    status VARCHAR(20) DEFAULT 'published'
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    uid INT NOT NULL,
    `desc` TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    edited DATETIME DEFAULT NULL
);
```

#### 2. Backend indítása
```bash
cd api
npm install
node index.js
```

#### 3. Frontend indítása
```bash
cd client
npm install
npm run dev
```

### Docker telepítés

```bash
docker-compose up --build
```

---

## Konfiguráció

### Backend (`api/db.js`)
```javascript
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yourpassword",
    database: "blog"
})
```

### JWT titkos kulcs (`api/controllers/auth.js`)
```javascript
const token = jwt.sign({ id, isAdmin }, "jwtSecretKey", { expiresIn: "1d" })
```

---

## API Végpontok

### Autentikáció (`/auth`)

| Metódus | Végpont | Leírás | Szükséges mezők |
|---------|---------|--------|-----------------|
| POST | `/auth/register` | Új felhasználó regisztrációja | `username`, `email`, `password` |
| POST | `/auth/login` | Bejelentkezés | `username`, `password` |
| POST | `/auth/logout` | Kijelentkezés | - |

### Posztok (`/posts`)

| Metódus | Végpont | Leírás | Auth szükséges |
|---------|---------|--------|----------------|
| GET | `/posts` | Összes poszt lekérése | Nem |
| GET | `/posts/:id` | Egy poszt lekérése | Nem |
| POST | `/posts` | Új poszt létrehozása | Igen |
| PUT | `/posts/:id` | Poszt szerkesztése | Igen |
| DELETE | `/posts/:id` | Poszt törlése | Igen |

### Kommentek (`/comments`)

| Metódus | Végpont | Leírás | Auth szükséges |
|---------|---------|--------|----------------|
| GET | `/comments/post/:postId` | Poszt kommentjeinek lekérése | Nem |
| POST | `/comments` | Új komment hozzáadása | Igen |
| PUT | `/comments/:id` | Komment szerkesztése | Igen |
| DELETE | `/comments/:id` | Komment törlése | Igen |

---

## Tesztek futtatása

```bash
cd api
npm test
```

### Tesztek leírása
- **auth.test.js** – Autentikációs végpontok tesztelése (regisztráció validáció, bejelentkezés validáció)
- **posts.test.js** – Poszt végpontok tesztelése (GET visszaad adatot, POST token nélkül 401-es hibát ad)

---

## Funkciók

### Alapfunkciók
- Bejegyzések listázása és megtekintése
- Kommentek hozzáadása, szerkesztése, törlése
- Felhasználói regisztráció és bejelentkezés
- Saját bejegyzések létrehozása és szerkesztése

### Admin funkciók
- Összes poszt és komment moderálása
- Bejegyzések törlése és szerkesztése
- _____________________________________________________
- |   Admin felhasználónév: admin                      |
- |   Admin jelszó: admin                              |
- -----------------------------------------------------

### Biztonsági funkciók
- JWT token alapú autentikáció
- Jelszó hashelés bcryptjs-sel
- Bemeneti validáció express-validator-ral
- HTTP-only cookie alapú token tárolás

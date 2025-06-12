# TP Inventory System

**TP Inventory System** — це веб-додаток для управління інвентарем та каталогом продуктів. Він побудований з використанням сучасного стеку технологій: Vite, React, TailwindCSS, Redux, Express, Socket.io та Docker. Проєкт має зручний UI, фільтрацію товарів, лічильник активних вкладок через WebSocket, і покриття тестами.

---

## 🔧 Технології

* **React 19** + **Vite** + **TailwindCSS** — фронтенд.
* **Redux Toolkit** — управління станом.
* **React Router v7** — маршрутизація.
* **Socket.io** — підрахунок активних сесій (вкладок).
* **Express** — серверна частина для обслуговування білду та WebSocket.
* **Docker** — контейнеризація проєкту.
* **Vitest** + **Testing Library** — юніт-тести компонентів та логіки.
* **Lucide-react** — сучасні іконки.

---

## 📁 Структура проєкту

```
inventory-app/
├── public/            # Зображення і мок-дані
├── server/            # Сервер на Express + Socket.io
├── src/               # Код додатку
│   ├── components/    # UI і Layout
│   ├── pages/         # Orders, Products, NotFound
│   ├── store/         # Redux логіка
│   ├── services/      # API, WebSocket
│   ├── hooks/         # Кастомні хуки
│   ├── utils/         # Форматери і константи
│   ├── tests/         # Тести Vitest
├── Dockerfile         # Docker інструкція
├── vite.config.js     # Налаштування Vite
└── README.md
```

---

## 🚀 Як запустити проєкт

### 🔹 1. Клонування

```bash
git clone https://github.com/petrynka/TP-Inventory-System.git
cd tp-inventory-system
```

### 🔹 2. Встановлення залежностей

```bash
npm install
```

> ⚠️ Якщо виникають помилки або конфлікти:

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### 🔹 3. Запуск у режимі розробки

```bash
npm run dev
```

> 🔁 Це одночасно запустить Vite (фронтенд) і Express сервер (бекенд).

Перевір у браузері: [http://localhost:3000](http://localhost:3000)

### 🔹 4. Білд додатку

```bash
npm run build
```

### 🔹 5. Запуск білду (серверна версія)

```bash
npm start
```

> Express обслуговує згенерований Vite білд зі `dist/` + WebSocket

---

## 🧪 Тестування

### 🔹 Запуск тестів у CLI

```bash
npm run test
```

### 🔹 Повний прогін

```bash
npm run test:run
```

---

## 🐳 Docker

### 🔹 Збірка Docker-образу

```bash
docker build -t inventory-app .
```

### 🔹 Запуск контейнера

```bash
docker run -p 3000:3000 inventory-app
```

### 🔹 Закриття контейнера

Знайти ID контейнера:

```bash
docker ps
```

Зупинити:

```bash
docker stop <container_id>
```

### 🔹 Закрити всі контейнери

```bash
docker stop $(docker ps -q)
```

### 🔹 Видалити всі контейнери

```bash
docker rm $(docker ps -aq)
```

---

## 🧹 Корисні npm команди

### 🔹 Видалити все й перевстановити залежності

```bash
rm -rf node_modules package-lock.json
npm install
```

### 🔹 Примусова установка з конфліктами

```bash
npm install --legacy-peer-deps
```

### 🔹 Очистити кеш

```bash
npm cache clean --force
```

---

## 📌 Особливості функціоналу

* **Orders** — перегляд усіх приходів з деталями: дата, сумарна ціна, товари.
* **Products** — фільтрація та список продуктів з іконками та типами.
* **WebSocket лічильник** — показує активні вкладки (через Socket.io).
* **UI компоненти** — створені власні кнопки, модальні вікна, селектори.
* **API** — мокані з `/public/mock`, легко змінити на бекенд.


## 🟢 Демо

[Відкрити додаток на Render](https://inventory-app-rt5g.onrender.com)

[Вихідний код на GitHub](https://github.com/petrynka/TP-Inventory-System#)

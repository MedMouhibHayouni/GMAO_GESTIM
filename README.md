# 🛠️ GMAO - Gestion de la Maintenance Assistée par Ordinateur

A powerful and modern web-based **Computerized Maintenance Management System (CMMS)** (GMAO in French) built for public institutions, municipalities, and enterprises to efficiently manage assets, maintenance operations, stock, and workflows.

> ⚙️ Built with **Angular 18**, **NestJS**, **PostgreSQL 17**, **JWT Auth**, **TypeORM**, **TailwindCSS**, and **GSAP Animations**.

---

## 🚀 Project Status

**In Progress 🚧**  
This project is currently under active development as a full-stack SaaS solution. We aim to deliver a scalable and secure GMAO application with modern UI/UX principles.

---

## 📦 Tech Stack

| Layer           | Technology                        |
|----------------|------------------------------------|
| Frontend       | Angular 18, GSAP, Tailwind CSS     |
| Backend        | NestJS, TypeORM, JWT Authentication|
| Database       | PostgreSQL 17                      |
| Styling        | TailwindCSS                        |
| Animation      | GSAP (GreenSock)                   |
| Deployment     | Docker (planned), Nginx            |
| Architecture   | REST API, Modular Clean Architecture|

---

## 📋 Key Features (Planned)

### 🎯 Core GMAO Modules
- ✅ Asset & Equipment Management
- ✅ Preventive & Corrective Maintenance
- ✅ Maintenance Planning & History
- ✅ Work Orders & Technician Dispatch
- ✅ Inventory & Spare Parts Stock
- ✅ Purchase Requests & Supplier Management
- ✅ Budget & Contract Monitoring

### 👤 User Management
- Multi-role Access: Admin, Technician, Storekeeper, Buyer, etc.
- Secure JWT-based Authentication
- Fine-grained Role/Permission control
- User Activity & Audit Logs

### 📊 Reporting & Analytics
- Real-time KPIs (MTTR, MTBF, Downtime)
- Custom Reports Export (PDF/Excel)
- Historical Maintenance Records
- Asset Lifecycle Costing

### 💡 Extra Features (in roadmap)
- 🔔 Notifications & Email Alerts
- 🌍 Multi-language UI (French & Arabic)
- 📱 Progressive Web App (PWA) support
- 🔒 Role-based Access with 2FA
- ☁️ Cloud-Ready Deployment (SaaS model)
- 🧠 AI-powered Predictive Maintenance (future)

---

## 🧪 Project Structure

```
gmao/
├── frontend/          # Angular 18 client app
│   ├── core/          # Auth, Interceptors, Services
│   └── features/      # Modules (dashboard, assets, etc.)
├── backend/           # NestJS server app
│   ├── src/
│   │   ├── auth/      # JWT Auth, Guards, Policies
│   │   ├── modules/   # Users, Assets, Work Orders, etc.
│   │   ├── common/    # DTOs, Pipes, Utils
├── database/
│   └── migrations/    # TypeORM migrations
```

---

## 🛠️ Installation (Dev Environment)

### 🔧 Prerequisites
- Node.js >= 18
- Angular CLI >= 18
- PostgreSQL >= 17
- NestJS CLI

### ⚙️ Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# configure DB connection in .env
npm run start:dev
```

### 🖥️ Frontend Setup
```bash
cd frontend
npm install
ng serve --open
```

---

## 📌 Roadmap

| Phase         | Tasks                                               | Status     |
|---------------|-----------------------------------------------------|------------|
| ✅ Phase 1    | Authentication (JWT), Admin Dashboard               | Complete   |
| 🚧 Phase 2    | Asset, Maintenance, and Stock Modules               | In Progress|
| ⏳ Phase 3    | Reporting, Role Management, Email Notifications     | Pending    |
| ⏳ Phase 4    | SaaS Tenant Support, Cloud Deployment               | Pending    |

---

## 💼 Intended Users

- ✅ Municipalities
- ✅ Maintenance Services
- ✅ Facility Managers
- ✅ Technicians & Engineers
- ✅ Public & Private Institutions

---

## 📄 License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE) for more details.

---

## 👨‍💻 Author

**Mohamed Mouhib Hayouni**  
- 🧑‍💻 Full Stack Developer & Data Scientist  
- 📫 [LinkedIn](https://linkedin.com) | [Email](mailto:your@email.com)

---

## 📷 Screenshots

*(Coming soon — UI still under construction)*

---

## 🌟 Contributions

Contributions are welcome! Feel free to fork the repo, suggest improvements, or open issues.

---

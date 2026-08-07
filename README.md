# 🏨 Smart Room Planner (SRP)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Licence](https://img.shields.io/badge/licence-MIT-green)

**Smart Room Planner** est une extension de navigateur + application web pour la gestion hôtelière.
Tableau de bord visuel pour suivre les chambres, les réservations, les check-in/check-out et le housekeeping en temps réel.

---

## ✨ Fonctionnalités

| Dashboard visuel | Grille des chambres avec code couleur, filtres et KPIs |
| Timeline | Mini-Gantt des réservations sur plusieurs jours |
| Check-in / Check-out | Actions rapides en un clic |
| Housekeeping | Suivi du nettoyage des chambres |
| Notifications | Alertes intelligentes pour check-in imminent, chambres à nettoyer |
| Multi-rôle | Réception · Manager · Housekeeping |
| Responsive | PWA mobile + extension navigateur + interface desktop |

---

## 📦 Structure

```text
smart-room-planner/
├── apps/
│   ├── web/          ← React + Vite + Tailwind + TypeScript (dashboard PWA)
│   ├── extension/    ← Extension Chrome Manifest V3 (popup + quick actions)
│   └── api/          ← Node.js + Express + TypeScript (API REST + WebSocket)
├── packages/
│   ├── types/        ← Types partagés (modèles, énumérations, DTOs)
│   ├── config/       ← Configs TypeScript / ESLint partagées
│   └── ui/           ← Composants UI réutilisables
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
pnpm install

# Lancer le dashboard en dev
pnpm dev:web

# Lancer l'API en dev
pnpm dev:api

# Build complet
pnpm build
```

## 🎨 Statuts des chambres

| Couleur | Statut |
|---|---|
| 🟢 Vert | Disponible |
| 🔴 Rouge | Occupée |
| 🟡 Jaune | Réservée (check-in prévu) |
| 🔵 Bleu | En nettoyage |
| ⚪ Gris | Hors service |

## 🔧 Stack technique

| Couche | Technologies |
|---|---|
| **Web** | React 18, Tailwind CSS 3, TypeScript, Vite |
| **Extension** | Manifest V3, React, TypeScript |
| **API** | Node.js, Express, TypeScript |
| **Base de données** | PostgreSQL (via Supabase) |
| **Temps réel** | WebSocket (ws) |
| **État** | Zustand + TanStack Query |
| **Monorepo** | pnpm workspaces + Turborepo |

## 📋 MVP (Phase 1)

- [x] Types partagés
- [x] Dashboard avec grille des chambres
- [x] Filtres (étage, type, statut)
- [x] KPIs (occupation, arrivées, départs, ménage)
- [x] Timeline des réservations
- [x] Check-in / Check-out
- [x] Gestion du housekeeping
- [x] Extension Chrome (popup d'alertes)
- [ ] Authentification & rôles
- [ ] API connectée à la base
- [ ] Synchronisation calendrier
- [ ] Intégrations Channel Manager

## 📄 Licence

MIT — © 2026 Smart Room Planner
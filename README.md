# 🛰️ Star Wars Rebels Alliance Search System

## Installation

```sh
git clone https://github.com/OzakIOne/SWTS.git
cd SWTS
docker compose up -d --build
```

### Stack

- **Backend** : Hono + TypeScript
- **Frontend** : React + TypeScript + Tanstack Query/Form/Router(Start)/Pacer/Virtual
- **Tests** : Vitest
- **Styles** : DaisyUI / Tailwind CSS
- **State Management** : In URL
- **Authentification** : Basique (optionnel)

### Choix techniques

- **Hono** : Léger et performant pour les APIs
- **Tanstack Query/Form/Router** : Gestion avancée des requêtes et formulaires merci tanstack
- **Pacer** : Pour la pagination et le chargement des données merci tanstack
- **Virtual** : Pour le rendu performant des listes merci tanstack
- **DaisyUI / Tailwind CSS** : Styles rapides et adaptables
- **Vitest** : Tests unitaires et d'intégration simples
- **In URL** : Gestion de l'état sans Redux ou Context API, simplifiant la navigation et le partage d'URL

### Amelioration possible

- Ajouter des frontend
- Ajouter une vrai authentification
- Base de donnees avec kysely / drizzle
- Utiliser le backend de tanstack start
- Utiliser la lib de composant headless ark ui
- Si gestion complexe de state envisager xstate
- arktype au lieu de zod

## 🗂️ Modalités

- **Langages / frameworks obligatoires** :
  - Backend : **Node.js + TypeScript**
  - Frontend : **ReactJS + TypeScript**
  - Appels réseau avec : **React Query**
- **Livrables attendus** :
  - Un repo GitHub contenant :
    - `frontend/` et `backend/` clairement séparés
    - Un fichier `README.md` avec :
      - Instructions pour installer et lancer le projet
      - Explication des choix techniques
      - Améliorations possibles

---

## 🧱 Backend

### Backend Fonctionnalités obligatoires

- Implémenter un **endpoint de recherche unique** :
  - Il interroge **toutes les catégories** de SWAPI (`people`, `starships`, `planets`, etc.)
  - Le backend **agrège et filtre** les résultats
  - L’API doit être conçue pour être **extensible** (architecture claire : services / routes / contrôleurs)

### Backend Bonnes pratiques à respecter

- Utiliser `async/await` et bien gérer les erreurs (try/catch)
- Organisation modulaire et typée (`types/`, `interfaces/`, `services/`, etc.)
- Renvoyer des codes HTTP clairs (`200`, `400`, `500`…)

### Backend Bonus (Optionnels mais fortement valorisés)

- 🔐 Mise en place d’un système d’authentification (basique) :
  - Identifiants fixes :
    - username : `Luke`
    - password : `DadSucks`
  - Création d’un middleware pour protéger l’endpoint de recherche
- 🔄 Utilisation du framework [Hapi.js](https://hapi.dev/)

---

## 🧑‍🚀 Frontend

### Frontend Fonctionnalités obligatoires

- Champ de recherche permettant d’interroger le backend
- Appels réseau gérés **avec `react-query`**
- Affichage en **liste des résultats** avec leurs noms
- **Fiche détaillée** sur clic d’un résultat, affichant les infos principales

### Frontend Bonnes pratiques à respecter

- Structure React modulaire (composants, hooks, services API)
- État de chargement (`loading`), vide (`no results`) et erreurs réseau
- Utilisation de `useState`, `useEffect`, `useQuery` de React Query

---

## Frontend Bonus (Optionnels mais fortement appréciés)

| Thème | Description |
|-------|-------------|
| 🎨 Fiches détaillées | Affichage différent selon le type de donnée (personnage, vaisseau...) |
| 🧭 Router React | Navigation entre pages de fiche ou résultat de recherche (`react-router-dom`) |
| 🧪 Tests unitaires | 1 ou 2 tests simples (ex. fonction de parsing) avec Jest ou équivalent |
| 🧼 CSS modules ou Tailwind | Structuration propre des styles CSS |
| 📦 Redux ou gestion globale de l'état | Si justifié dans l'architecture |
| 🔁 Debounce sur le champ de recherche | Pour limiter les appels réseau |
| 🔍 Filtres par type de résultat | Séparer par type : personnages, vaisseaux, planètes... |
| 🔐 Authentification frontend | Ajout de token à l’appel d’API, redirection si non connecté |
| 📱 Responsive design | Design qui s’adapte au moins aux tailles classiques (mobile, tablette) |
| 🚀 Déploiement en ligne | Mettre le frontend sur Vercel / Netlify et backend sur Render / Railway… |
| 📋 **React Hook Form** | Gestion propre du champ de recherche via [React Hook Form](https://react-hook-form.com/) |

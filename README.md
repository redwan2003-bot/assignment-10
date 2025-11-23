# MovieMaster Pro

**Live Site:** [https://moviemaster-pro.web.app](https://moviemaster-pro.web.app) (Example URL)

MovieMaster Pro is a comprehensive movie management system where users can browse, manage, and organize their favorite movies with advanced filtering and personal collections.

## Key Features

*   **Comprehensive Movie Database**: Browse a vast collection of movies with details like cast, director, and plot summaries.
*   **Advanced Filtering & Search**: Find movies easily by searching titles or filtering by multiple genres and rating ranges.
*   **Personal Collection**: Create an account to add movies to your own private collection and manage them.
*   **Secure Authentication**: robust login and registration system using Firebase Auth (Email/Password & Google).
*   **Responsive & Themed UI**: A beautiful, fully responsive interface with a seamless Dark/Light mode toggle.

## Technologies Used

*   **Frontend**: React, Vite, Tailwind CSS, DaisyUI
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB
*   **Authentication**: Firebase

## Run Locally

1.  Clone the repository.
2.  **Server**:
    *   `cd server`
    *   `npm install`
    *   Create `.env` with `MONGODB_URI`.
    *   `npm start`
3.  **Client**:
    *   `cd client`
    *   `npm install`
    *   Create `.env` with Firebase config.
    *   `npm run dev`

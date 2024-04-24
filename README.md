# Weather Dashboard Application

This is a weather dashboard application built with Next.js and Firebase Authentication. It allows users to sign in using GitHub and view weather information for Calgary.

## Features

- GitHub Authentication using Firebase
- Weather information fetched from an open-source API
- Responsive design using Tailwind CSS

## Getting Started

To get started with this project, clone the repo to your local machine and install the required dependencies.

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone <Link to this repository>
    ```

2. Navigate to the project directory:
    ```bash
    cd your-repo
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```
    
### Live Demo
https://weather-dash-board-9zwc.vercel.app/


### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:
    
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
    ```
Replace `your-firebase-...` with your actual Firebase configuration values.

### Running the Application

To run the application in development mode, execute:
    
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:3000`.

## Usage

To use the application, sign in using your GitHub account and view the weather information for Calgary.

## Deployment

To deploy the application, you can use Vercel, Netlify, or any other platform that supports Next.js.

## Built With

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenMeteo API](https://open-meteo.com/)



# Team Management (HR System)

## Overview

Team Management is an HR-focused application designed to streamline employee management, track performance, and handle HR-related tasks efficiently. The project leverages modern technologies to provide a robust and scalable system.

## Tech Stack

- **Database:** Neon (PostgreSQL)
- **ORM:** Drizzle
- **State Management:** Zustand
- **Data Fetching:** React Query
- **Form Handling:** React Hook Form, Zod
- **Authentication:** Clerk
- **Visualization:** Chart.js
- **Framework:** Next.js (with TypeScript)

## Features

- **Attendance Tracking** using Chart.js visualizations.
- **Secure Database Handling** using Neon and Drizzle ORM.
- **Efficient State Management** with Zustand.
- **Robust Form Validation** using React Hook Form and Zod.

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- PostgreSQL (Neon as the cloud provider)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Orazhn/team-management.git
   ```
2. Navigate to the project directory:
   ```sh
   cd team-management
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file and configure the required keys (Clerk, Neon, Drizzle, etc.). Example:
   ```sh
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_NEON_DATABASE_URL="your-neon-database-url"
   ```
5. Run database migrations:
   ```sh
   npx drizzle-kit migrate
   ```
6. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- Access the application via `http://localhost:3000`.
- Sign in using Clerk authentication.
- Manage employees, track performance, and view reports.

# CodeBinX Backend

This is the backend server for CodeBinX, a modern alternative to Pastebin/Sourcebin. It provides a RESTful API for managing users, authentication, and "bins" (pastes of text or code).

## Features

* **User Authentication & Management:**
    * Local user registration (username, email, password) and login.
    * Google OAuth 2.0 for seamless sign-in.
    * JWT-based authentication for secure sessions.
    * Password hashing using `bcryptjs` for user credentials and optional bin protection.
    * User profile retrieval and updates (username, email).
    * Ability for users to retrieve their statistics (total bins, views, etc.).
    * Secure account deletion with password verification, including deletion of associated bins.
* **Bin (Paste) Management:**
    * Create new bins with title, content, description, syntax language, and privacy settings.
    * Support for anonymous bins and bins linked to registered users.
    * Secure bins with an optional password.
    * Retrieve bins using a unique, short ID (e.g., `xF3SAOMY9i`).
    * Tracking of bin view counts.
    * Automatic expiration of bins with a configurable default lifetime.
    * Scheduled cleanup job for deleting expired bins.
    * Authenticated users can list, update, and delete their own bins.
    * Endpoint to check if a bin is password-protected before attempting to view.
* **API & Server:**
    * Robust error handling middleware.
    * Request validation for all critical endpoints.
    * Security enhancements: `helmet` for headers, `compression` for responses, CORS policy, and rate limiting.
    * HTTP request logging with `morgan`.
    * File-based logging for application events and errors.
    * Health check endpoint.
    * Graceful shutdown and database connection management.

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** Passport.js (JWT & Google OAuth 2.0 strategies)
* **Password Hashing:** `bcryptjs`
* **Validation:** `express-validator`
* **Unique IDs:** `nanoid` (for Bin IDs)
* **Scheduled Jobs:** `node-cron`
* **Security Middleware:** `helmet`, `express-rate-limit`
* **Utility Middleware:** `cors`, `compression`, `morgan`
* **Environment Variables:** `dotenv`

## Project Structure

The backend code is organized within the `src/` directory as follows:

* `src/api/`: (Not explicitly used in uploaded files, but was part of previous discussions - if routes and controllers are here, adjust)
* `src/config/`: Database connection, Passport.js strategies, etc.
* `src/controllers/`: Request handlers for different routes (auth, bins, users).
* `src/middleware/`: Custom Express middleware (authentication, error handling, not found, validation).
* `src/models/`: Mongoose models for database schemas (User, Bin).
* `src/routes/`: Express route definitions (auth, bins, users).
* `src/services/`: Business logic layer (authService, binService).
* `src/types/`: TypeScript type definitions and interfaces (user, bin).
* `src/utils/`: Utility functions (logger, cleanup job).
* `src/server.ts`: Main application entry point, server setup.

## API Endpoints

All API routes are prefixed with `/api`.

### Health Check
* `GET /health`: Returns the server's operational status.

### Authentication (`/auth`)
* `POST /register`: Register a new user.
* `POST /login`: Log in an existing user.
* `GET /google`: Initiate Google OAuth 2.0 authentication.
* `GET /google/callback`: Callback URL for Google OAuth 2.0.
* `GET /profile`: Get the profile of the currently authenticated user.

### Bins (`/bins`)
* `POST /`: Create a new bin. (Authentication is optional)
* `GET /user/bins`: Get all bins created by the authenticated user (paginated).
* `GET /:binId`: Retrieve a specific bin by its ID. (Authentication is optional)
* `POST /:binId`: Retrieve a password-protected bin by its ID (expects password in request body). (Authentication is optional)
* `GET /:binId/check-password`: Check if a specific bin requires a password.
* `PUT /:binId`: Update a bin owned by the authenticated user.
* `DELETE /:binId`: Delete a bin owned by the authenticated user.

### Users (`/users`)
* `PUT /profile`: Update the profile of the authenticated user.
* `GET /stats`: Get statistics for the authenticated user.
* `DELETE /account`: Delete the account of the authenticated user (requires password verification).

## Environment Variables

Create a `.env` file in the `backend/` root directory based on `.env.example` (you'll need to create this example file).

* `PORT`: The port the server will listen on (Default: `3000`).
* `MONGODB_URI`: Your MongoDB connection string (Default: `mongodb://localhost:27017/codebinx`).
* `JWT_SECRET`: Secret key for signing JWTs (Required, e.g., a long random string, Default: `fallback-secret`).
* `JWT_EXPIRES_IN`: Expiration time for JWTs (e.g., `1h`, `7d`, Default: `7d`).
* `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID (Required for Google login).
* `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret (Required for Google login).
* `CORS_ORIGIN`: The origin URL for your frontend application (Default: `http://localhost:3000` or your frontend dev server e.g. `http://localhost:5173`).
* `RATE_LIMIT_WINDOW_MS`: Time window for rate limiting in milliseconds (Default: `900000` - 15 minutes).
* `RATE_LIMIT_MAX_REQUESTS`: Maximum requests allowed per IP within the rate limit window (Default: `100`).
* `NODE_ENV`: Application environment (e.g., `development`, `production`). Impacts error details and logging.
* `MAX_BIN_SIZE`: Maximum allowed size for a bin's content in bytes (Default: `1048576` - 1MB).
* `DEFAULT_BIN_EXPIRY_DAYS`: Default number of days after which a bin expires (Default: `30`).

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone github.com/dewstouh/codebinx
    cd codebinx/backend
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or
    # yarn install
    ```

3.  **Set up environment variables:**
    * Create a `.env` file in the `backend/` directory.
    * Copy the environment variables listed above into your `.env` file and provide the appropriate values.
    * Make sure you have a MongoDB instance running and accessible.

4.  **Create logs directory (if using the provided Logger):**
    ```bash
    mkdir logs
    ```
    The logger in `src/utils/logger.ts` writes to `backend/logs/app.log`.

## Running the Application

### Development Mode
Uses `nodemon` for live reloading and `ts-node` with `tsconfig-paths` to execute TypeScript directly and resolve path aliases.
```bash
npm run dev
# This typically uses a script like:
# "dev": "nodemon --exec ts-node -r tsconfig-paths/register src/server.ts"
# or "dev": "nodemon" if nodemon.json is configured.
```
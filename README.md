# Expense Tracker Backend

A simple backend API to track your daily expenses. Built this using Node.js, Express, and TypeScript with MongoDB.

I tried to follow OOP principles here, separating the logic into Controllers, Services, and Schemas to keep things clean.

## How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env` file in the root and add your MongoDB URL:
    ```env
    MONGODB_URL=your_mongodb_connection_string
    PORT=4000
    ```

3.  **Start Server:**
    ```bash
    npm run dev
    ```
    The server runs on `http://localhost:4000`.

## API Endpoints

-   **Get All Expenses**: `GET /api/expenses`
-   **Add Expense**: `POST /api/expenses`
    ```json
    {
      "title": "Coffee",
      "description": "Starbucks run",
      "amount": 5
    }
    ```
-   **Get Single Expense**: `GET /api/expenses/:id` (uses SrNo)
-   **Update Expense**: `PATCH /api/expenses/:id`
-   **Delete Expense**: `DELETE /api/expenses/:id`

## Project Structure

-   `src/controllers`: Handles the request/response logic.
-   `src/services`: Contains the business logic and database queries.
-   `src/schema`: Mongoose models.

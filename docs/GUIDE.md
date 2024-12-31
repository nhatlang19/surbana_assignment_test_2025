
## Local Environment Setup

Follow these steps to set up the project on your local machine:

### Prerequisites

Ensure you have the following installed:

-   **Node.js** (v14.x or later)
-   **NestJS CLI** – install globally using:
    
    `npm install -g @nestjs/cli`
    
-   **PostgreSQL** – make sure PostgreSQL is installed and running locally, or have access to a PostgreSQL instance. [Install PostgreSQL](https://www.postgresql.org/download/)

### Installation Steps

1.  **Clone the repository:**
    
    `git clone git@github.com:nhatlang19/surbana_assignment_test_2025.git`
    
2.  **Install dependencies:** Run the following command to install all required Node.js modules:
    
    `npm install` 
    
3.  **Set up the PostgreSQL database:**
    
    -   Create a new PostgreSQL database for the project (e.g., `location_db`).
    -   Note the database credentials (host, port, username, password, and database name).

4.  **Configure environment variables:** Create a `.env` file in the project root, and add the necessary environment variables for your PostgreSQL setup. Example:

    ```DATABASE_HOST=localhost
        DATABASE_PORT=5432
        DATABASE_USER=your_db_user
        DATABASE_PASSWORD=your_db_password
        DATABASE_NAME=location_db
    
6.  **Run seed data**

    `npm run db-seed -- seed` 
    
7.  **Start the development server:** After successfully setting up the database and installing the dependencies, run the NestJS development server:

    `npm run start:dev`
    
    This will start the application at http://localhost:3000.
    

### Testing the API

1.  **Swagger Documentation:**

    `http://localhost:3000/api` 
    
    
2.  **API Requests:**
    
    -   **Get All Locations:**
        
        `GET /locations` 
        
    -   **Create Location:**
        
        `POST /locations
        {
          "name": "Building A",
          "location_number": "A-01",
          "area": 100.5
        }` 
        
3.  **Running Tests:**
    
    `npm run test` 

# Information Retrieval Search Engine with Lucene

Welcome to the Information Retrieval Search Engine project. This full-stack application enables users to perform full-text searches on a substantial dataset of movie records. Leveraging the powerful Lucene search capabilities through MongoDB Atlas's full-text search index, this search engine offers quick and relevant results, complete with scoring based on query relevance.

## Key Features:

- Robust full-text search on over 52,000 movie records.
- Relevance scoring for search results, ensuring users receive the most pertinent results first.
- Utilization of MongoDB Atlas's full-text search index, enhancing the search functionality with the power of Lucene.

## Technical Stack:

- **Frontend**: React
- **Backend**: Node.js
- **Database**: MongoDB Atlas with Lucene indexing

## Setup and Run:

To get the search engine up and running on your local machine, follow the setup instructions below for both backend and frontend components.

### Backend:

1. Clone the repository.
2. Navigate to the backend directory and install dependencies with `npm install`.
3. Set up the MongoDB Atlas URI in the `.env` file.
4. Start the server using `npm start`.

### Frontend:

1. Navigate to the frontend directory from the root of the project.
2. Install the necessary dependencies with `npm install`.
3. Start the React app with `npm start`. The app should now be accessible on `http://localhost:3000`.

## Using the Search Engine:

With the application running, enter your search terms into the search bar. The engine will return a list of movies from the database that match your query, ranked by their relevance scores.

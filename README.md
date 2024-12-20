# Smart Notes Backend

 A robust backend system designed to process, analyze, and manage notes, attachments, and AI-powered document summarization. This project demonstrates clean architecture, scalability, and maintainable code, using TypeScript, Node Js, Express Js, and MongoDB database.

The API supports advanced AI integrations, such as OCR and text summarization, while adhering to best practices in software design and development.

## Features

- **Notes Management:** Create, retrieve, and delete notes.
- **Attachments Handling:** Upload and manage attachments with proper file validation.
- **AI Summarization:** Use GPT to summarize large documents.
- **OCR Integration:** Extract text from images or scanned documents.
- **Scalable Architecture:** Built using SOLID principles and separation of concerns.
- **Rate Limiting:** Protect AI APIs with advanced rate-limiting mechanisms.
- **Logging:** Centralized logging system for debugging and monitoring.
- **Environment Management:** Flexible configuration for different environments (development, production).

## Backend Architecture  

The system is designed with a modular and scalable architecture, consisting of the following components:  

1. **API Gateway**  
   - Centralized entry for all requests, handling routing, authentication, rate limiting, and validation.  

2. **Node.js Server**  
   - Core business logic with RESTful endpoints:  
     - `/api/v1/notes` for managing notes.  
     - `/api/v1/attachments` for file handling.  
     - `/api/v1/ai` for AI-powered processing.  

3. **Middleware Layer**  
   - Includes rate limiting, input validation, and error handling for API reliability and security.  

4. **Database Layer**  
   - MongoDB for storing notes, metadata, tags, and attachment references with efficient querying.  

5. **File Storage**  
   - Local storage for uploaded files, with extensibility for cloud storage integration.  

6. **AI Integration**  
   - Uses OpenAI API for OCR, text summarization, and structured data extraction.  

7. **Client Layer**  
   - External clients interacting with the API for creating notes, uploading files, and AI processing.  

8. **Logging and Monitoring**  
   - Centralized logging and performance monitoring for debugging and reliability.  

![System Architecture Diagram](https://drive.google.com/uc?export=download&id=1rg5cO5AtdOOnqL3OkiUT0-IZNdwCW4AP)

## 3. Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aviroopjana/smart-notes-backend.git
   cd Induced-AI-Backend-SDE

2. **Install Dependencies**
    ```bash
    npm install

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory with the following content:

   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/induced-ai
   OPENAI_API_KEY=your-openai-api-key
   FILE_STORAGE_PATH=uploads
   ```
    Or

   An example `.env.example` file for reference:

   ```plaintext
   PORT=3000                # The port number where the app will run
   MONGO_URI=               # Your MongoDB connection string
   OPENAI_API_KEY=          # OpenAI API key for GPT integration
   FILE_STORAGE_PATH=       # Directory path for storing uploaded files (defaults to 'uploads')
   ```
    1. Copy `.env.example` to a new file named `.env`.
    2. Replace placeholder values with your actual credentials and configuration.
    3. Save changes and run the application.


4. **Run the Project**

   For Development Mode:
   ```bash
   npm run dev
   ```

   For Production Mode:
   ```bash
   npm run build && npm start
   ```

5. **Access the Application**
   Open your browser and visit:

   ```arduino
   http://localhost:3000
   ```


### **4. Usage**

### API Endpoints

- **Notes API** (`/api/v1/notes`):
  - `POST /` - Create a new note.
  - `GET /` - Retrieve all notes.
  - `GET /:id` - Retrieve specific notes based on Id.
  - `PUT /:id` - Update specific notes based on Id.
  - `DELETE /:id` - Delete a specific note.

  - `GET /search` - Advance search notes based on input.


- **Attachments API** (`/api/v1/attachments`):
  - `POST /upload` - Upload an attachment.
  - `GET /:id` - Retrieve a specific attachment.
  - `DELETE /:id` - Delete a specific attachment.

- **AI Summarization API** (`/api/v1/ai/summarize`):
  - `POST /` - Summarize a given document.

- **OCR API** (`/api/v1/ocr`):
  - `POST /` - Extract text from an uploaded image.


## Folder Structure

```plaintext
src/
├── config/          # Configuration files (e.g., database, environment variables)
├── controllers/     # Route handlers for various endpoints
├── errors/          # Custom error classes and types
├── middlewares/     # Middleware logic for request validation, rate limiting, etc.
├── models/          # Mongoose schemas and database models
├── routes/          # API route definitions
├── services/        # Business logic and external integrations
├── types/           # TypeScript types and interfaces
├── utils/           # Utility functions (e.g., logging, response formatting)
```

### **6. Technology Stack**

- **Language:** TypeScript
- **Framework:** Express Js, Node Js
- **Database:** MongoDB
- **AI Integration:** OpenAI GPT, Tesseract OCR
- **Other Tools:**
  - Multer (File uploads)
  - Winston (Logging)
  - dotenv (Environment management)

### **7. Future Improvements**

- **Comprehensive Testing:** Add unit and integration tests for all APIs.
- **Role-based Access Control:** Add user authentication and authorization layers.
- **Enhanced Logging:** Use centralized logging with log rotation.
- **Performance Optimization:** Explore caching mechanisms for frequently accessed resources.

## Contact

For any queries or contributions, feel free to reach out:  
- **Name:** Aviroop Jana  
- **Email:** aviroopjana@gmail.com  
- **GitHub:** [github.com/aviroopjana](https://github.com/aviroopjana)

## Closing Note

Thank you for exploring this project! 

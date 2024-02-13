# Deadline-Duo

**Description:**
Deadline-Duo is an Express.js web application designed to help users efficiently manage their deadlines, tasks, and study notes. The application follows the MVC (Model-View-Controller) pattern, providing a structured architecture for scalability and maintainability. MongoDB serves as the backend database for storing and retrieving data. 

**Features:**

1. **Deadline Tracking:**
   - Users can store and manage their deadlines with ease.
   - The color of the deadline card dynamically changes based on its proximity to the deadline, providing visual cues for urgency.

2. **Task Page:**
   - A dedicated section for managing tasks, allowing users to keep track of their ongoing and upcoming tasks.

3. **Study Notes and Questions:**
   - Users can store study notes and questions, creating a centralized location for academic materials.

**Database:**

- **MongoDB:**
  - The application utilizes MongoDB as its backend database to store and retrieve user data efficiently.
  - Make sure to configure your MongoDB connection details in the appropriate configuration files.

**MVC Pattern:**
The project adheres to the MVC architectural pattern, which separates concerns into three main components:

- **Model:**
  - Using Mongoose as ORM manages the data structure and logic behind deadlines, tasks, and study notes, interacting with the MongoDB database.

- **View:**
  - Embedded Javascript Syntax handles the presentation and visualization of the data, ensuring a user-friendly interface.

- **Controller:**
  - Bridges the gap between the Model and the View, handling user input, processing data, and updating the Model and View accordingly.
 
**Installation:**

1. Clone the repository:
```bash
git clone https://github.com/your-username/Deadline-Duo.git
```

2. Navigate to the project directory:
```bash
cd Deadline-Duo
```
3. Install dependencies::
```bash
npm install
```

4. Create a '.env' file in your root directory and configure the following variables:
```bash
PORT = 3000
LOCAL_URI = mongodb://localhost:27017 
MONGO_URI = <Your MongoDB URL>/<Your Database name>
DBS_NAME = <Your Database name>
DB_USER = <Your Database user>
DB_PASS = <Your Database password>
```

5. Run the application:
```bash
npm start
```

6. Access the application in your web browser at `http://localhost:3000` Or deploy it manually in your preferred cloud hosting provider.


7. Or you can try the App demo from here https://deadline-duo.onrender.com/
  [note: The app is deployed on a free machine the demo is only useful for only a single person use]

**Requirements:**
- Node.js and npm installed on your machine.
- MongoDB instance configured with connection details.
- A continuous hosting plan of your own.

**Contributing:**
Feel free to contribute to the project by submitting issues or creating pull requests. Your feedback and contributions are highly appreciated!

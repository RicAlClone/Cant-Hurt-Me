# Can't Hurt Me Challenges
In the book “Can’t Hurt Me,” David Goggins focuses on writing down notes that help keep you accountable to reach your goals. While this idea was very impactful to me, I noticed some problems with the method: my notes were very disorganized, possibly lost completely, or I simply could not read my own handwriting. These problems inspired me to create my own spin-off of Goggins’ idea. With Can’t Hurt Me Challenges, users can avoid these issues by keeping these notes in a more consolidated, organized space that makes them easier to access and achieve. Create an 
[account](https://cant-hurt-me.herokuapp.com/register) today.

## Features
- Multi-page layout
- Fully Responsive

## 🛠️ Contributors Setup

If you'd like to contribute to this project, thank you! 🙌 To get it running on your local machine, follow the steps below:

### 1. Fork and Clone the Repository

Click the **"Fork"** button on the top right of the GitHub page, then clone your forked version:

```bash
git clone https://github.com/rickyalatorre/Cant-Hurt-Me.git
cd Cant-Hurt-Me
```

### 2. Install Dependencies

#### Backend

```bash
npm install
```

#### Frontend

Navigate into the client folder and install frontend dependencies:

```bash
cd client
npm install
```

### 3. Set Up Your `.env` File

Create a `.env` file in the root of the project and add the following:

```env
ATLAS_URI=your-mongodb-atlas-uri
SECRET_KEY=your-secret-key
NODE_ENV=development
GENERATE_SOURCEMAP=false
```

> 💡 Tip: You can set up your own free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster, create a user, and get your own connection string to use as `ATLAS_URI`.

### 4. Run the App Locally

#### Start the Backend

```bash
npm start
```

#### Start the Frontend (in a separate terminal)

```bash
cd client
npm start
```

Your application should now be running on [http://localhost:3000](http://localhost:3000).

### 5. Make Your Changes

Create a new branch to work on your changes:

```bash
git checkout -b your-feature-name
```

Edit files, fix bugs, or add features as needed.

### 6. Push and Submit a Pull Request

After you're done making changes:

```bash
git add .
git commit -m "Describe your changes here"
git push origin your-feature-name
```

Then:

1. Go to your forked repository on GitHub.
2. Click **"Compare & pull request"**.
3. Add a descriptive title and comments about your changes.
4. Submit your pull request.

---

🎉 Thanks for contributing!



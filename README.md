# 🍽️ Recipe App

## Overview

The **Recipe App** is a React-based web application that allows users to explore, save, and share recipes. It features user authentication, integration with the Spoonacular API, and a local JSON Server for managing user-created recipes. Users can sign up, log in, browse recipes, add their own, and view detailed information about each recipe.

## Features

- 🔐 **User Authentication**: Sign up and log in using `localStorage` for session management.
- 🔎 **Recipe Browsing**: Search and filter recipes by query or cuisine from the Spoonacular API or local database.
- ➕ **Add Recipes**: Create and store custom recipes using a local JSON Server.
- 📋 **Recipe Details**: View ingredients and step-by-step instructions for each recipe.
- 📱 **Responsive UI**: Built with React and styled using CSS for a smooth user experience.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- A **Spoonacular API key** (sign up for a free tier [here](https://spoonacular.com/food-api))

---

## Setup Instructions

# 1. Clone the Repository
git clone <repository-url>
cd recipe-app

# 2. Install Project Dependencies
npm install

# 3. Configure Spoonacular API Key
# - Get your API key from https://spoonacular.com/food-api
# - Open the file: src/services/api.js
# - Replace the placeholder value with your actual key:
#   const SPOONACULAR_API_KEY = "your_new_api_key_here";

# 4. Set Up the JSON Server

# Create db.json in the root directory (if it doesn't exist) and paste:
echo '{
  "recipes": [
    {
      "id": 1,
      "title": "Test Recipe",
      "imageUrl": "https://example.com/image.jpg",
      "cuisine": "Test",
      "description": "Test description",
      "prepTime": 30,
      "ingredients": ["Ingredient 1"],
      "instructions": ["Step 1"],
      "isUserRecipe": true
    }
  ]
}' > db.json

# Install json-server as a dev dependency
npm install --save-dev json-server

# Add the following script to your package.json under "scripts":
# "start:server": "json-server --watch db.json --port 4000"

# You can use this command to open package.json and edit it:
# (Or open it manually in your editor)

# 5. Run the JSON Server (to store custom user recipes)
npm run start:server

# Visit http://localhost:4000/recipes to verify it’s working.

# If you get an EADDRINUSE error, run:
kill -9 $(lsof -i :4000 -t)

# Then rerun the server:
npm run start:server

# 6. Run the React App (in a new terminal window)
npm start

# Visit http://localhost:3000 in your browser.

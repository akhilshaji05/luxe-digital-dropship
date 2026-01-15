# Luxe Digital & Dropship Website

## Setup
1.  Open a terminal in this directory: `/Users/akhil/Documents/My project`
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
4.  Open your browser to: `http://localhost:3000`

## Features
-   **Public Site**: `http://localhost:3000/` (View products, Add to cart)
-   **Admin Panel**: `http://localhost:3000/admin.html` (Add new products to the catalog)
-   **Backend**: Node.js/Express server with `data/products.json` storage.

## GitHub Setup
Since I could not run these commands for you, please run them in your terminal to initialize Git and push to GitHub:

1.  **Initialize Git:**
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Authenticate & Push:**
    *   **Option A (If you have GitHub CLI `gh` installed):**
        ```bash
        gh auth login
        gh repo create luxe-digital-dropship --public --source=. --remote=origin
        git push -u origin main
        ```
    *   **Option B (Standard Git):**
        1.  Create a new repository on GitHub.com named `luxe-digital-dropship`.
        2.  Run:
            ```bash
            git remote add origin https://github.com/akhilshaji05/luxe-digital-dropship.git
            git branch -M main
            git push -u origin main
            ```
        *Note: You will need a Personal Access Token (PAT) instead of your password if prompted.*

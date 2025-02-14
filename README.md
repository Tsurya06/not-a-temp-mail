# Not a Temp Mail

This project is a temporary email management browser extension and web application built with React, TypeScript, and Vite. It allows users to quickly generate temporary email addresses, manage incoming messages, and delete accounts, all within a simple and intuitive interface.

## Features

*   **Generate Temporary Email Addresses:** Create new, disposable email addresses instantly.
*   **View Incoming Messages:**  Receive and read emails directly within the application.
*   **Delete Email Accounts:** Remove temporary email accounts when they are no longer needed.
*   **Browser Extension Support:** Install as a browser extension for easy access and usage.
*   **User-Friendly Interface:** Simple and intuitive design for effortless email management.
*   **Copy Installation Instructions:** Easily copy step-by-step instructions for installing the browser extension.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 14 or higher)
- yarn (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tsurya06/not-a-temp-mail.git
   cd not-a-temp-mail
   ```

2. Install the dependencies:
   ```bash
   yarn install
   ```

### Running the Project

To start the development server with hot module replacement (HMR), run:
```bash
yarn dev
```
Open your browser and navigate to `http://localhost:5173` to see the application in action.

### Building the Project

To build the project for production, run:
```bash
yarn build
```
This command will create an optimized build of your application in the `dist` folder.

### Converting to a Browser Extension

1. **Build the Project**: Run `yarn build` to create a production build in the `dist` folder.

2. **Prepare the `manifest.json`**:
   Ensure that your `manifest.json` file is in the `public` directory and correctly set up for a browser extension. If it doesn't exist, create it in the `public` directory. Here's a basic example (located in `public/manifest.json`):

   ```json
   {
     "manifest_version": 3,
     "name": "Not a Temp Mail",
     "version": "1.0",
     "description": "A temporary email management application.",
     "action": {
       "default_popup": "index.html",
       "default_icon": {
         "16": "icon16.png",
         "48": "icon48.png",
         "128": "icon128.png"
       }
     },
     "permissions": ["storage"]
   }
   ```
   **Note:** This `manifest.json` is a basic configuration. You might need to adjust it based on your extension's specific requirements and features. Ensure it is placed in the `public` directory so it gets copied to the `dist` folder during the build process.

3. **Download the Extension**: In the web application (after running `yarn dev` or deploying the build), click the "Install Extension" button in the header. This will download the `extension.zip` file.

4. **Extract the ZIP File**: Extract the downloaded `extension.zip` file to a folder on your computer (e.g., `not-a-temp-mail-extension`).

5. **Load the Unpacked Extension in Your Browser**:

   Follow these steps for your browser:

   **Chrome/Edge/Brave**:

   1.  Open your browser and navigate to the extensions page:
       - `chrome://extensions` (for Chrome/Brave)
       - `edge://extensions` (for Edge)
   2.  Enable **"Developer mode"** using the toggle switch usually found in the top right corner of the extensions page.
   3.  Click the **"Load unpacked"** button, typically located at the top left.
   4.  In the file dialog, navigate to and select the folder where you extracted the extension files (e.g., `not-a-temp-mail-extension`). Click "Select Folder" or "Open".

   **Firefox**:

   1.  Open Firefox and go to `about:debugging#/runtime/this-firefox`.
   2.  Click on **"Load Temporary Add-on..."**.
   3.  Navigate to the extension folder and select the `manifest.json` file.

   Alternatively, you can click the "Copy Instructions" button in the installation modal within the application to get detailed, step-by-step instructions for your browser.

### Using the Extension

Once the extension is loaded, click its icon in the browser toolbar to open the "Not a Temp Mail" application in a popup. You can then generate new email addresses, view messages, and manage your accounts directly from your browser.

## Contact
For any inquiries or feedback, feel free to reach out via email: 
  [rjt0266@gmail.com](mailto:rjt0266@gmail.com).


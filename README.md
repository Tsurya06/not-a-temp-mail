# Not a Temp Mail

This project is a temporary email management application built with React, TypeScript, and Vite. It allows users to generate temporary email addresses, manage incoming messages, and delete accounts seamlessly.

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

1. **Prepare the Build**: Ensure that your `manifest.json` file is correctly set up for a browser extension. You may need to create or modify this file in the root of your project. Here’s a basic example:

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

2. **Copy the Build Files**: After building the project, copy the contents of the `dist` folder to a new folder where you will keep your extension files.

3. **Load the Extension in Your Browser**:
   - **For Chrome**:
     1. Open Chrome and go to `chrome://extensions/`.
     2. Enable "Developer mode" in the top right corner.
     3. Click on "Load unpacked" and select the folder where you copied the build files.
   - **For Firefox**:
     1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
     2. Click on "Load Temporary Add-on" and select the `manifest.json` file from your extension folder.

### Using the Extension

Once the extension is loaded in your browser, you can click on its icon in the toolbar to open the temporary email management application. From there, you can generate new email addresses, view messages, and manage your accounts.

## Contact
For any inquiries or feedback, feel free to reach out via email: 
  [rjt0266@gmail.com](mailto:rjt0266@gmail.com).


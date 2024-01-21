# ContactListApp
Steps to run Test Automation for https://thinking-tester-contact-list.herokuapp.com/:
1. Open Visual Studio Code:
Launch Visual Studio Code on your machine;
If not already installed, download and install it from https://code.visualstudio.com/

3. Install Git:
If Git is not already installed, download and install it from https://git-scm.com/

4. Clone the Git Repository:
   •Open the terminal in Visual Studio Code (View > Terminal)
   •Run the following command to clone the Git repository:

   git clone <repository_url>

   Replace <repository_url> with the actual URL of the Git repository

6. Navigate to the Project Directory:
   •Change into the project directory using the terminal:

   cd <project_directory>

   Replace <project_directory> with the name of the cloned repository

8. Install Dependencies:
   •Run the following command to install the project dependencies (including Cypress):

   npm install
   
   npm install --save-dev @faker-js/faker

10. Open Cypress in Visual Studio Code:
    
    •Once the dependencies are installed, open Cypress using the following command:
    
    npx cypress open --env deployment-env=dev (to run tests one by one)
    
    npx cypress open --env deployment-env=dev --config numTestsKeptInMemory=0 (to run all tests together)

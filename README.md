# Cronjob Cleanup Project

This project is a Node.js application that performs a scheduled cleanup task using `node-cron`. It also integrates with Sentry for error monitoring.

## Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)
- Docker (optional, for containerization)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/LiliumStargazer/cronjob-cleanup.git
   cd cronjob-cleanup
   Install the dependencies:  
     ```
2. Install the dependencies:

   ```sh
   npm install
   ```
## Configuration:

   Ensure you have the correct Sentry DSN in the `cleanup.js` file:

   ```javascript
    Sentry.init({
        dsn: 'https://your-sentry-dsn',
        tracesSampleRate: 1,
        debug: false,
    });
   ```

## Usage:

To run the cleanup script:
   ```sh
   npm start
   ```

## Docker:
To build and run the Docker container:  
Build the Docker image:  
   ```sh
docker build -t yourusername/cronjob:1.0 .
   ```
Run the Docker container:
   ```sh
docker run yourusername/cronjob:1.0
   ```

## Project Structure
cleanup.js: The main script that initializes Sentry, defines the cleanup function, and schedules the cron job.
package.json: Contains the project metadata and dependencies.

## Dependencies

@sentry/node: Sentry SDK for Node.js.
node-cron: Cron job scheduler for Node.js.
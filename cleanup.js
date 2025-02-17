// cleanup.js
import http from 'http';
import cron from 'node-cron';

// sentry init
function runCleanup() {
    const options = {
        hostname: 'amservice-app',
        port: 3000,
        path: '/space-cleanup',
        method: 'DELETE'
    };
    const req = http.request(options, res => {
        if (res.statusCode === 200) {
            console.log("Cleanup completed successfully");
        } else {
            console.log(`Failed to cleanup: ${res.statusCode}`);
        }
    });
    req.on('error', error => {
        console.error(error);
    });
    req.end();
}

//clean at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running cleanup task at midnight');
    runCleanup();
});

console.log('Cron job scheduled. Container is running...');

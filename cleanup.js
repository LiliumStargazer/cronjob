// cleanup.js
import * as Sentry from '@sentry/node';
import http from 'http';
import cron from 'node-cron';

// sentry init
Sentry.init({
    dsn: "https://3df2459d1349ceba4313c89c97860ad6@o4507295315525632.ingest.de.sentry.io/4507295325028432",
    tracesSampleRate: 1,
    debug: false,
});

function runCleanup() {
    const options = {
        hostname: 'amservice.ampiovani.locale',
        port: 80,
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
        Sentry.captureException(error);
    });
    req.end();
}

//clean at midnight
cron.schedule('* * * * *', () => {
    console.log('Running cleanup task at midnight');
    runCleanup();
});

console.log('Cron job scheduled. Container is running...');

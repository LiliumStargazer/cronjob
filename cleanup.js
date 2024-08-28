// cleanup.js
import * as Sentry from '@sentry/node';
import http from 'http';
import cron from 'node-cron';

// Inizializza Sentry per il monitoraggio degli errori
Sentry.init({
    dsn: "https://3df2459d1349ceba4313c89c97860ad6@o4507295315525632.ingest.de.sentry.io/4507295325028432",
    tracesSampleRate: 1,
    debug: false,
});

function runCleanup() {
    const options = {
        hostname: 'amservice.ampiovani.locale',
        port: 80,
        path: '/api/backups/cleanup',
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

//pulizia ogni notte a mezzanotte
cron.schedule('0 0 * * *', () => {
    console.log('Running cleanup task at midnight');
    runCleanup();
});

console.log('Cron job scheduled. Container is running...');

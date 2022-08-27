import { readFile } from 'fs';
function readJSON(filename, callback) {
    readFile(filename, 'utf-8', (err, data) => {
        let parsed
        if (err) {
            // propogate the error and exist the current function
            return callback(err)
        }
        // parse the file content
        try {
            parsed = JSON.parse(data)
        } catch (error) {
            return callback(error);
        }
        // no errors, propogate just the data
        callback(null, parsed);
    })
}
process.on('uncaughtException', (err) => {
    console.error(`This will catch at last the JSOn parsing exception: ${err.message}`)
    // terminate the application with 1 error as exit code. Without the following line, the application would continue running
    process.exit(1);
})
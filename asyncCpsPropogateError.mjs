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

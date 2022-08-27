import { EventEmitter } from 'events';
import { readFile } from 'fs';

function findRegex(files, regex) {
    const emitter = new EventEmitter()
    for (const file of files) {
        readFile(file, 'utf8', (err, content) => {
            if (err) {
                return emitter.emit('error', err)
            }
            emitter.emit('fileread', file)
            const match = content.match(regex)
            console.log(match)
            if (match) {
                match.forEach(elm => emitter.emit('found', file, elm))
            }
        })
    }
    return emitter
}

findRegex(['fileA.txt', 'fileB.txt'], /hello \w+/g)
    .on('fileread', file => console.log(`${file} was read`))
    .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
    .on('error', err => console.log(`error emitted ${err.message}`))
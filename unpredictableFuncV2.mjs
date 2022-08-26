import { readFileSync } from 'fs';
const cache = new Map();

function inconsistentRead(filename, cb) {
    if (cache.has(filename)) {
        // invoke synchronously
        return cache.get(filename);
    } else {
        // async func
        const data = readFileSync(filename, 'utf-8');
        cache.set(filename, data);
        return data;
    }
}
function createFileReader(filename) {
    const listeners = [];
    inconsistentRead(filename, value => {
        listeners.forEach(listener => {
            listener(value)
        })
    })
    return {
        onDataReady: listener => {
            listeners.push(listener)
        }
    }
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady(data => {
    console.log(`First call data: ${data}`);
})
const reader2 = createFileReader('data.txt');
reader2.onDataReady(data => {
    console.log(`Second call data: ${data}`);
})

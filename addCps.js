function addCps(a, b, callback) {
    callback(a + b);
}

function additionAsync(a, b, callback) {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
}

console.log('before');
// addCps(1, 2, result => console.log(`result: ${result}`));
additionAsync(1, 2, result => console.log(`result: ${result}`));
console.log('after');
const arr = [];
const start = new Date();

for (let i = 1; i <= 100000; i++) {
    //arr.push(Math.floor(Math.random() * 30000000000).toString());
    //arr.push('bla' + i);
    arr.push(i);
}

console.log(`array full. Time: ${new Date()-start}`);

let counter = 0;
//while (arr.splice(0, 1)[0]) {
while (arr.shift()) {
    counter++;

    if (counter % 1000 === 0) {
        console.log(`processed ${counter} items`);
    }
}

console.log(`array empty using shift. Time: ${new Date()-start}`);

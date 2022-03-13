let text = `Is this
all there is
is`;

let pattern = /^is/gm;
const result = text.match(pattern);

console.log(result);

const { sqrt, floor } = require('mathjs')

function sub (vec1, vec2) {
    return {x: vec1.x - vec2.x, y: vec1.y - vec2.y}
}

function div (vec, n) {
    return { x: (vec.x / n), y: (vec.y / n) }
}

function mag (vec) {
    return sqrt(vec.x * vec.x + vec.y * vec.y);
}

function normalize (vec) {
    let m = mag(vec)
    if (m != 0) {
        return div(vec, m);
    } else {
        return 0;
    }
}
exports.sub = sub
exports.div = div
exports.normalize = normalize
exports.mag = mag

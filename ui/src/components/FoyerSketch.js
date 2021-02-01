//let delegate
let p5
let state
let mouseevent

function drawPlayer(p) {

    p5.fill(255);
    p5.ellipse(p.x, p.y, 50, 50);
    p5.text(p.name, p.x - 30, p.y - 35)
}

export function main(_p5) {
    p5 = _p5

    p5.setup = () => {
        const canvas = p5.createCanvas(500, 500)
        canvas.parent("p5Canvas");
    }
    p5.windowResized = () => {
        let r = document.querySelector('.room1').getBoundingClientRect()
        p5.resizeCanvas(r.width, 500)
    }
    p5.draw = () => {
        p5.background(0);
        if (state.players
            && Object.keys(state.players).length > 0) {
            let playersKeys = Object.keys(state.players)
            playersKeys.forEach((x) => {
                const player = state.players[x]
                drawPlayer(player);
            })
        }
       // notifyCurrentTime();
    }
    p5.mousePressed = (evt) => {
        if (mouseevent) {
            mouseevent(evt)
        }
        //console.log('keypressed', evt)
    }
}

/*
export function setDelegate(_delegate) {
    delegate = _delegate;
}
*/

export function setState(_state) {
    state = _state
}

export function setMouseevent(_mouseevent) {
    mouseevent = _mouseevent
}

/*
function notifyCurrentTime() {
    if (delegate !== undefined) {
        const message = p5.hour() + ":" + p5.minute() + ":" + p5.second();
        delegate(message);
    }
}
*/

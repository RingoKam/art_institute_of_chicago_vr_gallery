import { emitter } from "../emitter.js";

class Gamepad {

    constructor(renderer) {
        this.renderer = renderer;
        this.prevGamePads = new Map();
    }

    tick(delta) {
        let i = 0;
        const session = this.renderer.xr.getSession();
        if (session) for (const source of session.inputSources) {
            if (!source.gamepad) continue;
            const controller = this.renderer.xr.getController(i++);
            const old = this.prevGamePads.get(source);
            const data = {
                buttons: source.gamepad.buttons.map(b => b.value),
                axes: source.gamepad.axes.slice(0)
            };
            if (old) {
                data.buttons.forEach((value, i) => {
                    if (value !== old.buttons[i]) {
                        if (value === 1) {
                            emitter.emit(`button${i}Down`, { value, source, controller, data });
                        } else {
                            emitter.emit((`button${i}Up`, { value, source, controller, data }));
                        }
                    }
                });
                data.axes.forEach((value, i) => {
                    if (value !== old.axes[i]) {
                        emitter.emit((`axes${i}Move`, { value, source, controller, data }));
                        if (old.axes[i] === 0) {
                            emitter.emit((`axes${i}MoveStart`, { value, source, controller, data }));
                        }
                        if (Math.abs(old.axes[i]) < 0.5 && Math.abs(value) > 0.5) {
                            emitter.emit((`axes${i}MoveMiddle`, { value, source, controller, data }));
                        }
                        if (value === 0) {
                            emitter.emit((`axes${i}MoveEnd`, { value, source, controller, data }));
                        }
                    }
                });
            }
            this.prevGamePads.set(source, data);
        }
    }
}

export {
    Gamepad
}
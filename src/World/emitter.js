import mitt from 'mitt'

const emitter = mitt()

// emitter.on("*", console.log)

const createDestroyEvent = (id) => `${id}_DESTROY`

export {
    emitter,
    createDestroyEvent
}
import mitt from 'mitt'

const emitter = mitt()

const createDestroyEvent = (id) => `${id}_DESTROY`

export {
    emitter,
    createDestroyEvent
}
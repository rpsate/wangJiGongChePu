import DragResize from '@/directives/dragResize'

export default {
    install(app) {
        app.directive('drag-resize', DragResize)
    }
}

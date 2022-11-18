import interact from "interactjs"
export default {
    mounted(el, binding) {
        // direction
        let edges = {top: false, bottom: false, left: false, right: false}
        if (binding.arg) edges[binding.arg] = true

        // size
        let minRange = {width: 0, height: 0}
        let maxRange = 'infinite'
        if (binding.value) {
            if (binding.value.min) {
                let {width, height} = binding.value.min
                if (width) minRange['width'] = width
                if (height) minRange['height'] = height
            }
            if (binding.value.max) {
                let {width, height} = binding.value.max
                maxRange = {width: 0, height: 0}
                if (width) maxRange['width'] = width
                if (height) maxRange['height'] = height
            }
        }

        interact(el).resizable({
            // resize from all edges and corners
            edges: edges,

            listeners: {
                move: function (event) {
                    let { x, y } = event.target.dataset

                    if (binding.arg == 'left' || binding.arg == 'right') {
                        x = (parseFloat(x) || 0) + event.deltaRect.left
                        Object.assign(event.target.style, {
                            width: `${event.rect.width}px`,
                        })
                    } else {
                        y = (parseFloat(y) || 0) + event.deltaRect.top
                        Object.assign(event.target.style, {
                            height: `${event.rect.height}px`,
                        })
                    }
                    Object.assign(event.target.dataset, { x, y })
                }
            },
            modifiers: [
                // keep the edges inside the parent
                /*interact.modifiers.restrictEdges({
                    outer: 'parent'
                }),*/
                // minimum size
                interact.modifiers.restrictSize({
                    min: minRange,
                    max: maxRange
                })
            ],
            inertia: false
        })
    }
}

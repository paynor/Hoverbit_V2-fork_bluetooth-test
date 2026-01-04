let throttle = 0
let turn = 0
let arm = 0

basic.forever(function () {
    if (arm) {
        hoverbit.start_cushion_simple()
        hoverbit.forward_power_simple(throttle)
    } else {
        hoverbit.stop_all_motors()
    }
    hoverbit.direction_simple(turn)
})

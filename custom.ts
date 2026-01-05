enum list_motor {
    //% block="M0"
    M0,
    //% block="M1"
    M1,
    //% block="M2"
    M2
}

enum list_servo {
    //% block="S1"
    S1,
    //% block="S2"
    S2,
}
//% groups=['Beginner', 'Expert']
//% color="#037268" icon="\uf0e4"
//uf11b
//\uf0b2
//\uf0e4"
//u274A"


/**
 * This is a fork by PAYNOR of the extension described in the lines below.
 * The only modification done is the removal of the radio dependancy and addition of the bluetooth dependancy in the pxy.json file.
 *
 * Extension written by Julien Launay julien.launay@laposte.net and MakeKit, henning@makekit.no
 * For making a hovercraft with the multi:bit control board by MakeKit, www.makekit.no
 * 
 * The MIT License (MIT)
 *
 * Copyright (c) 2021 Julien Launay and MakeKit
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
 * associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies
 *  or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
*/ 

namespace hoverbit {
 
    /**
     * Start the cushion motor.
     * Motor will run at 35% speed.
     * Motor must be connected to port M0
     */
    //% blockID=hoverbit_start_cushion
    //% block="start cushion"
    //% group='Beginner'
    export function start_cushion_simple(): void {
        pins.analogWritePin(AnalogPin.P0, 35*1023/100);
    }

    /**
     * Stop the cushion motor.
     * The motor must be connected to port M0
     */
    //% blockID=hoverbit_stop_cushion
    //% block="stop cushion"
    //% group='Beginner'
    export function stop_cushion(): void {
        pins.analogWritePin(AnalogPin.P0, 0);
    }

    /**
     * Control the speed on both motors.
     * Motors can be connected on M0, M1 or M2.
     * Don´t use servo on the same port as controlling a motor!
     */
    //% blockID=hoverbit_stop_motors
    //% block="stop all motors"
    //% group='Beginner'
    export function stop_all_motors(): void {
        pins.analogWritePin(AnalogPin.P0, 0);
        pins.analogWritePin(AnalogPin.P2, 0);
    }

    /** Control the rudder servo.
     *  Input a number between -90 and 90.
     *  Servo must be connected to S1.
     */
    //% blockID=hoverbit_direction_simple
    //% block="set direction $angle"
    //% angle.min=-80 angle.max=80
    //% angle.defl=0
    //% group='Beginner'
    export function direction_simple(angle: number): void {
        angle = Math.constrain(angle+90, 10, 170);
        pins.servoWritePin(AnalogPin.P1, angle);
    }

    /**
     * Control how fast the hovercraft moves forward.
     * Motor must be connected to M2.
     */
    //% blockID=hoverbit_motor_power_simple
    //% block="set forward power $power"
    //% power.min=0 power.max=100
    //% power.defl=0
    //% group='Beginner'
    export function forward_power_simple(power: number): void {
        pins.analogWritePin(AnalogPin.P2, power*1023/100);
    }


       /** Control any motor speed. 
     *  Motors can be connected on P0(M0), P1(M1) or P2(M2).
     *  Don´t use servo at the same pin while controlling a motor!
     */
    //% blockID=hoverbit_motor_power
    //% block="motor $name_motor power $power"
    //% power.min=0 power.max=100
    //% power.defl=0
    //% name_motor=M0
    //% group='Expert'
    export function motor_power(name_motor: list_motor, power: number): void {
        let rate = power*1023/100;
        switch (name_motor) {
            case list_motor.M0:
                pins.analogWritePin(AnalogPin.P0, rate); break;
            case list_motor.M1:
                pins.analogWritePin(AnalogPin.P1, rate); break;
            case list_motor.M2:
                pins.analogWritePin(AnalogPin.P2, rate); break;
        }
    }

    /** Control the servo on S1 or S2.
     *  Input an angle between -90 and 90.
     * Don´t control a motor and a servo on the same pin!
     */
    //% blockID=hoverbit_direction
    //% block="servo $servo_name direction $angle"
    //% angle.min=-90 angle.max=90
    //% angle.defl=0
    //% servo_name.defl=P1
    //% group='Expert'
    export function servo_angle(angle: number, servo_name: list_servo): void {
        angle = Math.constrain(angle+90, 0, 180);
        switch (servo_name) {
            case list_servo.S1:
                pins.servoWritePin(AnalogPin.P1, angle); break;
            case list_servo.S2:
                pins.servoWritePin(AnalogPin.P2, angle); break;
        }  
    }

    /**
     * Cushion power.
     * Change how fast the cushion motor is spinning (0-100%).
     * We recommend 40% as a starting poing.
     * The motor must be connected to port P0 (M0).
     */
    //% blockID=hoverbit_cushion_speed
    //% block="cushion power %power"
    //% group='Expert'
    //% power.defl=10
    //% power.min=0 power.max=100
    //% expandableArgumentMode=toggle
    export function cushion_power(power: number): void {
        pins.analogWritePin(AnalogPin.P0, power*1023/100);
    }

}

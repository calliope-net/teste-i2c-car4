car4.onReceivedData(function (receivedBuffer) {
    if (car4.receivedBuffer_Contains()) {
        car4.servo(car4.receivedBuffer_getUint8(car4.eBufferOffset.b1_Servo))
        car4.motorON(car4.receivedBuffer_getBit(car4.eBufferBit.x80_MotorPower))
        car4.motorA255(car4.receivedBuffer_getUint8(car4.eBufferOffset.b0_Motor))
        car4.buzzer(car4.receivedBuffer_getBit(car4.eBufferBit.x40_Hupe))
    } else {
        car4.motorA255(128)
    }
    zeigeStatus()
    car4.licht_sensor(200, 300)
})
function zeigeStatus () {
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 15, lcd16x2rgb.lcd16x2_text(car4.statuszeile1(car4.eStatuszeile.a)))
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 7, z)
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 8, 15, car4.statuszeile1(car4.eStatuszeile.c))
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    car4.relay(false)
})
pins.onPulsed(DigitalPin.C16, PulseValue.Low, function () {
    car4.comment("↑high, ↓low, Event niedrig bei l->h loslassen")
    car4.comment("Zeit wie lange es low ↓↑ war in µs")
    if (pins.pulseDuration() > 100000) {
        car4.motorON(true)
        car4.fahreSchritt(car4.programmSchritt(-60, 90, 30))
        z += 1
    }
})
car4.onEncoderStop(function (v) {
    car4.motorA255(128)
})
let z = 0
car4.beimStart(240, 97)
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 15, lcd16x2rgb.lcd16x2_text(car4.statuszeile1(car4.eStatuszeile.start)))
let t = input.runningTime()
loops.everyInterval(1000, function () {
    if (car4.car4ready()) {
        if (car4.lastConnected(car4.car4_ePause(car4.ePause.p60))) {
            car4.relay(false)
        } else if (car4.isConnected() && car4.lastConnected(car4.car4_ePause(car4.ePause.p1))) {
            car4.comment("zwischen 1 Sekunde und 1 Minute ohne Bluetooth: Standby und blinken")
            car4.comment("einmalig nach neu disconnected")
            car4.setConnected(false)
        } else if (!(car4.isConnected())) {
            car4.comment("dauerhaft wenn disconnected")
            car4.licht(true, true)
            zeigeStatus()
        } else {
            car4.comment("Bluetooth ist verbunden: 'wenn Datenpaket empfangen' ist aktiv")
        }
    }
})

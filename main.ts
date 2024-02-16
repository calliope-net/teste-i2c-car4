function zeigeStatus () {
    lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 15, "" + car4.format(car4.motorAget(), 3, car4.eAlign.right) + car4.format(car4.servo_get(), 4, car4.eAlign.right) + "" + car4.format(car4.encoder_get(car4.eEncoderEinheit.Impulse), 5, car4.eAlign.right))
}
radio.onReceivedBuffer(function (Datenpaket) {
    car4.onReceivedBuffer(Datenpaket)
    if (!(car4.isConnected())) {
        car4.comment("einmalig nach neu connected")
        car4.setConnected(true)
        car4.motorON(true)
        car4.licht(!(car4.licht_get()))
    } else if (car4.isConnected()) {
        if (car4.receivedBuffer_Contains(car4.eBuffer.b1_Servo)) {
            car4.servo(car4.receivedBuffer_getUint8(car4.eBuffer.b1_Servo))
            car4.motorA255(car4.receivedBuffer_getUint8(car4.eBuffer.b0_Motor))
        } else {
            car4.motorA255(128)
        }
    }
})
control.onEvent(car4.encoder_EventSource(), EventBusValue.MICROBIT_EVT_ANY, function () {
    basic.setLedColor(0x007fff)
})
car4.beimStart(240, 90)
lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 15, lcd16x2rgb.lcd16x2_text(car4.logText()))

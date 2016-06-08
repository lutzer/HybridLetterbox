#include <SoftwareSerial.h>

#define SERIAL mySerial

#define RX_PIN 0
#define TX_PIN 1

SoftwareSerial mySerial(RX_PIN, TX_PIN);

void setup() {
  // setup serial pins
  pinMode(RX_PIN, INPUT);
  pinMode(TX_PIN, OUTPUT);
  
  // start serial port at 9600 bps:
  SERIAL.begin(9600);
  SERIAL.println("starting");
  
  establishContact();  // send a byte to establish contact until receiver responds
}

void loop() {
  // if we get a valid byte, read analog ins:
  while (SERIAL.available() > 0) {
    // get incoming byte:
    char inByte = SERIAL.read();
    // send sensor values:
    SERIAL.write(inByte);
  }
}

void establishContact() {
  while (SERIAL.available() <= 0) {
    SERIAL.write("Waiting\n");
    delay(1000);
  }
}

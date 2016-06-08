
#include <SoftwareSerial.h>
#include <string.h>

// PIN LAYOUTS
#define RX_PIN 0 // TO TX RASP PI
#define TX_PIN 1 // TO RX RASP PI
#define LED_STATUS_PIN 13 //IN5 on ULN2003 CONNECTED TO LED

#define SERIAL_BUFFER_SIZE 8
#define SERIAL_END_CHARACTER 't'
#define BAUD_RATE 9600

SoftwareSerial serial(RX_PIN, TX_PIN);
char serialBuffer[SERIAL_BUFFER_SIZE]; //allow only messages of the size of eight bytes
byte serialBufferPosition = 0;

void setup() {

  //setup led pin
  pinMode(LED_STATUS_PIN, OUTPUT);

  // setup serial pins
  pinMode(RX_PIN, INPUT);
  pinMode(TX_PIN, OUTPUT);
  
  // start serial port
  serial.begin(BAUD_RATE);
  serial.println("start\n");

  digitalWrite(LED_STATUS_PIN,HIGH);
  establishContact();  // send a byte to establish contact until receiver responds
  digitalWrite(LED_STATUS_PIN,LOW);
}

void loop() {
  // if we get a valid byte, read analog ins:

  
  byte messageReceived = false;
  
  if (serial.available() > 0) {
    // get incoming byte:
    char inByte = serial.read();

    if (inByte == SERIAL_END_CHARACTER) {
      //received end byte
      messageReceived = true;
    } else if (serialBufferPosition < SERIAL_BUFFER_SIZE) {
      //add one byte
      serialBuffer[serialBufferPosition] = inByte;
      serialBufferPosition++;
    } else {
      //overflow, do nothing
      ;
    }
  }

  if (messageReceived) {
    serial.write(serialBuffer);
    //serial.write(compareSubString(serialBuffer,"led:1") ? "true" : "false" );
    
    if (compareSubString(serialBuffer,"led:1"))
      digitalWrite(LED_STATUS_PIN,HIGH);
    else if (compareSubString(serialBuffer,"led:0"))
      digitalWrite(LED_STATUS_PIN,LOW);
    
    clearSerialBuffer();
  }
  
  
}

void establishContact() {
  while (serial.available() <= 0) {
    serial.write("waiting\n");
    delay(1000);
  }
}

void clearSerialBuffer() {
  for (int i=0;i<SERIAL_BUFFER_SIZE;i++)
    serialBuffer[i] = (char)0;
  serialBufferPosition = 0;
}

bool compareSubString(char* string, String compareString) {
  for (int i=0;i<compareString.length();i++) {
    if (string[i] != compareString[i])
      return false;
  }
  return true;
}


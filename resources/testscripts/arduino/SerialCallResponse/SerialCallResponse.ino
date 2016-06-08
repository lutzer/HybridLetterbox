
#define LED_PIN 13

#define SERIAL_END 't'
#define SERIAL_BUFFER_SIZE 8

char serialBuffer[SERIAL_BUFFER_SIZE]; //allow only messages of the size of eight bytes
byte serialBufferPosition = 0;

void setup() {

  //setup led pin
  pinMode(LED_PIN, OUTPUT);
  
  // start serial port at 9600 bps:
  Serial.begin(9600);
  Serial.println("starting");
  
  Serial.begin(9600);
  
  establishContact();  // send a byte to establish contact until receiver responds
}

void loop() {
  // if we get a valid byte, read analog ins:

  
  byte messageReceived = false;
  
  if (Serial.available() > 0) {
    // get incoming byte:
    char inByte = Serial.read();

    if (inByte == SERIAL_END) {
      //received end byte
      messageReceived = true;
    } else if (serialBufferPosition < SERIAL_BUFFER_SIZE) {
      //add one byte
      serialBuffer[serialBufferPosition] = inByte;
      serialBufferPosition++;
    } else {
      //overflow
      clearSerialBuffer();
    }
  }

  if (messageReceived) {

  Serial.write(compareSubString(serialBuffer,"led:1"));
  Serial.write(serialBuffer);
    
    if (compareSubString(serialBuffer,"led:1"))
      digitalWrite(LED_PIN,HIGH);
    else if (compareSubString(serialBuffer,"led:0"))
      digitalWrite(LED_PIN,LOW);
 
    clearSerialBuffer();
  }
  
  
}

void establishContact() {
  while (Serial.available() <= 0) {
    Serial.write("Waiting\n");
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


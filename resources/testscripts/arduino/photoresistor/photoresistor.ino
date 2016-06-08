#include "Photocell.h"

#define LED_PIN 9
#define PHOTORESISTOR_PIN A0

Photocell photocell(PHOTORESISTOR_PIN, LED_PIN);

void setup() {
  
	Serial.begin(9600); 	
   
  	while (!photocell.calibrate())
  		Serial.println("calibrating");

  	Serial.println("done");

  	photocell.enable(true);
  	delay(1000);
}

void loop() {
  // put your main code here, to run repeatedly:
  photocell.update();

  if (photocell.isBlocked())
  	Serial.println("blocked");
}

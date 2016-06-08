#include "StepperMotor.h"
#include "AccelStepper.h"

AccelStepper stepper(8, 2, 3, 4, 5);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

      Serial.println("start");

   stepper.setSpeed(350);

}

void loop() {
  // put your main code here, to run repeatedly:
  stepper.runSpeed();
}

#include <AccelStepper.h>
#define HALFSTEP 8

// Motor pin definitions
#define motorPin1  2     // IN1 on the ULN2003 driver 1
#define motorPin2  3     // IN2 on the ULN2003 driver 1
#define motorPin3  4     // IN3 on the ULN2003 driver 1
#define motorPin4  5     // IN4 on the ULN2003 driver 1

// Initialize with pin sequence IN1-IN3-IN2-IN4 for using the AccelStepper with 28BYJ-48
//AccelStepper stepper1(HALFSTEP, motorPin1, motorPin3, motorPin2, motorPin4); //for unipolar
AccelStepper stepper1(AccelStepper::FULL4WIRE, motorPin1, motorPin2, motorPin3, motorPin4);

void setup() {
  stepper1.setMaxSpeed(100.0);
  stepper1.setAcceleration(50.0);
  //stepper1.setSpeed(200);
  stepper1.moveTo(64*8);

}//--(end setup )---

void loop() {

  //Change direction when the stepper reaches the target position
  if (stepper1.distanceToGo() == 0) {
    stepper1.moveTo(-stepper1.currentPosition());
  }
  stepper1.run();
}

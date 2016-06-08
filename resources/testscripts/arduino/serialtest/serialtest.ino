#include <SoftwareSerial.h>
#include <AccelStepper.h>
#define HALFSTEP 8

// Motor pin definitions
#define motorPin1  0     // IN1 on the ULN2003 driver 1
#define motorPin2  1     // IN2 on the ULN2003 driver 1
#define motorPin3  2     // IN3 on the ULN2003 driver 1
#define motorPin4  3     // IN4 on the ULN2003 driver 1

#define RX_PIN 9
#define TX_PIN 10

// Initialize with pin sequence IN1-IN3-IN2-IN4 for using the AccelStepper with 28BYJ-48
AccelStepper stepper1(HALFSTEP, motorPin1, motorPin3, motorPin2, motorPin4);
SoftwareSerial mySerial(RX_PIN, TX_PIN);

void setup() {
  stepper1.setMaxSpeed(1000.0);
  stepper1.setAcceleration(300.0);
  stepper1.setSpeed(200);
  stepper1.moveTo(200);

  // setup serial pins
  pinMode(RX_PIN, INPUT);
  pinMode(TX_PIN, OUTPUT);

  // open serial communication line
  mySerial.begin(9600);
  mySerial.println("starting");

}//--(end setup )---

void loop() {

  //Change direction when the stepper reaches the target position
  if (stepper1.distanceToGo() == 0) {
    mySerial.println("switch direction to:"+stepper1.currentPosition());
    stepper1.moveTo(-stepper1.currentPosition());
  }
  stepper1.run();
}

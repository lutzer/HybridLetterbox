#include <Bounce2.h>
#include <AccelStepper.h>
#include "stepper.h"

// Stepper Motor definitions
#define HALFSTEP 8
#define MOTOR_MAX_SPEED 1000.0
#define MOTOR_ACCELLERATION 250.0
#define MOTOR_FULL_TURN 64*64

#define MOTOR_PIN1  0     // IN1 on the ULN2003 driver 1
#define MOTOR_PIN2  1     // IN2 on the ULN2003 driver 1
#define MOTOR_PIN3  2     // IN3 on the ULN2003 driver 1
#define MOTOR_PIN4  3     // IN4 on the ULN2003 driver 1

//Reed switch definitions
#define REED_SWITCH_PIN 10
#define DEBOUNCE_INTERVAL 10 //in miliseconds

// Initialize with pin sequence IN1-IN3-IN2-IN4 for using the AccelStepper with 28BYJ-48
AccelStepper stepper(HALFSTEP, MOTOR_PIN1, MOTOR_PIN3, MOTOR_PIN2, MOTOR_PIN4);
int stepperStartPos = 0;

//init reed switch bouncer
Bounce reedSwitch = Bounce(); 

void setup() {

	// setup stepper motor
	stepper.setMaxSpeed(MOTOR_MAX_SPEED);
	stepper.setAcceleration(MOTOR_ACCELLERATION);
	stepper.setSpeed(0);

	// setup reed sensor
	pinMode(REED_SWITCH_PIN, INPUT_PULLUP);
	reedSwitch.attach(REED_SWITCH_PIN);
	reedSwitch.interval(DEBOUNCE_INTERVAL);

	//stepper.moveTo(513*4); // full rotation: 513*4
	
	// start calibration of the stepper motor
	stepperStartPos = calibrateStepper();

	// move to start position
	//setStepperPosition(STEPPER_START);
	stepper.moveTo(stepperStartPos);
	
}

void loop() {

  	//Change direction when the stepper reaches the target position
	if (stepper.distanceToGo() != 0) {
		stepper.run();
	}
	
}

int calibrateStepper() {

	int start1 = 0;
	int start2 = 0;

	stepper.setSpeed(MOTOR_ACCELLERATION); //move slowly to begin of reed switch
	while (readReedSwitch() == HIGH) {
		stepper.runSpeed();
	}
	start1 = stepper.currentPosition(); //move slowly to end of reed switch
	while (readReedSwitch() == LOW) {
		stepper.runSpeed();
	}
	start2 = stepper.currentPosition();

	// calculate middle position
	return (start2 - start1)/2 + start1;
}

void setStepperPosition(StepperPosition position) {
	if (position == STEPPER_EJECT)
		stepper.moveTo(stepperStartPos + MOTOR_FULL_TURN*0.75);
	else if (position == STEPPER_TURN)
		stepper.moveTo(stepperStartPos + MOTOR_FULL_TURN/2);
	else 
		stepper.moveTo(stepperStartPos);
}

int readReedSwitch() {
	reedSwitch.update();
	return reedSwitch.read();
}

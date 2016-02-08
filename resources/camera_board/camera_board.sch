EESchema Schematic File Version 2
LIBS:power
LIBS:device
LIBS:transistors
LIBS:conn
LIBS:linear
LIBS:regul
LIBS:74xx
LIBS:cmos4000
LIBS:adc-dac
LIBS:memory
LIBS:xilinx
LIBS:microcontrollers
LIBS:dsp
LIBS:microchip
LIBS:analog_switches
LIBS:motorola
LIBS:texas
LIBS:intel
LIBS:audio
LIBS:interface
LIBS:digital-audio
LIBS:philips
LIBS:display
LIBS:cypress
LIBS:siliconi
LIBS:opto
LIBS:atmel
LIBS:contrib
LIBS:valves
LIBS:tech-thing
LIBS:camera_board-cache
EELAYER 25 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L LED D1
U 1 1 569CF26A
P 3750 3850
F 0 "D1" H 3750 3950 50  0000 C CNN
F 1 "LED" H 3750 3750 50  0000 C CNN
F 2 "LEDs:LED-3MM" H 3750 3850 50  0001 C CNN
F 3 "" H 3750 3850 50  0000 C CNN
	1    3750 3850
	0    -1   -1   0   
$EndComp
$Comp
L LED D2
U 1 1 569CF2C0
P 4050 3850
F 0 "D2" H 4050 3950 50  0000 C CNN
F 1 "LED" H 4050 3750 50  0000 C CNN
F 2 "LEDs:LED-3MM" H 4050 3850 50  0001 C CNN
F 3 "" H 4050 3850 50  0000 C CNN
	1    4050 3850
	0    -1   -1   0   
$EndComp
$Comp
L LED D3
U 1 1 569CF2DA
P 4350 3850
F 0 "D3" H 4350 3950 50  0000 C CNN
F 1 "LED" H 4350 3750 50  0000 C CNN
F 2 "LEDs:LED-3MM" H 4350 3850 50  0001 C CNN
F 3 "" H 4350 3850 50  0000 C CNN
	1    4350 3850
	0    -1   -1   0   
$EndComp
$Comp
L LED D4
U 1 1 569CF2F5
P 4650 3850
F 0 "D4" H 4650 3950 50  0000 C CNN
F 1 "LED" H 4650 3750 50  0000 C CNN
F 2 "LEDs:LED-3MM" H 4650 3850 50  0001 C CNN
F 3 "" H 4650 3850 50  0000 C CNN
	1    4650 3850
	0    -1   -1   0   
$EndComp
$Comp
L LED D5
U 1 1 569CF313
P 4950 3850
F 0 "D5" H 4950 3950 50  0000 C CNN
F 1 "LED" H 4950 3750 50  0000 C CNN
F 2 "LEDs:LED-3MM" H 4950 3850 50  0001 C CNN
F 3 "" H 4950 3850 50  0000 C CNN
	1    4950 3850
	0    -1   -1   0   
$EndComp
$Comp
L LED D6
U 1 1 569CF48D
P 5250 3850
F 0 "D6" H 5250 3950 50  0000 C CNN
F 1 "LED" H 5250 3750 50  0000 C CNN
F 2 "LEDs:LED-3MM" H 5250 3850 50  0001 C CNN
F 3 "" H 5250 3850 50  0000 C CNN
	1    5250 3850
	0    -1   -1   0   
$EndComp
$Comp
L LED D7
U 1 1 569CF4B6
P 5550 3850
F 0 "D7" H 5550 3950 50  0000 C CNN
F 1 "LED" H 5550 3750 50  0000 C CNN
F 2 "LEDs:LED-3MM" H 5550 3850 50  0001 C CNN
F 3 "" H 5550 3850 50  0000 C CNN
	1    5550 3850
	0    -1   -1   0   
$EndComp
$Comp
L LED D8
U 1 1 569CF564
P 5850 3850
F 0 "D8" H 5850 3950 50  0000 C CNN
F 1 "LED" H 5850 3750 50  0000 C CNN
F 2 "LEDs:LED-3MM" H 5850 3850 50  0001 C CNN
F 3 "" H 5850 3850 50  0000 C CNN
	1    5850 3850
	0    -1   -1   0   
$EndComp
$Comp
L R_PACK8 RP1
U 1 1 569CF5B0
P 4800 2850
F 0 "RP1" H 4800 3300 50  0000 C CNN
F 1 "R_PACK8" H 4800 2400 50  0000 C CNN
F 2 "Housings_DIP:DIP-16_W7.62mm" H 4800 2850 50  0001 C CNN
F 3 "" H 4800 2850 50  0000 C CNN
	1    4800 2850
	0    1    1    0   
$EndComp
Wire Wire Line
	4450 3050 3750 3050
Wire Wire Line
	3750 3050 3750 3650
Wire Wire Line
	4550 3050 4550 3150
Wire Wire Line
	4550 3150 4050 3150
Wire Wire Line
	4050 3150 4050 3650
Wire Wire Line
	4650 3050 4650 3250
Wire Wire Line
	4650 3250 4350 3250
Wire Wire Line
	4350 3250 4350 3650
Wire Wire Line
	4750 3050 4750 3350
Wire Wire Line
	4750 3350 4650 3350
Wire Wire Line
	4650 3350 4650 3650
Wire Wire Line
	4850 3050 4850 3350
Wire Wire Line
	4850 3350 4950 3350
Wire Wire Line
	4950 3350 4950 3650
Wire Wire Line
	4950 3050 4950 3250
Wire Wire Line
	4950 3250 5250 3250
Wire Wire Line
	5250 3250 5250 3650
Wire Wire Line
	5550 3650 5550 3150
Wire Wire Line
	5550 3150 5050 3150
Wire Wire Line
	5050 3150 5050 3050
Wire Wire Line
	5150 3050 5850 3050
Wire Wire Line
	5850 3050 5850 3650
$Comp
L CONN_01X02 P1
U 1 1 569CF6C0
P 3100 2200
F 0 "P1" H 3100 2350 50  0000 C CNN
F 1 "CONN_01X02" V 3200 2200 50  0000 C CNN
F 2 "Socket_Strips:Socket_Strip_Straight_1x02" H 3100 2200 50  0001 C CNN
F 3 "" H 3100 2200 50  0000 C CNN
	1    3100 2200
	0    -1   -1   0   
$EndComp
$Comp
L +5V #PWR01
U 1 1 569CF741
P 4450 2250
F 0 "#PWR01" H 4450 2100 50  0001 C CNN
F 1 "+5V" H 4450 2390 50  0000 C CNN
F 2 "" H 4450 2250 50  0000 C CNN
F 3 "" H 4450 2250 50  0000 C CNN
	1    4450 2250
	1    0    0    -1  
$EndComp
Wire Wire Line
	4450 2250 4450 2650
Wire Wire Line
	4450 2650 5150 2650
Connection ~ 5050 2650
Connection ~ 4950 2650
Connection ~ 4850 2650
Connection ~ 4750 2650
Connection ~ 4650 2650
Connection ~ 4550 2650
Wire Wire Line
	3750 4050 5850 4050
Connection ~ 4050 4050
Connection ~ 4350 4050
Connection ~ 4650 4050
Connection ~ 4950 4050
Connection ~ 5250 4050
Connection ~ 5550 4050
Wire Wire Line
	3750 4050 3750 4300
$Comp
L GND #PWR02
U 1 1 569CFB31
P 3750 4300
F 0 "#PWR02" H 3750 4050 50  0001 C CNN
F 1 "GND" H 3750 4150 50  0000 C CNN
F 2 "" H 3750 4300 50  0000 C CNN
F 3 "" H 3750 4300 50  0000 C CNN
	1    3750 4300
	1    0    0    -1  
$EndComp
Wire Wire Line
	3050 2400 3050 2550
Wire Wire Line
	3050 2550 2950 2550
Wire Wire Line
	2950 2550 2950 2700
Wire Wire Line
	3150 2400 3150 2550
Wire Wire Line
	3150 2550 3250 2550
Wire Wire Line
	3250 2550 3250 2700
$Comp
L GND #PWR03
U 1 1 569CFD15
P 3250 2700
F 0 "#PWR03" H 3250 2450 50  0001 C CNN
F 1 "GND" H 3250 2550 50  0000 C CNN
F 2 "" H 3250 2700 50  0000 C CNN
F 3 "" H 3250 2700 50  0000 C CNN
	1    3250 2700
	1    0    0    -1  
$EndComp
$Comp
L +5V #PWR04
U 1 1 569CFD47
P 2950 2700
F 0 "#PWR04" H 2950 2550 50  0001 C CNN
F 1 "+5V" H 2950 2840 50  0000 C CNN
F 2 "" H 2950 2700 50  0000 C CNN
F 3 "" H 2950 2700 50  0000 C CNN
	1    2950 2700
	-1   0    0    1   
$EndComp
$Comp
L PWR_FLAG #FLG05
U 1 1 569CFD79
P 3150 2400
F 0 "#FLG05" H 3150 2495 50  0001 C CNN
F 1 "PWR_FLAG" H 3150 2580 50  0000 C CNN
F 2 "" H 3150 2400 50  0000 C CNN
F 3 "" H 3150 2400 50  0000 C CNN
	1    3150 2400
	0    1    1    0   
$EndComp
$Comp
L PWR_FLAG #FLG06
U 1 1 569CFDAB
P 3050 2400
F 0 "#FLG06" H 3050 2495 50  0001 C CNN
F 1 "PWR_FLAG" H 3050 2580 50  0000 C CNN
F 2 "" H 3050 2400 50  0000 C CNN
F 3 "" H 3050 2400 50  0000 C CNN
	1    3050 2400
	0    -1   -1   0   
$EndComp
$EndSCHEMATC

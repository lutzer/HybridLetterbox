from serial import Serial
serial = Serial("/dev/ttyAMA0", 9600, timeout=1)
serial.open()

serial.write("testing")
try:
    while 1:
        response = serial.readline()
        print response
except KeyboardInterrupt:
    serial.close()

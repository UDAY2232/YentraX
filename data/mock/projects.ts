import type { Project } from '@/types/product';

export const mockProjects: Project[] = [
  {
    id: 'pr1',
    title: 'Build a Bluetooth Robot Car',
    slug: 'bluetooth-robot-car',
    image: 'https://images.pexels.com/photos/7869034/pexels-photo-7869034.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    difficulty: 'Beginner',
    description: 'Build a smartphone-controlled robot car using Arduino and a Bluetooth module. Learn motor control and wireless communication.',
    shortDescription: 'Control a robot car from your phone via Bluetooth.',
    category: 'Robotics',
    components: [
      { name: 'Arduino Uno', slug: 'arduino-uno-r4-wifi', quantity: 1 },
      { name: 'L298N Motor Driver', slug: 'l298n-motor-driver', quantity: 1 },
      { name: 'HC-05 Bluetooth', slug: 'hc-05-bluetooth', quantity: 1 },
      { name: 'DC Motors (2x)', slug: 'geared-dc-motor-12v', quantity: 2 },
    ],
    componentsCount: 4,
    estimatedTime: '2-3 hours',
    learningOutcomes: [
      'Arduino programming fundamentals',
      'Motor control with L298N driver',
      'Bluetooth serial communication',
      'Smartphone app integration',
    ],
    steps: [
      {
        title: 'Assemble the Chassis',
        description: 'Attach the DC motors to the chassis and mount the wheels. Secure the Arduino and motor driver on top.',
      },
      {
        title: 'Wire the Motor Driver',
        description: 'Connect the L298N motor driver to the Arduino. Wire the motors to the driver output terminals.',
        codeSnippet: '// Motor driver pins\n#define ENA 5\n#define IN1 6\n#define IN2 7\n#define IN3 8\n#define IN4 9\n#define ENB 10',
      },
      {
        title: 'Connect the Bluetooth Module',
        description: 'Wire the HC-05 Bluetooth module to the Arduino RX/TX pins. Configure the serial communication.',
        codeSnippet: '#include <SoftwareSerial.h>\nSoftwareSerial BT(2, 3); // RX, TX',
      },
      {
        title: 'Upload the Control Code',
        description: 'Write and upload the Arduino sketch that reads Bluetooth commands and drives the motors accordingly.',
        codeSnippet: 'void loop() {\n  if (BT.available()) {\n    char cmd = BT.read();\n    handleCommand(cmd);\n  }\n}',
      },
      {
        title: 'Test and Calibrate',
        description: 'Pair your phone with the HC-05 module. Use a Bluetooth terminal app to send commands and test movement.',
      },
    ],
  },
  {
    id: 'pr2',
    title: 'IoT Weather Station',
    slug: 'iot-weather-station',
    image: 'https://images.pexels.com/photos/18721086/pexels-photo-18721086.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    difficulty: 'Intermediate',
    description: 'Create a WiFi-connected weather station that logs temperature, humidity and pressure to the cloud using ESP32.',
    shortDescription: 'WiFi-connected weather station with cloud logging.',
    category: 'IoT',
    components: [
      { name: 'ESP32 DevKit', slug: 'esp32-wroom-devkit-v1', quantity: 1 },
      { name: 'BMP280 Sensor', slug: 'bmp280-pressure-sensor', quantity: 1 },
      { name: 'DHT22 Sensor', slug: 'dht22-sensor', quantity: 1 },
    ],
    componentsCount: 3,
    estimatedTime: '4-5 hours',
    learningOutcomes: [
      'ESP32 WiFi configuration',
      'I2C sensor interfacing',
      'Cloud data logging with MQTT',
      'Reading temperature, humidity, and pressure',
    ],
    steps: [
      {
        title: 'Set Up the ESP32',
        description: 'Install the ESP32 board package in the Arduino IDE and configure the WiFi credentials.',
      },
      {
        title: 'Wire the Sensors',
        description: 'Connect the BMP280 via I2C and the DHT22 to a digital pin. Power both from the 3.3V rail.',
      },
      {
        title: 'Write the Sensor Reading Code',
        description: 'Read temperature, humidity, and pressure values from the sensors and format them as JSON.',
        codeSnippet: 'float temp = bmp.readTemperature();\nfloat pres = bmp.readPressure() / 100.0;\nfloat hum = dht.readHumidity();',
      },
      {
        title: 'Publish to the Cloud',
        description: 'Set up an MQTT broker and publish sensor data every 60 seconds. Visualize the data in a dashboard.',
        codeSnippet: 'client.publish("weather/temp", String(temp).c_str());\nclient.publish("weather/hum", String(hum).c_str());',
      },
    ],
  },
  {
    id: 'pr3',
    title: 'Smart Home Automation',
    slug: 'smart-home-automation',
    image: 'https://images.pexels.com/photos/30170004/pexels-photo-30170004.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    difficulty: 'Intermediate',
    description: 'Control lights and appliances from your phone. Build a relay-based home automation system with app control.',
    shortDescription: 'Control home appliances from your phone.',
    category: 'IoT',
    components: [
      { name: 'NodeMCU ESP8266', slug: 'nodemcu-esp8266-v3', quantity: 1 },
      { name: 'Relay Module (4ch)', slug: 'relay-module-4ch', quantity: 1 },
      { name: 'Smart Home Kit', slug: 'smart-home-iot-starter-kit', quantity: 1 },
    ],
    componentsCount: 3,
    estimatedTime: '3-4 hours',
    learningOutcomes: [
      'Relay control with ESP8266',
      'WiFi-based app integration',
      'Safe handling of AC loads',
      'Building a control dashboard',
    ],
    steps: [
      {
        title: 'Wire the Relay Module',
        description: 'Connect the 4-channel relay module to the ESP8266 GPIO pins. Make sure to use opto-isolated inputs.',
      },
      {
        title: 'Connect Appliances',
        description: 'Wire the relays to your appliances following proper safety precautions. Always disconnect mains power before wiring.',
      },
      {
        title: 'Flash the Firmware',
        description: 'Upload the control code that toggles relay channels based on HTTP requests or app commands.',
        codeSnippet: 'if (server.arg("relay") == "1") {\n  digitalWrite(RELAY1, !digitalRead(RELAY1));\n}',
      },
      {
        title: 'Set Up the App',
        description: 'Use a home automation app or web interface to send commands to the ESP8266 over your local network.',
      },
    ],
  },
  {
    id: 'pr4',
    title: 'AI Object Detection Robot',
    slug: 'ai-object-detection-robot',
    image: 'https://images.pexels.com/photos/17483849/pexels-photo-17483849.png?auto=compress&cs=tinysrgb&h=400&w=600',
    difficulty: 'Advanced',
    description: 'Build an edge AI robot that recognizes and tracks objects in real-time using the K210 vision module.',
    shortDescription: 'Edge AI robot with real-time object tracking.',
    category: 'AI & ML',
    components: [
      { name: 'AI Vision Kit (K210)', slug: 'ai-vision-kit-k210', quantity: 1 },
      { name: 'Servo Motor', slug: 'mg90s-micro-servo', quantity: 1 },
      { name: 'Ultrasonic Sensor', slug: 'hc-sr04-ultrasonic-sensor', quantity: 1 },
    ],
    componentsCount: 3,
    estimatedTime: '6-8 hours',
    learningOutcomes: [
      'Edge AI with K210',
      'Real-time object detection',
      'Servo-based tracking',
      'Sensor fusion techniques',
    ],
    steps: [
      {
        title: 'Flash the K210 Firmware',
        description: 'Flash the K210 with a pre-trained object detection model. Configure the camera and display.',
      },
      {
        title: 'Mount the Hardware',
        description: 'Mount the K210 camera on a servo-driven platform. Attach the ultrasonic sensor for distance measurement.',
      },
      {
        title: 'Write the Detection Logic',
        description: 'Process the K210 output to identify target objects and calculate their position in the frame.',
        codeSnippet: 'if (obj.confidence > 0.7) {\n  int error = obj.x - FRAME_CENTER;\n  trackObject(error);\n}',
      },
      {
        title: 'Implement Servo Tracking',
        description: 'Use a PID controller to smoothly track the detected object with the servo motor.',
        codeSnippet: 'float pid = kp * error + ki * integral + kd * derivative;\nservo.write(centerAngle + pid);',
      },
      {
        title: 'Add Obstacle Avoidance',
        description: 'Use the ultrasonic sensor to stop the robot when an obstacle is too close while tracking.',
      },
    ],
  },
];

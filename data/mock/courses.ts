export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  category: string;
  lessonsCount: number;
}

export const mockCourses: Course[] = [
  {
    id: 'c001',
    title: 'Arduino for Beginners',
    description: 'Learn the basics of Arduino programming and circuit design from scratch. No prior experience required.',
    level: 'Beginner',
    duration: '2 Hours',
    image: 'https://images.pexels.com/photos/7097230/pexels-photo-7097230.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    category: 'Arduino',
    lessonsCount: 12,
  },
  {
    id: 'c002',
    title: 'ESP32 IoT Masterclass',
    description: 'Build connected devices with the powerful ESP32. Learn WiFi, Bluetooth, and MQTT protocols.',
    level: 'Intermediate',
    duration: '4 Hours',
    image: 'https://images.pexels.com/photos/18721086/pexels-photo-18721086.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    category: 'IoT',
    lessonsCount: 18,
  },
  {
    id: 'c003',
    title: 'Build Your First Robot',
    description: 'A practical, step-by-step guide to building an obstacle-avoiding robot using basic components.',
    level: 'Beginner',
    duration: '3 Hours',
    image: 'https://images.pexels.com/photos/8294611/pexels-photo-8294611.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    category: 'Robotics',
    lessonsCount: 15,
  },
  {
    id: 'c004',
    title: 'Advanced Raspberry Pi',
    description: 'Push the limits of your Pi. Learn Linux fundamentals, Python scripting, and GPIO control.',
    level: 'Advanced',
    duration: '6 Hours',
    image: 'https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    category: 'Raspberry Pi',
    lessonsCount: 24,
  },
  {
    id: 'c005',
    title: 'Electronics Basics',
    description: 'Understand voltage, current, resistance, and how basic components like resistors and capacitors work.',
    level: 'Beginner',
    duration: '1.5 Hours',
    image: 'https://images.pexels.com/photos/11579194/pexels-photo-11579194.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    category: 'Electronics',
    lessonsCount: 8,
  },
  {
    id: 'c006',
    title: 'Python for Hardware',
    description: 'Learn MicroPython and CircuitPython to control hardware easily without C++.',
    level: 'Intermediate',
    duration: '3.5 Hours',
    image: 'https://images.pexels.com/photos/17483849/pexels-photo-17483849.png?auto=compress&cs=tinysrgb&h=400&w=600',
    category: 'Python',
    lessonsCount: 14,
  }
];

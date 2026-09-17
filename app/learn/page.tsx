import { mockCourses } from '@/data/mock/courses';
import { LearningCard } from '@/components/learn/LearningCard';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LearnPage() {
  const categories = [
    'All', 'Arduino', 'Raspberry Pi', 'IoT', 'Robotics', 'Electronics', 'Python'
  ];

  return (
    <div className="container-page py-8 md:py-12">
      <div className="mx-auto mb-12 max-w-[800px] text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <BookOpen className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
          Learn. Build. Create.
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Master electronics, coding, and hardware through practical, project-based learning.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat, i) => (
          <Button 
            key={cat} 
            variant={i === 0 ? "default" : "outline"} 
            className="rounded-full"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((course) => (
          <LearningCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

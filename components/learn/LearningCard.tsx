import { Course } from '@/data/mock/courses';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LearningCardProps {
  course: Course;
  className?: string;
}

export function LearningCard({ course, className }: LearningCardProps) {
  return (
    <Card className={cn('flex flex-col overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="relative aspect-video overflow-hidden bg-muted group">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg">
            <PlayCircle className="h-6 w-6" />
          </div>
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <Badge variant="secondary" className="font-medium text-xs">
            {course.category}
          </Badge>
          <div className="flex items-center text-xs font-medium">
            <span className={cn(
              "mr-2 rounded-full px-2 py-0.5 text-[10px]",
              course.level === 'Beginner' ? "bg-success/20 text-success" :
              course.level === 'Intermediate' ? "bg-warning/20 text-warning" :
              "bg-destructive/20 text-destructive"
            )}>
              {course.level}
            </span>
          </div>
        </div>
        <h3 className="line-clamp-1 text-xl font-bold">{course.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {course.description}
        </p>
        <div className="mt-4 flex flex-1 flex-col justify-end">
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center text-xs font-medium text-muted-foreground">
              <Clock className="mr-1.5 h-3.5 w-3.5" />
              {course.duration}
            </div>
            <div className="flex items-center text-xs font-medium text-muted-foreground">
              <BookOpen className="mr-1.5 h-3.5 w-3.5" />
              {course.lessonsCount} lessons
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full">
          <Link href={`/learn/${course.id}`}>
            Start Learning
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

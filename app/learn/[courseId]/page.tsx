import { notFound } from 'next/navigation';
import { mockCourses } from '@/data/mock/courses';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, BookOpen, CheckCircle2, ChevronRight, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CourseDetailPageProps {
  params: {
    courseId: string;
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = mockCourses.find((c) => c.id === params.courseId);

  if (!course) {
    notFound();
  }

  // Generate some mock lessons
  const lessons = Array.from({ length: course.lessonsCount }).map((_, i) => ({
    id: `l${i + 1}`,
    title: `Lesson ${i + 1}: ${
      i === 0 ? 'Introduction & Setup' :
      i === course.lessonsCount - 1 ? 'Final Project & Next Steps' :
      `Core Concept ${i}`
    }`,
    duration: `${Math.floor(Math.random() * 15) + 5}m`,
    isCompleted: i < 3, // First few completed
    isCurrent: i === 3,
  }));

  return (
    <div className="container-page py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-muted-foreground">
        <Link href="/learn" className="hover:text-primary">Learn</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href={`/learn?category=${course.category}`} className="hover:text-primary">{course.category}</Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-foreground">{course.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player Placeholder */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900">
            <img 
              src={course.image} 
              alt={course.title}
              className="h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:bg-primary">
                <PlayCircle className="h-8 w-8" />
              </button>
            </div>
          </div>

          {/* Course Details */}
          <div className="mt-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'} className={cn(
                course.level === 'Beginner' ? 'bg-success hover:bg-success/90' :
                course.level === 'Intermediate' ? 'bg-warning hover:bg-warning/90' : ''
              )}>
                {course.level}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold md:text-4xl">{course.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{course.description}</p>
            
            <div className="mt-6 flex flex-wrap items-center gap-6 border-y py-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{course.duration}</span>
                  <span className="text-xs text-muted-foreground">Total time</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{course.lessonsCount}</span>
                  <span className="text-xs text-muted-foreground">Lessons</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Course Content */}
        <div>
          <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold">Course Content</h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">3 / {course.lessonsCount}</span> lessons completed
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${(3 / course.lessonsCount) * 100}%` }} />
              </div>
            </div>

            <div className="mb-6 flex gap-2">
              <Button className="w-full">Continue Learning</Button>
              <Button variant="outline" size="icon" className="shrink-0">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex max-h-[500px] flex-col gap-2 overflow-y-auto pr-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3 text-left transition-colors hover:bg-muted",
                    lesson.isCurrent && "border-primary bg-primary/5",
                    lesson.isCompleted && "bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {lesson.isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : lesson.isCurrent ? (
                      <PlayCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-muted-foreground text-[10px] font-medium text-muted-foreground">
                        {lesson.id.replace('l', '')}
                      </div>
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      lesson.isCompleted && "text-muted-foreground",
                      lesson.isCurrent && "text-primary"
                    )}>
                      {lesson.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

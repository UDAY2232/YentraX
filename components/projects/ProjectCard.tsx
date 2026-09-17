import { Project } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Hammer, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card className={cn('flex flex-col overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className="font-normal text-muted-foreground">
            {project.difficulty}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {project.estimatedTime}
          </div>
        </div>
        <h3 className="line-clamp-1 text-lg font-bold">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {project.shortDescription}
        </p>
        <div className="mt-4 flex flex-1 flex-col justify-end">
          <div className="flex items-center text-xs font-medium text-muted-foreground">
            <Hammer className="mr-1 h-3 w-3" />
            {project.componentsCount} Components
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full gap-2">
          <Link href={`/projects/${project.id}`}>
            View Project
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

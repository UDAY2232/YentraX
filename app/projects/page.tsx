import { mockProjects } from '@/data/mock/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Hammer } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="container-page py-8 md:py-12">
      <div className="mx-auto mb-12 max-w-[800px] text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Hammer className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
          Build Something Amazing
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Explore real-world projects and find everything you need to build them. From simple robotics to advanced IoT automation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

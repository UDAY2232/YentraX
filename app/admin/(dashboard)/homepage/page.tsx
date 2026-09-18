'use client';

import * as React from 'react';
import { adminHomepageSections } from '@/data/mock/admin/misc';
import { PageHeader } from '@/components/admin/ui/AdminUI';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowUp, ArrowDown, Pencil } from 'lucide-react';
import { toast } from 'sonner';

export default function HomepagePage() {
  const [sections, setSections] = React.useState(adminHomepageSections);

  const moveUp = (i: number) => {
    if (i === 0) return;
    const newSections = [...sections];
    [newSections[i - 1], newSections[i]] = [newSections[i], newSections[i - 1]];
    newSections.forEach((s, idx) => s.position = idx + 1);
    setSections(newSections);
    toast.success('Section moved up');
  };

  const moveDown = (i: number) => {
    if (i === sections.length - 1) return;
    const newSections = [...sections];
    [newSections[i + 1], newSections[i]] = [newSections[i], newSections[i + 1]];
    newSections.forEach((s, idx) => s.position = idx + 1);
    setSections(newSections);
    toast.success('Section moved down');
  };

  const toggleVisible = (id: string) => {
    setSections(sections.map((s) => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Homepage Management" description="Reorder and toggle homepage sections" action={<Button onClick={() => toast.success('Changes saved')}>Save Changes</Button>} />
      <div className="space-y-2">
        {sections.map((section, i) => (
          <div key={section.id} className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">{section.position}</div>
            <div className="flex-1">
              <p className="font-medium">{section.name}</p>
              <p className="text-xs text-muted-foreground">{section.visible ? 'Visible' : 'Hidden'}</p>
            </div>
            <Switch checked={section.visible} onCheckedChange={() => toggleVisible(section.id)} />
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" disabled={i === 0} onClick={() => moveUp(i)}><ArrowUp className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" disabled={i === sections.length - 1} onClick={() => moveDown(i)}><ArrowDown className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => toast.success('Edit section')}><Pencil className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

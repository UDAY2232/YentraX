'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, MEGA_MENU_GROUPS } from '@/lib/constants';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNavigation({ open, onOpenChange }: MobileNavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] overflow-y-auto sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-4" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.label === 'Shop' ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="shop" className="border-b">
                      <AccordionTrigger className="px-3 text-base font-medium">
                        Shop
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 px-3 pb-2">
                          {MEGA_MENU_GROUPS.map((group) => (
                            <div key={group.title}>
                              <p className="mb-1 text-xs font-bold uppercase text-muted-foreground">
                                {group.title}
                              </p>
                              <ul className="space-y-1">
                                {group.items.slice(0, 4).map((cat) => (
                                  <li key={cat.name}>
                                    <Link
                                      href={cat.href}
                                      className="block rounded px-2 py-1 text-sm text-foreground/80 hover:bg-accent"
                                    >
                                      {cat.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-md px-3 py-2.5 text-base font-medium hover:bg-accent',
                      isActive(item.href) ? 'text-primary bg-primary/10' : 'text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

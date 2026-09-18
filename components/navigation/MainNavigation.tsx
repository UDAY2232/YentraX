'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { ShopMegaMenu } from '@/components/navigation/ShopMegaMenu';
import { cn } from '@/lib/utils';

export function MainNavigation() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [megaMenuOpen, setMegaMenuOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleMouseEnter = (label: string) => {
    clearCloseTimer();
    setHoveredItem(label);
    setMegaMenuOpen(label === 'Shop');
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setHoveredItem(null);
      setMegaMenuOpen(false);
    }, 200);
  };

  const handleFocus = (label: string) => {
    clearCloseTimer();
    setHoveredItem(label);
    setMegaMenuOpen(label === 'Shop');
  };

  const handleMenuClose = () => {
    clearCloseTimer();
    setMegaMenuOpen(false);
    setHoveredItem(null);
  };

  return (
    <nav
      className="hidden md:block"
      onMouseLeave={handleMouseLeave}
      aria-label="Main navigation"
    >
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <li
            key={item.label}
            onMouseEnter={() => handleMouseEnter(item.label)}
            onFocus={() => handleFocus(item.label)}
            className="relative"
          >
            <Link
              href={item.href}
              className={cn(
                'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'text-primary'
                  : hoveredItem === item.label
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground'
              )}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <ShopMegaMenu open={megaMenuOpen} onClose={handleMenuClose} />
    </nav>
  );
}

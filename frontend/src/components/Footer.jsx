import React from 'react';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const Footer = () => {
  return (
    <footer className="w-full bg-main border-t mt-4">
      <div className="max-w-4xl mx-auto py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-main-foreground">
            <a
              href="https://github.com/ishpeeedy/BlinkURL"
              className="underline flex items-center gap-2"
            >
              <img src="/logo64.png" width={'24'} alt="" />
              <span>BlinkURL Repo</span>
              <svg viewBox="0 0 13 20" className="w-4 h-4">
                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
              </svg>
            </a>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="text">Credits</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                The SVG illustrations used in this project are sourced from{' '}
                <a href="https://storyset.com/">Storyset </a>, a platform that
                offers high-quality, customizable illustrations.
                <div>
                  {' '}
                  Logo icon made by{' '}
                  <a
                    href="https://www.flaticon.com/authors/freepik"
                    title="Freepik"
                  >
                    {' '}
                    Freepik{' '}
                  </a>{' '}
                  from{' '}
                  <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                  </a>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <p className="text-center text-sm text-main-foreground">
            <a
              href="https://github.com/ishpeeedy"
              className="underline flex items-center gap-2"
            >
              <span>Made with 🖤 by ishpeeedy</span>
              <svg viewBox="0 0 13 20" className="w-4 h-4">
                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

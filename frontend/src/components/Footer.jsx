import React from 'react';
const Footer = () => {
  return (
    <footer className="w-full bg-main border-t mt-4">
      <div className="max-w-4xl mx-auto py-4">
        <div className="flex justify-between items-center">
          <p className="text-center text-sm text-main-foreground">
            {' '}
            <a href="https://github.com/ishpeeedy/BlinkURL" class="underline">
              <span>BlinkURL Github Repository</span>
              <svg viewBox="0 0 13 20">
                <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
              </svg>
            </a>
          </p>
          <p className="text-center text-sm text-main-foreground">
            <a href="https://github.com/ishpeeedy" class="underline">
              <span>Made with 🖤 by ishpeeedy</span>
              <svg viewBox="0 0 13 20">
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

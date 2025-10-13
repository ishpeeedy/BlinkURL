import React from 'react';
const Footer = () => {
  return (
    <footer className="w-full bg-main border-t mt-4">
      <div className="max-w-4xl mx-auto py-4">
        <div className="flex justify-between items-center">
          <p className="text-center text-sm text-main-foreground">
            <a href="https://github.com/ishpeeedy/BlinkURL">BlinkURL</a>. All
            rights reserved.
          </p>
          <p className="text-center text-sm text-main-foreground">
            Made with 🖤 by <a href="https://github.com/ishpeeedy">ishpeeedy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

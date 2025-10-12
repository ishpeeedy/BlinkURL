import { useState, useEffect } from 'react';

export default function CipherText({
  longText = 'https://www.example.com/very/long/url/path/that/needs/shortening',
  shortText = 'blnk.io/abc123',
  className = '',
}) {
  const [displayText, setDisplayText] = useState(longText);

  useEffect(() => {
    // Random alphanumeric generator - exact copy from original
    const rd = function randomAlphaNum() {
      let rand = Math.floor(Math.random() * (122 - 33 + 1) + 33);

      // Filter out char codes - exact logic from original
      if (rand > 38 && rand < 48) rand = rand + 10;
      else if (rand > 57 && rand < 63) rand = rand + 10;
      else if (rand > 90 && rand < 97) rand = rand + 10;

      return String.fromCharCode(rand);
    };

    const replace = /[^\s]/g;

    // Show original long text for 1 second
    setTimeout(() => {
      let currentLength = longText.length;

      // Scramble and shrink the text gradually
      const shrinkTimer = setInterval(() => {
        if (currentLength > shortText.length) {
          // Shrink by a few characters and scramble
          const scrambled = longText
            .substring(0, currentLength)
            .replace(replace, rd);
          setDisplayText(scrambled);
          currentLength -= 3; // Shrink by 3 chars at a time
        } else {
          clearInterval(shrinkTimer);

          // Reveal the short text character by character
          let i = 0;
          const revealTimer = setInterval(() => {
            const revealed = shortText.substring(0, i);
            const scrambled = shortText
              .substring(i, shortText.length)
              .replace(replace, rd);

            setDisplayText(revealed + scrambled);

            i++;

            if (i > shortText.length) {
              clearInterval(revealTimer);
            }
          }, 110);

          return () => clearInterval(revealTimer);
        }
      }, 80);

      return () => clearInterval(shrinkTimer);
    }, 1000); // Wait 1 second before starting
  }, [longText, shortText]);

  return <div className={className}>{displayText}</div>;
}

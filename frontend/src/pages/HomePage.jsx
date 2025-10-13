import React from 'react';
import UrlForm from '../components/UrlForm';
import CipherText from '../components/CipherText';
import { Card } from '@/components/ui/card';

const HomePage = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-4">
      <section
        className="container mx-auto px-4 py-8 rounded-2xl mb-4"
        style={{ backgroundColor: 'var(--muted3)' }}
      >
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left Side - Cipher Text Demo */}
          <Card
            className="md:col-span-2  p-6"
            style={{ backgroundColor: 'var(--secondary-background)' }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Shorten. Share. Analyse.
            </h1>

            <p className="text-lg ">
              Transform your long URLs into powerful, trackable short links.
              BlinkURL empowers you to create custom branded links, monitor
              engagement in real-time, and gain valuable insights into your
              audience's behavior.
            </p>

            {/* Cipher Animation Demo */}
            <div className="rounded-lg p-6 font-mono border-4">
              <CipherText
                longText="https://www.example.com/a/very/long/url//that/needs/shorten..."
                shortText="blnk.io/smallURL"
                className=" text-lg md:text-xl"
              />
            </div>
          </Card>

          {/* Right Side - URL Form */}
          <div>
            <UrlForm
              className="md:col-span-1 p-6"
              style={{ backgroundColor: 'var(--secondary-background)' }}
            />
          </div>
        </div>
      </section>
      <section
        className="container mx-auto px-4 py-8 rounded-2xl mb-4"
        style={{ backgroundColor: 'var(--muted4)' }}
      >
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left Side */}
          <div className="md:col-span-1">
            <img
              src="/qrCode.svg"
              alt=""
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right Side */}
          <Card
            className="md:col-span-2 p-6"
            style={{ backgroundColor: 'var(--secondary-background)' }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Share
            </h1>
            <p className="text-lg ">
              Reach your audience everywhere with instant QR code generation.
              Perfect for print materials, social media, or presentations —
              share your shortened links across any platform with ease. Each QR
              code is automatically generated for every link you create.
            </p>
          </Card>
        </div>
      </section>

      <section
        className="container mx-auto px-4 py-8 rounded-2xl mb-4"
        style={{ backgroundColor: 'var(--muted3)' }}
      >
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left Side */}
          <Card
            className="md:col-span-2 p-6"
            style={{ backgroundColor: 'var(--secondary-background)' }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Analyse
            </h1>
            <p className="text-lg ">
              Dive deep into your link performance with comprehensive analytics.
              Track total clicks, unique visitors, geographic locations,
              devices, peak times and browsers. Identify traffic patterns and
              detect suspicious activity to protect your brand and optimize your
              marketing strategy.
            </p>
          </Card>

          {/* Right Side */}
          <div className="md:col-span-1">
            <img
              src="/analytics.svg"
              alt=""
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import { Card } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="p-3" style={{ backgroundColor: 'var(--muted4)' }}>
        <img src="/404.svg" alt="404 error illustration" />
        <Button>
          <Link to="/">Go back home</Link>
        </Button>
        <p className="">
          The page you're looking for doesn't exist.
          <a href="https://storyset.com/people">
            People illustrations by Storyset
          </a>
        </p>
      </Card>
    </div>
  );
}

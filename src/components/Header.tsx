import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-foreground text-background w-8 h-10 rounded-sm flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">highway</h1>
            <p className="text-xs text-muted-foreground leading-none">delite</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;

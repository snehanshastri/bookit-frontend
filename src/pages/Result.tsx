import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, referenceId } = location.state || {};

  if (!success) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <div className="text-destructive text-4xl">✕</div>
            </div>
            <h1 className="text-3xl font-bold">Booking Failed</h1>
            <p className="text-muted-foreground">
              Something went wrong with your booking. Please try again.
            </p>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-3xl font-bold">Booking Confirmed</h1>
          <p className="text-muted-foreground">
            Ref ID: <span className="font-mono font-semibold">{referenceId}</span>
          </p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </main>
    </div>
  );
};

export default Result;

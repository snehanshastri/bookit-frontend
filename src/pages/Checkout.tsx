import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc, updateDoc, increment, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { experience, slot, quantity, subtotal, taxes } = location.state || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!experience || !slot) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Invalid checkout data</p>
        </div>
      </div>
    );
  }

  const finalTotal = subtotal + taxes - promoDiscount;

  // 🔹 Promo code validation
  const handleApplyPromo = () => {
    if (promoCode === 'SAVE10') {
      setPromoDiscount(Math.round(subtotal * 0.1));
      toast({ title: 'Promo applied!', description: '10% discount applied' });
    } else if (promoCode === 'FLAT100') {
      setPromoDiscount(100);
      toast({ title: 'Promo applied!', description: '₹100 discount applied' });
    } else {
      toast({ title: 'Invalid promo code', variant: 'destructive' });
    }
  };

  // 🔹 Booking handler with Firestore update
  const handleSubmit = async () => {
    if (!name.trim()) {
      toast({ title: 'Name is required', variant: 'destructive' });
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      toast({ title: 'Valid email is required', variant: 'destructive' });
      return;
    }
    if (!agreedToTerms) {
      toast({ title: 'Please agree to terms and safety policy', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      const slotRef = doc(db, `experiences/${experience.id}/slots/${slot.date}_${slot.time}`);
      const slotSnap = await getDoc(slotRef);

      if (!slotSnap.exists()) {
        toast({ title: 'Slot not found', variant: 'destructive' });
        setLoading(false);
        return;
      }

      const slotData = slotSnap.data();
      if (slotData.capacity <= 0) {
        toast({ title: 'This slot is already sold out', variant: 'destructive' });
        setLoading(false);
        return;
      }

      // 🔸 Decrease slot capacity in Firestore
      await updateDoc(slotRef, { capacity: increment(-1) });

      // 🔸 Record booking info (optional)
      const bookingId = `BKG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const bookingRef = doc(db, `bookings/${bookingId}`);
      await setDoc(bookingRef, {
        bookingId,
        experienceId: experience.id,
        experienceName: experience.title,
        name,
        email,
        date: slot.date,
        time: slot.time,
        amountPaid: finalTotal,
        createdAt: new Date().toISOString(),
      });

      // ✅ Navigate to success page
      navigate('/result', {
        state: { success: true, referenceId: bookingId },
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast({ title: 'Booking failed', description: 'Please try again later', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4" />
          Checkout
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Full name</label>
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Promo code</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    />
                    <Button onClick={handleApplyPromo} variant="secondary">
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    I agree to the terms and safety policy
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Experience</h3>
                  <p className="font-medium">{experience.title}</p>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>
                      {new Date(slot.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span>{slot.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Qty</span>
                    <span>{quantity}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes</span>
                    <span>₹{taxes}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₹{promoDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Processing...' : 'Pay and Confirm'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;

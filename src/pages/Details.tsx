import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const expRef = doc(db, "experiences", id!);
        const expSnap = await getDoc(expRef);

        if (expSnap.exists()) {
          const expData = expSnap.data();
          setExperience({ id: expSnap.id, ...expData });

          const slotsRef = collection(expRef, "slots");
          const slotsSnap = await getDocs(slotsRef);
          const fetchedSlots = slotsSnap.docs.map((d) => d.data());
          setSlots(fetchedSlots);

          if (fetchedSlots.length > 0) {
            const uniqueDates = Array.from(new Set(fetchedSlots.map((s) => s.date)));
            setSelectedDate(uniqueDates[0]);
          }
        } else {
          console.error("Experience not found");
        }
      } catch (error) {
        console.error("Error fetching experience:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Loading />
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Experience not found</p>
        </div>
      </div>
    );
  }

  const uniqueDates = Array.from(new Set(slots.map((s) => s.date)));
  const availableSlots = slots.filter((s) => s.date === selectedDate);
  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const handleConfirm = () => {
    if (selectedSlot) {
      navigate("/checkout", {
        state: {
          experience,
          slot: selectedSlot,
          quantity,
          subtotal,
          taxes,
          total,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4" />
          Details
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-[16/9] overflow-hidden rounded-lg">
              <img
                src={experience.imageUrl}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
              <p className="text-muted-foreground">{experience.description}</p>
            </div>

            <div>
              <h2 className="font-semibold mb-3">Choose date</h2>
              <div className="flex gap-2 flex-wrap">
                {uniqueDates.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlot(null);
                    }}
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-3">Choose time</h2>
              <div className="flex gap-2 flex-wrap">
                {availableSlots.map((slot) => (
                  <Button
                    key={`${slot.date}_${slot.time}`}
                    variant={selectedSlot?.time === slot.time ? "default" : "outline"}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={slot.capacity <= 0}
                  >
                    {slot.time}
                    {slot.capacity > 0 && slot.capacity < 5 && (
                      <span className="text-xs text-destructive ml-2">
                        {slot.capacity} left
                      </span>
                    )}
                    {slot.capacity === 0 && (
                      <span className="text-xs text-muted-foreground ml-2">
                        Sold out
                      </span>
                    )}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                All times are in IST (GMT +5:30)
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2">About</h2>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Scenic routes, trained guides, and safety briefing. Minimum age 10.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Starts at</span>
                  <span className="font-bold text-lg">₹{experience.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold w-8 text-center">{quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={!selectedSlot || quantity >= selectedSlot.capacity}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
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
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={!selectedSlot || selectedSlot.capacity === 0}
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Details;

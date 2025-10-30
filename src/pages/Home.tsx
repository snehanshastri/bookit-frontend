import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import ExperienceCard from '@/components/ExperienceCard';
import Loading from '@/components/Loading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // ✅ Make sure this file exists
import { Experience } from '@/api';

const Home = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from Firestore
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'experiences'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Experience[];

        setExperiences(data);
        setFilteredExperiences(data);
      } catch (err) {
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = experiences.filter((exp) =>
        ((exp as any).title ?? (exp as any).name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExperiences(filtered);
    } else {
      setFilteredExperiences(experiences);
    }
  }, [searchQuery, experiences]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <div className="flex gap-2 w-full max-w-md">
            <Input
              placeholder="Search experiences"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}

        {!loading && filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No experiences found matching your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Experience } from '@/api';
import { useNavigate } from 'react-router-dom';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={experience.imageUrl || experience.image}
          alt={experience.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base leading-tight">{experience.name}</h3>
          <span className="text-xs bg-muted px-2 py-1 rounded-md whitespace-nowrap shrink-0">
            {experience.location}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{experience.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs text-muted-foreground">From </span>
            <span className="font-bold text-lg">₹{experience.price}</span>
          </div>
         <Button onClick={() => navigate(`/details/${experience.id}`)}>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;

import PerfumeCard from '@/components/perfumes/PerfumeCard';
import { Perfume } from '@/types/perfumes';

interface FeaturedPerfumesProps {
  perfumes: Perfume[];
}

export default function FeaturedPerfumes({ perfumes }: FeaturedPerfumesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {perfumes.map((perfume) => (
        <div key={perfume.id}>
          <PerfumeCard perfume={perfume} />
        </div>
      ))}
    </div>
  );
}

import Hero from '@/components/sections/Hero';
import CatalogGrid from '@/components/sections/CatalogGrid';
import QuoteCalculator from '@/components/sections/QuoteCalculator';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import WhyFurnitects from '@/components/sections/WhyFurnitects';

export default function Home() {
  return (
    <>
      <Hero />
      <CatalogGrid />
      <QuoteCalculator />
      <ProcessTimeline />
      <WhyFurnitects />
    </>
  );
}

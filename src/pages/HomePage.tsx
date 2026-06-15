import Hero from '../components/home/Hero';
import FeaturedProperties from '../components/home/FeaturedProperties';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import Team from '../components/home/Team';
import FAQ from '../components/home/FAQ';
import BlogSection from '../components/home/BlogSection';
import CTA from '../components/home/CTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <FeaturedProperties
        title="Propriétés de Luxe"
        subtitle="L'art de vivre au summum du raffinement"
        filter="luxury"
        limit={3}
      />
      <Stats />
      <Testimonials />
      <Team />
      <BlogSection />
      <FAQ />
      <CTA />
    </main>
  );
}

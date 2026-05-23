import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ExclusiveCollection } from './components/ExclusiveCollection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <ExclusiveCollection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

import CustomCursor from '@/components/layout/CustomCursor';
import Footer from '@/components/layout/Footer';
import GrainOverlay from '@/components/layout/GrainOverlay';
import { Header } from '@/components/layout/Header';
import { NavigationTransitionProvider } from '@/components/providers/NavigationTransitionProvider';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <NavigationTransitionProvider>
        <Header />
        {children}
        <Footer />
      </NavigationTransitionProvider>
      <GrainOverlay />
    </>
  );
}

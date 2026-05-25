import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ManifestProvider } from './context/ManifestContext';
import { DeckShell } from './components/shell/DeckShell';
import { HubPage } from './pages/HubPage';
import './styles/loader.css';

const HeroIntroPage = lazy(() =>
  import('./pages/HeroIntroPage').then((m) => ({ default: m.HeroIntroPage }))
);
const WhyPage = lazy(() =>
  import('./pages/WhyPage').then((m) => ({ default: m.WhyPage }))
);
const AttractionsPage = lazy(() =>
  import('./pages/AttractionsPage').then((m) => ({ default: m.AttractionsPage }))
);
const LuxuryPage = lazy(() =>
  import('./pages/LuxuryPage').then((m) => ({ default: m.LuxuryPage }))
);
const DiningPage = lazy(() =>
  import('./pages/DiningPage').then((m) => ({ default: m.DiningPage }))
);
const RetailPage = lazy(() =>
  import('./pages/RetailPage').then((m) => ({ default: m.RetailPage }))
);
const ScalePage = lazy(() =>
  import('./pages/ScalePage').then((m) => ({ default: m.ScalePage }))
);
const EventsPlatformPage = lazy(() =>
  import('./pages/EventsPlatformPage').then((m) => ({ default: m.EventsPlatformPage }))
);
const EventsModulePage = lazy(() =>
  import('./pages/EventsModulePage').then((m) => ({ default: m.EventsModulePage }))
);
const PartnerPage = lazy(() =>
  import('./pages/PartnerPage').then((m) => ({ default: m.PartnerPage }))
);

function PageFallback() {
  return <div className="loader-screen" aria-busy="true" />;
}

export default function App() {
  return (
    <ManifestProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DeckShell />}>
            <Route
              index
              element={
                <Suspense fallback={<PageFallback />}>
                  <HeroIntroPage />
                </Suspense>
              }
            />
            <Route path="hub" element={<HubPage />} />
            <Route
              path="intro"
              element={
                <Suspense fallback={<PageFallback />}>
                  <HeroIntroPage />
                </Suspense>
              }
            />
            <Route
              path="why"
              element={
                <Suspense fallback={<PageFallback />}>
                  <WhyPage />
                </Suspense>
              }
            />
            <Route
              path="attractions"
              element={
                <Suspense fallback={<PageFallback />}>
                  <AttractionsPage />
                </Suspense>
              }
            />
            <Route
              path="luxury"
              element={
                <Suspense fallback={<PageFallback />}>
                  <LuxuryPage />
                </Suspense>
              }
            />
            <Route
              path="dining"
              element={
                <Suspense fallback={<PageFallback />}>
                  <DiningPage />
                </Suspense>
              }
            />
            <Route
              path="retail"
              element={
                <Suspense fallback={<PageFallback />}>
                  <RetailPage />
                </Suspense>
              }
            />
            <Route
              path="scale"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ScalePage />
                </Suspense>
              }
            />
            <Route
              path="events"
              element={
                <Suspense fallback={<PageFallback />}>
                  <EventsPlatformPage />
                </Suspense>
              }
            />
            <Route
              path="events/module"
              element={
                <Suspense fallback={<PageFallback />}>
                  <EventsModulePage />
                </Suspense>
              }
            />
            <Route
              path="partner"
              element={
                <Suspense fallback={<PageFallback />}>
                  <PartnerPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ManifestProvider>
  );
}

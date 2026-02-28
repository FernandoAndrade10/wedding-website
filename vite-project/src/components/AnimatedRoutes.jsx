import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from '../pages/Home';
const RSVP = lazy(() => import('../pages/RSVP'));
const Gallery = lazy(() => import('../pages/Gallery'));
const About = lazy(() => import('../pages/About'));
const Gifts = lazy(() => import('../pages/Gifts'));
const Location = lazy(() => import('../pages/Location'));
const Attire = lazy(() => import('../pages/Attire'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Confirmation = lazy(() => import('../pages/Confirmation'));
const AdminPanel = lazy(() => import('./AdminPanel'));
const Privacy = lazy(() => import('../pages/Privacy'));
const Terms = lazy(() => import('../pages/Terms'));

function withSuspense(component) {
  return <Suspense fallback={null}>{component}</Suspense>;
}

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={withSuspense(<Home />)} />
        <Route path="/rsvp" element={withSuspense(<RSVP />)} />
        <Route path="/gallery" element={withSuspense(<Gallery />)} />
        <Route path="/about" element={withSuspense(<About />)} />
        <Route path="/gifts" element={withSuspense(<Gifts />)} />
        <Route path="/location" element={withSuspense(<Location />)} />
        <Route path="/attire" element={withSuspense(<Attire />)} />
        <Route path="/confirmation" element={withSuspense(<Confirmation />)}/>
        <Route path='/admin' element={withSuspense(<AdminPanel />)} />
        <Route path='/privacy' element={withSuspense(<Privacy />)} />
        <Route path='/terms' element={withSuspense(<Terms />)} />
        <Route path="*" element={withSuspense(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
}

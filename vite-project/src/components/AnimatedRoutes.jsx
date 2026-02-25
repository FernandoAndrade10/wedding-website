import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from '../pages/Home';
import RSVP from '../pages/RSVP';
import Gallery from '../pages/Gallery';
import About from '../pages/About';
import Gifts from '../pages/Gifts';
import Location from '../pages/Location';
import Attire from '../pages/Attire';
import NotFound from '../pages/NotFound';
import Confirmation from '../pages/Confirmation';
import AdminPanel from './AdminPanel';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/location" element={<Location />} />
        <Route path="/attire" element={<Attire />} />
        <Route path="/confirmation" element={<Confirmation />}/>
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/terms' element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'
import AnimatedRoutes from './components/AnimatedRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className='flex flex-col min-h-screen'>
        <Navbar />

        <main className='flex-grow'>
          <AnimatedRoutes />
          <ToastContainer 
            position='bottom-center' 
            autoClose={1500} 
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastClassName={(context) =>
              context?.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300 rounded-md p-3'
                : context?.type === 'error'
                ? 'bg-red-100 text-red-800 border border-red-300 rounded-md p-3'
                : 'bg-white text-gray-800 border rounded-md p-3'
            }
          />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App

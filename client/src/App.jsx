import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen font-inter bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;

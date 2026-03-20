import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <main className="max-w-6xl mx-auto px-6 py-8">
      {children}
    </main>
  </div>
);

export default Layout;

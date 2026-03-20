import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const NAV_LINKS = [
  { path: '/analyzer',  label: 'Analyzer' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/history',   label: 'History' },
  { path: '/profile',   label: 'Profile' },
];

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <span className="font-semibold text-slate-800 text-sm">Code Mentor</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ path, label }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}>
                {label}
              </Link>
            );
          })}
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 hidden sm:block">{user?.name}</span>
          <button onClick={handleLogout}
            className="text-sm text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-all duration-150">
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

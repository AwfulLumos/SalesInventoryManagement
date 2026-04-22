import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const REDIRECT_DELAY_MS = 2500;

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  useEffect(() => {
    logout();
    setDone(true);
  }, [logout]);

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [done, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffdf1] flex items-center justify-center transition-opacity duration-1000">
      {/* Calm exit ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#ffce99]/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-[#ff9644]/10 blur-[120px] animate-pulse" style={{ animationDelay: '1000ms' }} />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center animate-fade-up">
        
        {/* Elegant Exit Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#ffce99]/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative h-24 w-24 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-[#ffce99]/40 shadow-[0_20px_40px_-15px_rgba(86,47,0,0.05)]">
            <div className="absolute inset-[6px] rounded-full border-2 border-transparent border-t-[#ff9644] animate-spin" />
            <LogOut className="h-8 w-8 text-[#562f00] ml-1" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#562f00] mb-3">
          Signing You Out
        </h1>

        <p className="text-sm font-medium text-[#562f00]/60 mb-10 max-w-[250px] leading-relaxed">
          Saving session and closing workspace...
        </p>

        {/* Secure badge */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-sm rounded-full border border-[#ffce99]/40 shadow-[0_4px_15px_-5px_rgba(86,47,0,0.05)] animate-fade-up" style={{ animationDelay: '200ms' }}>
          <ShieldCheck className="h-4 w-4 text-[#ff9644]" />
          <span className="text-[11px] font-bold text-[#562f00]/80 tracking-widest uppercase">Secure Exit</span>
        </div>
      </div>
    </div>
  );
}

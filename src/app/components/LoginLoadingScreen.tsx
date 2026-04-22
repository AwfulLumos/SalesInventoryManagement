import { Package, BarChart3, PieChart, ShieldCheck } from 'lucide-react';

interface LoginLoadingScreenProps {
  userName?: string;
}

export default function LoginLoadingScreen({ userName }: LoginLoadingScreenProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffdf1] flex items-center justify-center">
      {/* Premium ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#ffce99]/25 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#ff9644]/15 blur-[120px] animate-pulse" style={{ animationDelay: '1000ms' }} />
      </div>

      {/* Floating subtle business icons */}
      <Package className="absolute left-[15%] top-[25%] h-10 w-10 text-[#562f00]/5 animate-float-slow" />
      <BarChart3 className="absolute right-[20%] top-[30%] h-12 w-12 text-[#562f00]/5 animate-float-slower" />
      <PieChart className="absolute left-[20%] bottom-[25%] h-8 w-8 text-[#562f00]/5 animate-float" />
      <ShieldCheck className="absolute right-[15%] bottom-[30%] h-10 w-10 text-[#562f00]/5 animate-float-slow" />

      <div className="relative z-10 w-full max-w-md p-10 md:p-12 flex flex-col items-center text-center bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_30px_60px_-20px_rgba(86,47,0,0.08)] rounded-[2.5rem]">
        {/* Pulsing business logo/icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#ff9644]/25 rounded-2xl blur-xl animate-pulse" />
          <div className="relative h-20 w-20 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#ff9644] to-[#ffce99] shadow-lg shadow-[#ff9644]/20 border border-white/40">
            <ShieldCheck className="h-10 w-10 text-[#fffdf1]" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#562f00] mb-2 animate-fade-up">
          Signing You In
        </h1>

        <p className="text-sm font-medium text-[#562f00]/60 mb-10 animate-fade-up" style={{ animationDelay: '100ms' }}>
          Verifying account and preparing workspace...
        </p>

        {/* Modern Loader */}
        <div className="w-full max-w-[220px] mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="h-1.5 w-full bg-[#ffce99]/30 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-[#ff9644] rounded-full animate-loading-bar" />
          </div>
        </div>

        {/* Optional welcome back message if userName exists */}
        {userName && (
          <div className="mt-2 text-sm font-semibold text-[#562f00]/70 bg-[#ffce99]/15 border border-[#ffce99]/30 px-5 py-2 rounded-full animate-fade-up" style={{ animationDelay: '300ms' }}>
            Welcome back, {userName.split(' ')[0]}
          </div>
        )}
      </div>
    </div>
  );
}

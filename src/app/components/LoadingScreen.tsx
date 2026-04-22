import { BarChart3, Package, ReceiptText, TrendingUp } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffdf1] via-[#fff6e5] to-[#ffce99]/55" />

      {/* Soft abstract business-inspired background patterns */}
      <div className="absolute inset-0 opacity-[0.14]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(86,47,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(86,47,0,0.06) 1px, transparent 1px)',
            backgroundSize: '42px 42px, 42px 42px',
          }}
        />
      </div>
      <div className="absolute inset-0 opacity-[0.1]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,150,68,0.18) 0 2px, transparent 2px 12px)',
          }}
        />
      </div>

      {/* Floating low-opacity feature hints */}
      <Package className="absolute left-[14%] top-[26%] h-8 w-8 text-[#562f00]/25 animate-float-slow" />
      <BarChart3 className="absolute right-[18%] top-[28%] h-8 w-8 text-[#562f00]/25 animate-float-slower" />
      <ReceiptText className="absolute left-[20%] bottom-[28%] h-8 w-8 text-[#562f00]/20 animate-float-slower" />
      <TrendingUp className="absolute right-[15%] bottom-[24%] h-8 w-8 text-[#562f00]/20 animate-float-slow" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mx-auto mb-6 rounded-3xl border border-[#ffce99]/70 bg-card p-5 shadow-[0_24px_50px_-20px_rgba(86,47,0,0.45)] animate-fade-up">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffce99] to-[#fffdf1]">
            <Package className="h-10 w-10 text-[#ff9644]" />
            <BarChart3 className="absolute -right-1 -top-1 h-5 w-5 text-[#562f00]" />
          </div>
        </div>

        <h1 className="max-w-2xl text-balance text-2xl font-semibold tracking-[0.08em] text-[#562f00] md:text-3xl animate-fade-up">
          Sales & Inventory Management System
        </h1>

        <p className="mt-3 text-sm text-[#562f00]/65 md:text-base animate-fade-up">
          Preparing dashboard, products, and reports...
        </p>

        <div className="mt-7 w-full max-w-sm animate-fade-up">
          <div className="h-1.5 overflow-hidden rounded-full bg-[#ffce99] shadow-inner">
            <div className="h-full w-2/5 rounded-full bg-[#ff9644] animate-loading-bar" />
          </div>
        </div>
      </div>

      <p className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-xs tracking-wide text-[#562f00]/55">
        Syncing inventory data...
      </p>
    </div>
  );
}

import React from 'react';
import { Bell, Database, Globe, Lock, Printer, Store, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const inputCls = 'w-full rounded-lg border border-border bg-input-background px-3 py-2 text-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm transition-colors';

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
      <div className="h-6 w-11 rounded-full bg-muted transition-colors peer-checked:bg-primary relative after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-full peer-focus:ring-2 peer-focus:ring-primary/30" />
    </label>
  );
}

function SettingsCard({
  icon, title, subtitle, accent = false, children,
}: {
  icon: React.ReactNode; title: string; subtitle: string; accent?: boolean; children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border shadow overflow-hidden ${accent ? 'border-destructive/30' : 'border-border/60'} bg-card`}>
      {/* Card header */}
      <div className={`flex items-center gap-3 px-6 py-4 border-b ${accent ? 'border-destructive/20 bg-destructive/5' : 'border-border/40 bg-muted/20'}`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent ? 'bg-destructive/10' : 'bg-primary/10'}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-base leading-tight">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
  );
}

function ToggleRow({ label, desc, defaultChecked = false }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <Toggle defaultChecked={defaultChecked} />
    </div>
  );
}

export default function Settings() {
  const handleSave = () => toast.success('Settings saved successfully!');

  return (
    <div className="max-w-4xl space-y-5">

      {/* Store Info */}
      <SettingsCard icon={<Store className="text-primary" size={22} />} title="Store Information" subtitle="Basic details about your pet shop">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Store Name</label>
            <input type="text" defaultValue="PetShop POS" className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Business Type</label>
            <select className={inputCls}>
              <option>Pet Supply Store</option>
              <option>Veterinary Clinic</option>
              <option>Pet Grooming Salon</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Address</label>
          <input type="text" defaultValue="123 Main Street, Quezon City, Metro Manila" className={inputCls} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Phone Number</label>
            <input type="text" defaultValue="(02) 8123-4567" className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input type="email" defaultValue="info@petshop.com" className={inputCls} />
          </div>
        </div>
      </SettingsCard>

      {/* Receipt Settings */}
      <SettingsCard icon={<Printer className="text-primary" size={22} />} title="Receipt Settings" subtitle="Configure receipt printing options">
        <ToggleRow label="Auto-print receipts" desc="Automatically print receipt after each transaction" defaultChecked />
        <div className="border-t border-border/40" />
        <ToggleRow label="Include store logo" desc="Show store logo on printed receipts" defaultChecked />
        <div>
          <label className="mb-1.5 block text-sm font-medium">Receipt Footer Message</label>
          <textarea defaultValue="Thank you for shopping with us! Visit us again soon!" rows={3} className={inputCls} />
        </div>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard icon={<Bell className="text-primary" size={22} />} title="Notifications & Alerts" subtitle="Manage system notifications">
        <ToggleRow label="Low stock alerts"    desc="Get notified when products are running low"   defaultChecked />
        <div className="border-t border-border/40" />
        <ToggleRow label="Expiry date alerts"  desc="Alert when products are near expiry date"     defaultChecked />
        <div className="border-t border-border/40" />
        <ToggleRow label="Daily sales summary" desc="Receive end-of-day sales report" />
      </SettingsCard>

      {/* Loyalty Program */}
      <SettingsCard icon={<Database className="text-primary" size={22} />} title="Loyalty Program" subtitle="Configure customer rewards system">
        <ToggleRow label="Enable loyalty program" desc="Allow customers to earn and redeem points" defaultChecked />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Points per ₱1 spent</label>
            <input type="number" defaultValue="1" className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Points value (₱)</label>
            <input type="number" defaultValue="0.10" step="0.01" className={inputCls} />
          </div>
        </div>
        {/* Summary callout */}
        <div className="flex items-start gap-3 p-3 bg-primary/8 border border-primary/20 rounded-lg">
          <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Customers earn <strong>1 point per ₱1</strong> spent. Every <strong>1,000 points</strong> is worth <strong>₱100</strong> in discounts.
          </p>
        </div>
      </SettingsCard>

      {/* Security */}
      <SettingsCard icon={<Lock className="text-destructive" size={22} />} title="Security" subtitle="System security settings" accent>
        <ToggleRow label="Require password for voids/refunds" desc="Admin password needed for transaction voids" defaultChecked />
        <div>
          <label className="mb-1.5 block text-sm font-medium">Session timeout (minutes)</label>
          <select className={inputCls}>
            <option>15</option>
            <option>30</option>
            <option>60</option>
            <option>Never</option>
          </select>
        </div>
      </SettingsCard>

      {/* Regional */}
      <SettingsCard icon={<Globe className="text-primary" size={22} />} title="Regional Settings" subtitle="Localization preferences">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Currency</label>
            <select className={inputCls}>
              <option>PHP — Philippine Peso (₱)</option>
              <option>USD — US Dollar ($)</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Timezone</label>
            <select className={inputCls}>
              <option>Asia/Manila (GMT+8)</option>
              <option>UTC</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Date Format</label>
          <select className={inputCls}>
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>
      </SettingsCard>

      {/* Save bar */}
      <div className="flex justify-end gap-3 pb-2">
        <button className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted/40 transition-colors">
          Cancel
        </button>
        <button onClick={handleSave}
          className="rounded-lg bg-primary px-6 py-2.5 text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
          Save Settings
        </button>
      </div>
    </div>
  );
}

import { Bell, Database, Globe, Lock, Printer, Store } from 'lucide-react';
import { toast } from 'sonner';

const inputClassName =
  'w-full rounded-lg border border-border bg-input-background px-3 py-2 text-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/40';

const toggleClassName =
  "h-6 w-11 rounded-full bg-muted peer after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:ring-2 peer-focus:ring-primary/30";

function SettingsCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-card p-6 shadow">
      <div className="mb-6 flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <SettingsCard
        icon={<Store className="text-primary" size={28} />}
        title="Store Information"
        subtitle="Basic details about your pet shop"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Store Name</label>
              <input type="text" defaultValue="PetShop POS" className={inputClassName} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Business Type</label>
              <select className={inputClassName}>
                <option>Pet Supply Store</option>
                <option>Veterinary Clinic</option>
                <option>Pet Grooming Salon</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Address</label>
            <input
              type="text"
              defaultValue="123 Main Street, Quezon City, Metro Manila"
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Phone Number</label>
              <input type="text" defaultValue="(02) 8123-4567" className={inputClassName} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input type="email" defaultValue="info@petshop.com" className={inputClassName} />
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={<Printer className="text-primary" size={28} />}
        title="Receipt Settings"
        subtitle="Configure receipt printing options"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-print receipts</p>
              <p className="text-sm text-muted-foreground">Automatically print receipt after each transaction</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className={toggleClassName} />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Include store logo</p>
              <p className="text-sm text-muted-foreground">Show store logo on printed receipts</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className={toggleClassName} />
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Receipt Footer Message</label>
            <textarea
              defaultValue="Thank you for shopping with us! Visit us again soon!"
              rows={3}
              className={inputClassName}
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={<Bell className="text-primary" size={28} />}
        title="Notifications & Alerts"
        subtitle="Manage system notifications"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Low stock alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className={toggleClassName} />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Expiry date alerts</p>
              <p className="text-sm text-muted-foreground">Alert when products are near expiry date</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className={toggleClassName} />
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily sales summary</p>
              <p className="text-sm text-muted-foreground">Receive end-of-day sales report</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className={toggleClassName} />
            </label>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={<Database className="text-primary" size={28} />}
        title="Loyalty Program"
        subtitle="Configure customer rewards system"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable loyalty program</p>
              <p className="text-sm text-muted-foreground">Allow customers to earn and redeem points</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className={toggleClassName} />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Points per P1 spent</label>
              <input type="number" defaultValue="1" className={inputClassName} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Points value (P)</label>
              <input type="number" defaultValue="0.10" step="0.01" className={inputClassName} />
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={<Lock className="text-destructive" size={28} />}
        title="Security"
        subtitle="System security settings"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Require password for voids/refunds</p>
              <p className="text-sm text-muted-foreground">Admin password needed for transaction voids</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className={toggleClassName} />
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Session timeout (minutes)</label>
            <select className={inputClassName}>
              <option>15</option>
              <option>30</option>
              <option>60</option>
              <option>Never</option>
            </select>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={<Globe className="text-primary" size={28} />}
        title="Regional Settings"
        subtitle="Localization preferences"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Currency</label>
              <select className={inputClassName}>
                <option>PHP - Philippine Peso (P)</option>
                <option>USD - US Dollar ($)</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Timezone</label>
              <select className={inputClassName}>
                <option>Asia/Manila (GMT+8)</option>
                <option>UTC</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Date Format</label>
            <select className={inputClassName}>
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </SettingsCard>

      <div className="flex justify-end gap-3">
        <button className="rounded-lg border border-border px-6 py-2 hover:bg-muted/40">Cancel</button>
        <button
          onClick={handleSave}
          className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

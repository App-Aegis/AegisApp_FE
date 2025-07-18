import { v4 as uuidv4 } from 'uuid';

// Payment status type
export type PaymentStatus = 'pending' | 'paid' | 'cancelled' | 'expired';

// Payment record type
export interface PaymentRecord {
  Id: string; // Guid
  SubscriptionId: string;
  ParentId: string;
  Amount: number;
  Currency: 'VND';
  PaymentMethod: 'payos';
  Status: PaymentStatus;
  PaymentDate?: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
  PayOSOrderCode: string;
  PayOSTransactionId: string;
  QRCodeUrl: string;
  CheckoutUrl: string;
  CustomerName: string;
  CustomerEmail: string;
  PlanName: string;
}

// Helper functions for random data
type Plan = { name: string; amount: number };
const plans: Plan[] = [
  { name: 'Basic Plan', amount: 99000 },
  { name: 'Premium Plan', amount: 199000 },
  { name: 'Family Plan', amount: 299000 },
];
const names = [
  'Nguyen Van A', 'Tran Thi B', 'Le Quang C', 'Pham Minh D', 'Hoang Anh E',
  'Bui Thi F', 'Doan Van G', 'Vu Thi H', 'Phan Quoc I', 'Dang Thi J',
  'Ngo Van K', 'Dinh Thi L', 'Trinh Van M', 'Cao Thi N', 'Chu Van O',
  'Mai Thi P', 'Duong Van Q', 'Kieu Thi R', 'Ta Van S', 'Ton Nu T',
  'Ly Van U', 'Luu Thi V', 'Phung Van W', 'Quach Thi X', 'Trieu Van Y',
  'Vuong Thi Z', 'Phung Van AA', 'Nguyen Thi BB', 'Tran Van CC', 'Le Thi DD',
];
const emails = names.map((n, i) => `user${i + 1}@example.com`);

function randomDateInLast6Months(): Date {
  const now = new Date();
  const past = new Date(now);
  past.setMonth(now.getMonth() - 6);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
}

function randomStatus(): PaymentStatus {
  const r = Math.random();
  if (r < 0.7) return 'paid';
  if (r < 0.9) return 'pending';
  return Math.random() < 0.5 ? 'cancelled' : 'expired';
}

function pad(num: number, size: number) {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

export const paymentRecords: PaymentRecord[] = Array.from({ length: 30 }, (_, i) => {
  const plan = plans[Math.floor(Math.random() * plans.length)];
  const status = randomStatus();
  const createdAt = randomDateInLast6Months();
  const updatedAt = new Date(createdAt.getTime() + Math.random() * 1000 * 60 * 60 * 24 * 30);
  const paymentDate = status === 'paid' ? new Date(createdAt.getTime() + Math.random() * 1000 * 60 * 60 * 24 * 5) : undefined;
  const id = uuidv4();
  const subscriptionId = uuidv4();
  const parentId = uuidv4();
  return {
    Id: id,
    SubscriptionId: subscriptionId,
    ParentId: parentId,
    Amount: plan.amount,
    Currency: 'VND',
    PaymentMethod: 'payos',
    Status: status,
    PaymentDate: paymentDate,
    CreatedAt: createdAt,
    UpdatedAt: updatedAt,
    PayOSOrderCode: `ORD-2024-${pad(1000 + i, 6)}`,
    PayOSTransactionId: `TXN-2024-${pad(1000 + i, 6)}`,
    QRCodeUrl: `https://fake.qr/${id}`,
    CheckoutUrl: `https://fake.checkout/${id}`,
    CustomerName: names[i % names.length],
    CustomerEmail: emails[i % emails.length],
    PlanName: plan.name,
  };
});

// ---
// Usage: import { paymentRecords } from './paymentsData';
// --- 
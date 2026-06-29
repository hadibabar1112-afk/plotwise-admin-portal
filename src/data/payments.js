export const PAYMENTS_TO_CREATORS = [
  { id: "p1", creatorId: "maya-chen", creatorName: "Maya Chen", campaign: "Aurelia · Dehydration Reframe", amount: 450, status: "pending", expectedDate: "On approval", reference: null },
  { id: "p2", creatorId: "maya-chen", creatorName: "Maya Chen", campaign: "Lumen Co. · Acid Mythbusting", amount: 500, status: "pending", expectedDate: "On approval", reference: null },
  { id: "p3", creatorId: "jade-liu", creatorName: "Jade Liu", campaign: "Bloomline · Founder Transparency", amount: 480, status: "pending", expectedDate: "On approval", reference: null },
  { id: "p4", creatorId: "sofia-rodriguez", creatorName: "Sofia Rodriguez", campaign: "Salt & Sea · Cost Per Use", amount: 520, status: "pending", expectedDate: "On approval", reference: null },
  { id: "p5", creatorId: "ella-kim", creatorName: "Ella Kim", campaign: "Aurelia · Timeline Honesty", amount: 420, status: "processing", expectedDate: "Jun 30, 2026", reference: "WIRE-2026-0627-EK" },
  { id: "p6", creatorId: "maya-chen", creatorName: "Maya Chen", campaign: "Aurelia · Timeline Honesty", amount: 450, status: "paid", paidDate: "Jan 19, 2026", reference: "WIRE-2026-0116-MC" },
  { id: "p7", creatorId: "jade-liu", creatorName: "Jade Liu", campaign: "Lumen Co. · Brand Intro", amount: 480, status: "paid", paidDate: "Dec 22, 2025", reference: "WIRE-2025-1220-JL" },
  { id: "p8", creatorId: "maya-chen", creatorName: "Maya Chen", campaign: "Salt & Sea · Cost Per Use Math", amount: 425, status: "paid", paidDate: "Dec 28, 2025", reference: "WIRE-2025-1223-MC" },
];

export const PAYMENTS_FROM_CLIENTS = [
  { id: "c1", clientId: "aurelia", clientName: "Aurelia Skincare", campaign: "Dehydration Reframe", amount: 1800, status: "paid", paidDate: "Feb 8, 2026", reference: "INV-2026-0141" },
  { id: "c2", clientId: "aurelia", clientName: "Aurelia Skincare", campaign: "Timeline Honesty", amount: 1680, status: "paid", paidDate: "Dec 8, 2025", reference: "INV-2025-0088" },
  { id: "c3", clientId: "aurelia", clientName: "Aurelia Skincare", campaign: "SPF Daily", amount: 3200, status: "awaiting", paidDate: null, reference: "INV-2026-0162" },
  { id: "c4", clientId: "lumen", clientName: "Lumen Co.", campaign: "Acid Mythbusting", amount: 2000, status: "paid", paidDate: "Feb 16, 2026", reference: "INV-2026-0138" },
  { id: "c5", clientId: "lumen", clientName: "Lumen Co.", campaign: "Brand Intro", amount: 1960, status: "paid", paidDate: "Nov 28, 2025", reference: "INV-2025-0079" },
  { id: "c6", clientId: "bloomline", clientName: "Bloomline", campaign: "Founder Transparency", amount: 850, status: "partial", paidDate: "Jan 3, 2026", reference: "INV-2026-0108" },
  { id: "c7", clientId: "saltsea", clientName: "Salt & Sea", campaign: "Cost Per Use", amount: 1040, status: "paid", paidDate: "Jun 8, 2026", reference: "INV-2026-0158" },
];

/**
 * PAZARVADI E-COMMERCE CORE CLIENT ENGINE (V2 ENHANCED)
 * Rich animations, guaranteed icons, social proof toasts, full-featured cart & wishlist
 */

const Pazarvadi = {
  // Built-in crisp SVG dictionary for 100% reliable icon rendering (even without external network)
  icons: {
    'star': '<svg class="{CLASS} fill-amber-400 text-amber-400" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    'star-outline': '<svg class="{CLASS} text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    'heart': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    'heart-fill': '<svg class="{CLASS} fill-rose-500 text-rose-500" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    'shopping-bag': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    'shopping-cart': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
    'search': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
    'truck': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5.28a2 2 0 0 0-.8-1.6l-3.2-2.4a2 2 0 0 0-1.2-.42H14"/><circle cx="17" cy="18.5" r="2.5"/><circle cx="7" cy="18.5" r="2.5"/></svg>',
    'shield-check': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    'shield': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
    'refresh-cw': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>',
    'rotate-ccw': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    'lock': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    'user': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    'check': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    'check-circle': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    'flame': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    'zap': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    'arrow-right': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    'arrow-left': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>',
    'chevron-right': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    'chevron-left': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    'chevron-down': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    'chevron-up': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>',
    'x': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    'plus': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    'minus': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
    'trash-2': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>',
    'sliders-horizontal': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>',
    'eye': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    'laptop': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="4" rx="2"/><path d="M2 20h20"/></svg>',
    'shirt': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>',
    'coffee': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>',
    'activity': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    'sparkles': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/><path d="M5 3v4"/><path d="M19 17v4"/></svg>',
    'package': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    'package-open': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-9"/><path d="M15.14 2.29 18 6.5l-3.3 2.1"/><path d="m20.5 4 2.5 3.5-3.3 2.1"/><path d="m2 10 10 5 10-5"/><path d="m3.5 12.5 8.5 4.5 8.5-4.5"/><path d="M12 22 2 17V7.5L5.5 3l4.5 3"/></svg>',
    'credit-card': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>',
    'phone': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    'mail': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    'map-pin': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    'clock': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    'grid': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
    'layout-grid': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
    'tag': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r=".5" fill="currentColor"/></svg>',
    'log-out': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
    'copy': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    'help-circle': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>',
    'trending-up': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    'award': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
    'gift': '<svg class="{CLASS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>'
  },

  // Helper to fetch an SVG string with custom classes
  icon(name, customClass = 'w-4 h-4') {
    if (!name) return '';
    let key = name.toLowerCase().trim();
    if (key === 'heartfilled') key = 'heart-fill';
    if (key === 'shoppingbag') key = 'shopping-bag';
    if (key === 'shoppingcart') key = 'shopping-cart';
    if (key === 'cart') key = 'shopping-bag';
    if (key === 'filter') key = 'sliders-horizontal';
    if (key === 'trash') key = 'trash-2';
    if (key === 'refresh') key = 'refresh-cw';
    if (key === 'arrowright') key = 'arrow-right';
    if (key === 'checkcircle') key = 'check-circle';

    const tpl = this.icons[key] || this.icons['star'];
    return tpl.replace('{CLASS}', customClass);
  },

  // Offline fallback database for direct file opening (file:///)
  offlineData: {
    categories: [
      { id: 1, name: "Elektronik & Teknoloji", slug: "elektronik-teknoloji", product_count: 3, icon: "laptop", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" },
      { id: 2, name: "Moda & Aksesuar", slug: "moda-aksesuar", product_count: 2, icon: "shirt", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80" },
      { id: 3, name: "Ev, Yaşam & Mutfak", slug: "ev-yasam-mutfak", product_count: 2, icon: "home", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80" },
      { id: 4, name: "Spor & Outdoor", slug: "spor-outdoor", product_count: 1, icon: "activity", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80" },
      { id: 5, name: "Kozmetik & Bakım", slug: "kozmetik-bakim", product_count: 1, icon: "sparkles", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80" }
    ],
    products: [
      {
        id: 1,
        category_id: 1,
        category_name: "Elektronik & Teknoloji",
        category_slug: "elektronik-teknoloji",
        name: "Pazarvadi Pro ANC Kablosuz Kulak Üstü Kulaklık",
        slug: "pazarvadi-pro-anc-kablosuz-kulaklik",
        short_desc: "Aktif Gürültü Engelleme (ANC), 45 Saat Pil Ömrü, Hi-Res Audio ve Şeffaf Mod",
        description: "Pazarvadi Pro ANC, müziği tüm ayrıntılarıyla hissetmeniz için tasarlandı. 40mm dinamik sürücüler, çift mikrofonlu hibrit gürültü engelleme sistemi ve ultra yumuşak protein deri kulak yastıkları ile gün boyu kesintisiz stüdyo kalitesinde konfor sunar.",
        price: 3499.00,
        compare_at_price: 4299.00,
        sku: "PZR-TECH-001",
        stock: 45,
        rating: 4.9,
        review_count: 128,
        badge: "Fırsat",
        is_featured: 1,
        is_bestseller: 1,
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80"
        ],
        specs: { "Bağlantı": "Bluetooth 5.3", "Pil Ömrü": "45 Saat", "Sürücü": "40mm Biyoselüloz Titanyum", "Garanti": "2 Yıl Pazarvadi Garantili" }
      },
      {
        id: 2,
        category_id: 1,
        category_name: "Elektronik & Teknoloji",
        category_slug: "elektronik-teknoloji",
        name: "Pazarvadi Chrono Ultra Akıllı Titanyum Saat",
        slug: "pazarvadi-chrono-ultra-akilli-saat",
        short_desc: "1.43 inç AMOLED Ekran, Safir Cam, EKG + Kandaki Oksijen Sensörü, Titanyum Kasa",
        description: "Hem toplantı odasında hem doğa maceralarında yanınızda. Safir cam ve havacılık sınıfı titanyum kasa ile darbelere karşı dayanıklı.",
        price: 5890.00,
        compare_at_price: 6990.00,
        sku: "PZR-TECH-002",
        stock: 28,
        rating: 4.8,
        review_count: 84,
        badge: "Çok Satan",
        is_featured: 1,
        is_bestseller: 1,
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"],
        specs: { "Ekran": "1.43 AMOLED", "Pil Ömrü": "14 Gün", "Kasa": "Titanyum" }
      },
      {
        id: 3,
        category_id: 1,
        category_name: "Elektronik & Teknoloji",
        category_slug: "elektronik-teknoloji",
        name: "Pazarvadi Pods Pro True Wireless Kulaklık",
        slug: "pazarvadi-pods-pro-kablosuz-kulaklik",
        short_desc: "Uzamsal Ses, Kablosuz Şarj Kutusu, Kristal Netliğinde Mikrofon",
        description: "Cebinizdeki dev ses performansı. Ergonomik tasarımı kulağınıza tam oturur, IPX5 ter ve su sıçramalarına dayanıklıdır.",
        price: 1899.00,
        compare_at_price: 2450.00,
        sku: "PZR-TECH-003",
        stock: 60,
        rating: 4.7,
        review_count: 96,
        badge: "Yeni",
        is_featured: 0,
        is_bestseller: 1,
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"],
        specs: { "Bluetooth": "5.4", "Pil": "32 Saat", "Şarj": "Kablosuz Qi" }
      },
      {
        id: 4,
        category_id: 2,
        category_name: "Moda & Aksesuar",
        category_slug: "moda-aksesuar",
        name: "Pazarvadi Heritage El Yapımı Hakiki Deri Sırt Çantası",
        slug: "pazarvadi-heritage-hakiki-deri-sirt-cantasi",
        short_desc: "16 Laptop Bölmeli, Vintage Tabaklanmış Dana Derisi, Su İtici Astar",
        description: "Zamanla güzelleşen el işçiliğiyle üretilmiş vejetal hakiki dana derisi sırt çantası.",
        price: 4750.00,
        compare_at_price: 5900.00,
        sku: "PZR-MODA-001",
        stock: 15,
        rating: 5.0,
        review_count: 42,
        badge: "Özel Tasarım",
        is_featured: 1,
        is_bestseller: 0,
        images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"],
        specs: { "Malzeme": "%100 Hakiki Deri", "Laptop Boyutu": "16 inç", "Kapasite": "22 Litre" }
      },
      {
        id: 5,
        category_id: 2,
        category_name: "Moda & Aksesuar",
        category_slug: "moda-aksesuar",
        name: "Pazarvadi Minimalist Polarize Güneş Gözlüğü (Mat Siyah)",
        slug: "pazarvadi-minimalist-polarize-gunes-gozlugu",
        short_desc: "UV400 Koruma, Japon Titanyum Çerçeve, Çizilmeye Dayanıklı Polarize Cam",
        description: "Ultra hafif titanyum gövdesi burunda ağırlık yapmaz. Deri kılıf hediyelidir.",
        price: 1599.00,
        compare_at_price: 1999.00,
        sku: "PZR-MODA-002",
        stock: 35,
        rating: 4.8,
        review_count: 53,
        badge: "Trend",
        is_featured: 1,
        is_bestseller: 1,
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80"],
        specs: { "Cam": "UV400 Polarize", "Gövde": "Titanyum Alaşım" }
      },
      {
        id: 6,
        category_id: 3,
        category_name: "Ev, Yaşam & Mutfak",
        category_slug: "ev-yasam-mutfak",
        name: "Pazarvadi Barista Touch Otomatik Espresso & Kahve Makinesi",
        slug: "pazarvadi-barista-touch-kahve-makinesi",
        short_desc: "19 Bar İtalyan Pompa, Dahili Konik Çelik Değirmen, Profesyonel Süt Köpürtücü",
        description: "Evinizi üçüncü nesil bir kahve dükkanına dönüştürün. Çekirdekten fincana taze öğütüm.",
        price: 14490.00,
        compare_at_price: 17900.00,
        sku: "PZR-HOME-001",
        stock: 12,
        rating: 4.9,
        review_count: 67,
        badge: "Fırsat",
        is_featured: 1,
        is_bestseller: 1,
        images: ["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80"],
        specs: { "Basınç": "19 Bar", "Değirmen": "15 Kademeli Çelik", "Su Haznesi": "2.0 Litre" }
      },
      {
        id: 7,
        category_id: 3,
        category_name: "Ev, Yaşam & Mutfak",
        category_slug: "ev-yasam-mutfak",
        name: "Pazarvadi CleanBot X10 Lidar Lazer Robot Süpürge",
        slug: "pazarvadi-cleanbot-x10-robot-supurge",
        short_desc: "6000 Pa Emiş Gücü, Sonic Titreşimli Mop, Otomatik Toz Boşaltma İstasyonu",
        description: "3D lazer navigasyon ve yapay zeka engel tanıma ile kablolara takılmaz.",
        price: 18990.00,
        compare_at_price: 22500.00,
        sku: "PZR-HOME-002",
        stock: 18,
        rating: 4.9,
        review_count: 88,
        badge: "Çok Satan",
        is_featured: 1,
        is_bestseller: 1,
        images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"],
        specs: { "Emiş Gücü": "6000 Pa", "Navigasyon": "LDS Lidar + AI 3D", "İstasyon": "4 Litre Otomatik Boşaltma" }
      },
      {
        id: 8,
        category_id: 4,
        category_name: "Spor & Outdoor",
        category_slug: "spor-outdoor",
        name: "Pazarvadi Aero Vakumlu Çift Katman Çelik Termos (1000 ml)",
        slug: "pazarvadi-aero-vakumlu-celik-termos-1000ml",
        short_desc: "24 Saat Soğuk, 12 Saat Sıcak Tutar, 18/8 Gıda Sınıfı Çelik, Sızdırmaz Kapak",
        description: "Çift duvarlı vakum yalıtımı ile dış yüzeyi asla terleme yapmaz.",
        price: 849.00,
        compare_at_price: 1100.00,
        sku: "PZR-SPOR-001",
        stock: 80,
        rating: 4.9,
        review_count: 145,
        badge: "Fırsat",
        is_featured: 0,
        is_bestseller: 1,
        images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80"],
        specs: { "Hacim": "1000 ml", "Yalıtım": "24s Soğuk / 12s Sıcak" }
      },
      {
        id: 9,
        category_id: 5,
        category_name: "Kozmetik & Bakım",
        category_slug: "kozmetik-bakim",
        name: "Pazarvadi Botanicals Yaşlanma Karşıtı C Vitamini Serum Seti",
        slug: "pazarvadi-botanicals-c-vitamini-serum-seti",
        short_desc: "%15 Saf C Vitamini + Hyaluronik Asit + Ferulik Asit, Aydınlatıcı ve Sıkılaştırıcı",
        description: "Dermatolojik olarak test edilmiş, %100 vegan formülü ile cildinize ışıltı kazandırır.",
        price: 699.00,
        compare_at_price: 950.00,
        sku: "PZR-KOZM-001",
        stock: 50,
        rating: 4.8,
        review_count: 73,
        badge: "Yeni",
        is_featured: 1,
        is_bestseller: 0,
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"],
        specs: { "İçerik": "%15 L-Askorbik Asit", "Hacim": "30 ml", "Sertifika": "Vegan & Cruelty Free" }
      }
    ]
  },

  // 1. STATE & STORAGE
  getCart() {
    try {
      return JSON.parse(localStorage.getItem("pazurka_cart") || "[]");
    } catch {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem("pazurka_cart", JSON.stringify(cart));
    this.updateBadges();
    this.renderCartDrawer();
  },

  addToCart(product, quantity = 1, variant = "") {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id && item.variant === variant);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      let image = "";
      if (Array.isArray(product.images) && product.images.length > 0) image = product.images[0];
      else if (product.image) image = product.image;

      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        compare_at_price: product.compare_at_price ? Number(product.compare_at_price) : null,
        slug: product.slug,
        image: image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        quantity: quantity,
        variant: variant
      });
    }

    this.saveCart(cart);
    this.toast(`"${product.name}" sepete eklendi!`, "success");
    this.openCartDrawer();
  },

  updateCartQuantity(index, quantity) {
    const cart = this.getCart();
    if (!cart[index]) return;

    if (quantity <= 0) {
      cart.splice(index, 1);
      this.toast("Ürün sepetten kaldırıldı.", "info");
    } else {
      cart[index].quantity = quantity;
    }
    this.saveCart(cart);
  },

  removeFromCart(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
    this.toast("Ürün sepetten çıkarıldı.", "info");
  },

  clearCart() {
    this.saveCart([]);
  },

  getCartSubtotal() {
    return this.getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getCartCount() {
    return this.getCart().reduce((count, item) => count + item.quantity, 0);
  },

  // 2. WISHLIST
  getWishlist() {
    try {
      return JSON.parse(localStorage.getItem("pazurka_wishlist") || "[]");
    } catch {
      return [];
    }
  },

  saveWishlist(list) {
    localStorage.setItem("pazurka_wishlist", JSON.stringify(list));
    this.updateBadges();
  },

  isWishlisted(productId) {
    return this.getWishlist().some(item => item.id === productId);
  },

  toggleWishlist(product) {
    let list = this.getWishlist();
    const exists = list.some(item => item.id === product.id);

    if (exists) {
      list = list.filter(item => item.id !== product.id);
      this.toast(`"${product.name}" favorilerden çıkarıldı.`, "info");
    } else {
      let image = "";
      if (Array.isArray(product.images) && product.images.length > 0) image = product.images[0];
      else if (product.image) image = product.image;

      list.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        slug: product.slug,
        image: image || "",
        badge: product.badge || ""
      });
      this.toast(`"${product.name}" favorilere eklendi!`, "success");
    }

    this.saveWishlist(list);
    return !exists;
  },

  // 3. AUTHENTICATION & USER
  getUser() {
    try {
      return JSON.parse(localStorage.getItem("pazurka_user") || "null");
    } catch {
      return null;
    }
  },

  setUser(user, token) {
    if (user) {
      localStorage.setItem("pazurka_user", JSON.stringify(user));
      if (token) localStorage.setItem("pazurka_token", token);
    } else {
      localStorage.removeItem("pazurka_user");
      localStorage.removeItem("pazurka_token");
    }
    this.updateUserNav();
    this.initAdminOrderNotifier();
  },

  getToken() {
    return localStorage.getItem("pazurka_token") || "";
  },

  getAuthHeaders() {
    const headers = { "Content-Type": "application/json" };
    const token = this.getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  },

  // 3.1 USER ORDERS HUB
  async getOrders() {
    const user = this.getUser();
    const email = user?.email || "";
    const userId = user?.id || "";

    try {
      const headers = this.getAuthHeaders();
      const res = await fetch(`/api/user/orders?email=${encodeURIComponent(email)}&user_id=${userId}`, { headers });
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        localStorage.setItem("pazurka_orders", JSON.stringify(data.orders));
        return data.orders;
      }
    } catch (e) { }

    // Offline / LocalStorage fallback
    try {
      const local = JSON.parse(localStorage.getItem("pazurka_orders") || "[]");
      if (local && local.length > 0) return local;
    } catch { }

    try {
      const last = JSON.parse(localStorage.getItem("pazurka_last_order") || "null");
      if (last) return [last];
    } catch { }

    return [];
  },

  saveOrderLocal(order) {
    try {
      const orders = JSON.parse(localStorage.getItem("pazurka_orders") || "[]");
      // Check if already in array
      const existingIdx = orders.findIndex(o => o.order_number === order.order_number);
      if (existingIdx > -1) {
        orders[existingIdx] = { ...orders[existingIdx], ...order };
      } else {
        orders.unshift(order);
      }
      localStorage.setItem("pazurka_orders", JSON.stringify(orders));
      localStorage.setItem("pazurka_last_order", JSON.stringify(order));
      localStorage.setItem("pazurka_admin_new_order_event", JSON.stringify({ ...order, _time: Date.now() }));
    } catch { }
  },

  // 3.1 USER ADDRESSES & PROFILE HUB
  async getAddresses() {
    try {
      const user = this.getUser();
      const userId = user ? user.id : 2;
      const res = await fetch(`/api/user/addresses?user_id=${userId}`);
      const data = await res.json();
      if (data.success && data.addresses) {
        localStorage.setItem("pazurka_addresses", JSON.stringify(data.addresses));
        return data.addresses;
      }
    } catch (e) { }

    // Offline cache fallback
    try {
      const cached = JSON.parse(localStorage.getItem("pazurka_addresses") || "null");
      if (cached && cached.length > 0) return cached;
    } catch { }

    const defaultAddresses = [
      {
        id: 1,
        title: "Ev Adresim",
        recipient_name: (this.getUser()?.full_name) || "Ahmet Yılmaz",
        phone: (this.getUser()?.phone) || "0532 100 20 30",
        city: "Ankara",
        district: "Çankaya",
        address_line: "Atatürk Bulvarı No:15 Daire:4, Kızılay",
        zip_code: "06420",
        is_default: 1
      },
      {
        id: 2,
        title: "İş / Ofis Adresim",
        recipient_name: (this.getUser()?.full_name) || "Ahmet Yılmaz",
        phone: (this.getUser()?.phone) || "0532 100 20 30",
        city: "İstanbul",
        district: "Şişli",
        address_line: "Büyükdere Cad. No:192 Kule Plaza Kat:14",
        zip_code: "34394",
        is_default: 0
      }
    ];
    localStorage.setItem("pazurka_addresses", JSON.stringify(defaultAddresses));
    return defaultAddresses;
  },

  async saveAddress(addressData) {
    const user = this.getUser();
    const userId = user ? user.id : 2;
    addressData.user_id = userId;

    try {
      const isEdit = Boolean(addressData.id && typeof addressData.id === 'number' && addressData.id < 10000000);
      const url = isEdit ? `/api/user/addresses/${addressData.id}` : "/api/user/addresses";
      const method = isEdit ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressData)
      });
    } catch (e) { }

    let list = await this.getAddresses();
    if (addressData.is_default) {
      list.forEach(a => a.is_default = 0);
    }

    if (addressData.id) {
      const idx = list.findIndex(a => a.id === addressData.id);
      if (idx > -1) list[idx] = { ...list[idx], ...addressData };
      else list.push(addressData);
    } else {
      addressData.id = Date.now();
      if (list.length === 0) addressData.is_default = 1;
      list.unshift(addressData);
    }

    localStorage.setItem("pazurka_addresses", JSON.stringify(list));
    this.toast("Adres başarıyla kaydedildi.", "success");
    return list;
  },

  async deleteAddress(id) {
    try {
      await fetch(`/api/user/addresses/${id}`, { method: "DELETE" });
    } catch (e) { }

    let list = await this.getAddresses();
    list = list.filter(a => a.id !== id);
    if (list.length > 0 && !list.some(a => a.is_default)) {
      list[0].is_default = 1;
    }
    localStorage.setItem("pazurka_addresses", JSON.stringify(list));
    this.toast("Adres silindi.", "info");
    return list;
  },

  async setDefaultAddress(id) {
    let list = await this.getAddresses();
    const addr = list.find(a => a.id === id);
    if (addr) {
      addr.is_default = 1;
      await this.saveAddress(addr);
      this.toast(`"${addr.title}" varsayılan adresiniz yapıldı.`, "success");
    }
    return list;
  },

  async updateProfile(profileData) {
    const user = this.getUser() || {};
    const updated = { ...user, ...profileData };
    this.setUser(updated);

    try {
      await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData)
      });
    } catch (e) { }

    this.toast("Profil bilgileriniz başarıyla güncellendi.", "success");
    return updated;
  },

  // 3.2 TURKEY PROVINCES & DISTRICTS SELECTOR ENGINE
  locations: {
    "Adana": ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"],
    "Adıyaman": ["Besni", "Çelikhan", "Gerger", "Gölbaşı", "Kahta", "Merkez", "Samsat", "Sincik", "Tut"],
    "Afyonkarahisar": ["Başmakçı", "Bayat", "Bolvadin", "Çay", "Çobanlar", "Dazkırı", "Dinar", "Emirdağ", "Evciler", "Hocalar", "İhsaniye", "İscehisar", "Kızılören", "Merkez", "Sandıklı", "Sinanpaşa", "Sultandağı", "Şuhut"],
    "Ağrı": ["Diyadin", "Doğubayazıt", "Eleşkirt", "Hamur", "Merkez", "Patnos", "Taşlıçay", "Tutak"],
    "Aksaray": ["Ağaçören", "Eskil", "Gülağaç", "Güzelyurt", "Merkez", "Ortaköy", "Sarıyahşi", "Sultanhanı"],
    "Amasya": ["Göynücek", "Gümüşhacıköy", "Hamamözü", "Merkez", "Merzifon", "Suluova", "Taşova"],
    "Ankara": ["Akyurt", "Altındağ", "Ayaş", "Bala", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kahramankazan", "Kalecik", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"],
    "Antalya": ["Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"],
    "Ardahan": ["Çıldır", "Damal", "Göle", "Hanak", "Merkez", "Posof"],
    "Artvin": ["Ardanuç", "Arhavi", "Borçka", "Hopa", "Kemalpaşa", "Merkez", "Murgul", "Şavşat", "Yusufeli"],
    "Aydın": ["Bozdoğan", "Buharkent", "Çine", "Didim", "Efeler", "Germencik", "İncirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası", "Kuyucak", "Nazilli", "Söke", "Sultanhisar", "Yenipazar"],
    "Balıkesir": ["Altıeylül", "Ayvalık", "Balya", "Bandırma", "Bigadiç", "Burhaniye", "Dursunbey", "Edremit", "Erdek", "Gömeç", "Gönen", "Havran", "İvrindi", "Karesi", "Kepsut", "Manyas", "Marmara", "Savaştepe", "Sındırgı", "Susurluk"],
    "Bartın": ["Amasra", "Kurucaşile", "Merkez", "Ulus"],
    "Batman": ["Beşiri", "Gercüş", "Hasankeyf", "Kozluk", "Merkez", "Sason"],
    "Bayburt": ["Aydıntepe", "Demirözü", "Merkez"],
    "Bilecik": ["Bozüyük", "Gölpazarı", "İnhisar", "Merkez", "Osmaneli", "Pazaryeri", "Söğüt", "Yenipazar"],
    "Bingöl": ["Adaklı", "Genç", "Karlıova", "Kiğı", "Merkez", "Solhan", "Yayladere", "Yedisu"],
    "Bitlis": ["Adilcevaz", "Ahlat", "Güroymak", "Hizan", "Merkez", "Mutki", "Tatvan"],
    "Bolu": ["Dörtdivan", "Gerede", "Göynük", "Kıbrıscık", "Mengen", "Merkez", "Mudurnu", "Seben", "Yeniçağa"],
    "Burdur": ["Ağlasun", "Altınyayla", "Bucak", "Çavdır", "Çeltikçi", "Gölhisar", "Karamanlı", "Kemer", "Merkez", "Tefenni", "Yeşilova"],
    "Bursa": ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
    "Çanakkale": ["Ayvacık", "Bayramiç", "Biga", "Bozcaada", "Çan", "Eceabat", "Ezine", "Gelibolu", "Gökçeada", "Lapseki", "Merkez", "Yenice"],
    "Çankırı": ["Atkaracalar", "Bayramören", "Çerkeş", "Eldivan", "Ilgaz", "Kızılırmak", "Korgun", "Kurşunlu", "Merkez", "Orta", "Şabanözü", "Yapraklı"],
    "Çorum": ["Alaca", "Bayat", "Boğazkale", "Dodurga", "İskilip", "Kargı", "Laçin", "Mecitözü", "Merkez", "Oğuzlar", "Ortaköy", "Osmancık", "Sungurlu", "Uğurludağ"],
    "Denizli": ["Acıpayam", "Babadağ", "Baklan", "Bekilli", "Beyağaç", "Bozkurt", "Buldan", "Çal", "Çameli", "Çardak", "Çivril", "Güney", "Honaz", "Kale", "Merkezefendi", "Pamukkale", "Sarayköy", "Serinhisar", "Tavas"],
    "Diyarbakır": ["Bağlar", "Bismil", "Çermik", "Çınar", "Çüngüş", "Dicle", "Eğil", "Ergani", "Hani", "Hazro", "Kayapınar", "Kocaköy", "Kulp", "Lice", "Silvan", "Sur", "Yenişehir"],
    "Düzce": ["Akçakoca", "Cumayeri", "Çilimli", "Gölyaka", "Gümüşova", "Kaynaşlı", "Merkez", "Yığılca"],
    "Edirne": ["Enez", "Havsa", "İpsala", "Keşan", "Lalapaşa", "Meriç", "Merkez", "Süloğlu", "Uzunköprü"],
    "Elazığ": ["Ağın", "Alacakaya", "Arıcak", "Baskil", "Karakoçan", "Keban", "Kovancılar", "Maden", "Merkez", "Palu", "Sivrice"],
    "Erzincan": ["Çayırlı", "İliç", "Kemah", "Kemaliye", "Merkez", "Otlukbeli", "Refahiye", "Tercan", "Üzümlü"],
    "Erzurum": ["Aşkale", "Aziziye", "Çat", "Hınıs", "Horasan", "İspir", "Karaçoban", "Karayazı", "Köprüköy", "Narman", "Oltu", "Olur", "Palandöken", "Pasinler", "Pazaryolu", "Şenkaya", "Tekman", "Tortum", "Uzundere", "Yakutiye"],
    "Eskişehir": ["Alpu", "Beylikova", "Çifteler", "Günyüzü", "Han", "İnönü", "Mahmudiye", "Mihalgazi", "Mihalıççık", "Odunpazarı", "Sarıcakaya", "Seyitgazi", "Sivrihisar", "Tepebaşı"],
    "Gaziantep": ["Araban", "İslahiye", "Karkamış", "Nizip", "Nurdağı", "Oğuzeli", "Şahinbey", "Şehitkamil", "Yavuzeli"],
    "Giresun": ["Alucra", "Bulancak", "Çamoluk", "Çanakçı", "Dereli", "Doğankent", "Espiye", "Eynesil", "Görele", "Güce", "Keşap", "Merkez", "Piraziz", "Şebinkarahisar", "Tirebolu", "Yağlıdere"],
    "Gümüşhane": ["Kelkit", "Köse", "Kürtün", "Merkez", "Şiran", "Torul"],
    "Hakkari": ["Çukurca", "Derecik", "Merkez", "Şemdinli", "Yüksekova"],
    "Hatay": ["Altınözü", "Antakya", "Arsuz", "Belen", "Defne", "Dörtyol", "Erzin", "Hassa", "İskenderun", "Kırıkhan", "Kumlu", "Payas", "Reyhanlı", "Samandağ", "Yayladağı"],
    "Iğdır": ["Aralık", "Karakoyunlu", "Merkez", "Tuzluca"],
    "Isparta": ["Aksu", "Atabey", "Eğirdir", "Gelendost", "Gönen", "Keçiborlu", "Merkez", "Senirkent", "Sütçüler", "Şarkikaraağaç", "Uluborlu", "Yalvaç", "Yenişarbademli"],
    "İstanbul": ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
    "İzmir": ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
    "Kahramanmaraş": ["Afşin", "Andırın", "Çağlayancerit", "Dulkadiroğlu", "Ekinözü", "Elbistan", "Göksun", "Nurhak", "Onikişubat", "Pazarcık", "Türkoğlu"],
    "Karabük": ["Eflani", "Eskipazar", "Merkez", "Ovacık", "Safranbolu", "Yenice"],
    "Karaman": ["Ayrancı", "Başyayla", "Ermenek", "Kazımkarabekir", "Merkez", "Sarıveliler"],
    "Kars": ["Akyaka", "Arpaçay", "Digor", "Kağızman", "Merkez", "Sarıkamış", "Selim", "Susuz"],
    "Kastamonu": ["Abana", "Ağlı", "Araç", "Bozkurt", "Cide", "Çatalzeytin", "Daday", "Devrekani", "Doğanyurt", "Hanönü", "İhsangazi", "İnebolu", "Küre", "Merkez", "Pınarbaşı", "Seydiler", "Şenpazar", "Taşköprü", "Tosya"],
    "Kayseri": ["Akkışla", "Bünyan", "Develi", "Felahiye", "Hacılar", "İncesu", "Kocasinan", "Melikgazi", "Özvatan", "Pınarbaşı", "Sarıoğlan", "Sarız", "Talas", "Tomarza", "Yahyalı", "Yeşilhisar"],
    "Kilis": ["Elbeyli", "Merkez", "Musabeyli", "Polateli"],
    "Kırıkkale": ["Bahşılı", "Balışeyh", "Çelebi", "Delice", "Karakeçili", "Keskin", "Merkez", "Sulakyurt", "Yahşihan"],
    "Kırklareli": ["Babaeski", "Demirköy", "Kofçaz", "Lüleburgaz", "Merkez", "Pehlivanköy", "Pınarhisar", "Vize"],
    "Kırşehir": ["Akçakent", "Akpınar", "Boztepe", "Çiçekdağı", "Kaman", "Merkez", "Mucur"],
    "Kocaeli": ["Başiskele", "Çayırova", "Darıca", "Derince", "Dilovası", "Gebze", "Gölcük", "İzmit", "Kandıra", "Karamürsel", "Kartepe", "Körfez"],
    "Konya": ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Cihanbeyli", "Çeltik", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Tuzlukçu", "Yalıhüyük", "Yunak"],
    "Kütahya": ["Altıntaş", "Aslanapa", "Çavdarhisar", "Domaniç", "Dumlupınar", "Emet", "Gediz", "Hisarcık", "Merkez", "Pazarlar", "Şaphane", "Simav", "Tavşanlı"],
    "Malatya": ["Akçadağ", "Arapgir", "Arguvan", "Battalgazi", "Darende", "Doğanşehir", "Doğanyol", "Hekimhan", "Kale", "Kuluncak", "Pütürge", "Yazıhan", "Yeşilyurt"],
    "Manisa": ["Ahmetli", "Akhisar", "Alaşehir", "Demirci", "Gölmarmara", "Gördes", "Kırkağaç", "Köprübaşı", "Kula", "Salihli", "Sarıgöl", "Saruhanlı", "Selendi", "Soma", "Şehzadeler", "Turgutlu", "Yunusemre"],
    "Mardin": ["Artuklu", "Dargeçit", "Derik", "Kızıltepe", "Mazıdağı", "Midyat", "Nusaybin", "Ömerli", "Savur", "Yeşilli"],
    "Mersin": ["Akdeniz", "Anamur", "Aydıncık", "Bozyazı", "Çamlıyayla", "Erdemli", "Gülnar", "Mezitli", "Mut", "Silifke", "Tarsus", "Toroslar", "Yenişehir"],
    "Muğla": ["Bodrum", "Dalaman", "Datça", "Fethiye", "Kavaklıdere", "Köyceğiz", "Marmaris", "Menteşe", "Milas", "Ortaca", "Seydikemer", "Ula", "Yatağan"],
    "Muş": ["Bulanık", "Hasköy", "Korkut", "Malazgirt", "Merkez", "Varto"],
    "Nevşehir": ["Acıgöl", "Avanos", "Derinkuyu", "Gülşehir", "Hacıbektaş", "Kozaklı", "Merkez", "Ürgüp"],
    "Niğde": ["Altunhisar", "Bor", "Çamardı", "Çiftlik", "Merkez", "Ulukışla"],
    "Ordu": ["Akkuş", "Altınordu", "Aybastı", "Çamaş", "Çatalpınar", "Çaybaşı", "Fatsa", "Gölköy", "Gülyalı", "Gürgentepe", "İkizce", "Kabadüz", "Kabataş", "Korgan", "Kumru", "Mesudiye", "Perşembe", "Ulubey", "Ünye"],
    "Osmaniye": ["Bahçe", "Düziçi", "Hasanbeyli", "Kadirli", "Merkez", "Sumbas", "Toprakkale"],
    "Rize": ["Ardeşen", "Çamlıhemşin", "Çayeli", "Derepazarı", "Fındıklı", "Güneysu", "Hemşin", "İkizdere", "İyidere", "Kalkandere", "Merkez", "Pazar"],
    "Sakarya": ["Adapazarı", "Akyazı", "Arifiye", "Erenler", "Ferizli", "Geyve", "Hendek", "Karapürçek", "Karasu", "Kaynarca", "Kocaali", "Pamukova", "Sapanca", "Serdivan", "Söğütlü", "Taraklı"],
    "Samsun": ["19 Mayıs", "Alaçam", "Asarcık", "Atakum", "Ayvacık", "Bafra", "Canik", "Çarşamba", "Havza", "İlkadım", "Kavak", "Ladik", "Salıpazarı", "Tekkeköy", "Terme", "Vezirköprü", "Yakakent"],
    "Şanlıurfa": ["Akçakale", "Birecik", "Bozova", "Ceylanpınar", "Eyyübiye", "Halfeti", "Haliliye", "Harran", "Hilvan", "Karaköprü", "Siverek", "Suruç", "Viranşehir"],
    "Siirt": ["Baykan", "Eruh", "Kurtalan", "Merkez", "Pervari", "Şirvan", "Tillo"],
    "Sinop": ["Ayancık", "Boyabat", "Dikmen", "Durağan", "Erfelek", "Gerze", "Merkez", "Saraydüzü", "Türkeli"],
    "Şırnak": ["Beytüşşebap", "Cizre", "Güçlükonak", "İdil", "Merkez", "Silopi", "Uludere"],
    "Sivas": ["Akıncılar", "Altınyayla", "Divriği", "Doğanşar", "Gemerek", "Gölova", "Gürün", "Hafik", "İmranlı", "Kangal", "Koyulhisar", "Merkez", "Suşehri", "Şarkışla", "Ulaş", "Yıldızeli", "Zara"],
    "Tekirdağ": ["Çerkezköy", "Çorlu", "Ergene", "Hayrabolu", "Kapaklı", "Malkara", "Marmaraereğlisi", "Muratlı", "Saray", "Süleymanpaşa", "Şarköy"],
    "Tokat": ["Almus", "Artova", "Başçiftlik", "Erbaa", "Merkez", "Niksar", "Pazar", "Reşadiye", "Sulusaray", "Turhal", "Yeşilyurt", "Zile"],
    "Trabzon": ["Akçaabat", "Araklı", "Arsin", "Beşikdüzü", "Çarşıbaşı", "Çaykara", "Dernekpazarı", "Düzköy", "Hayrat", "Köprübaşı", "Maçka", "Of", "Ortahisar", "Sürmene", "Şalpazarı", "Tonya", "Vakfıkebir", "Yomra"],
    "Tunceli": ["Çemişgezek", "Hozat", "Mazgirt", "Merkez", "Nazımiye", "Ovacık", "Pertek", "Pülümür"],
    "Uşak": ["Banaz", "Eşme", "Karahallı", "Merkez", "Sivaslı", "Ulubey"],
    "Van": ["Bahçesaray", "Başkale", "Çaldıran", "Çatak", "Edremit", "Erciş", "Gevaş", "Gürpınar", "İpekyolu", "Muradiye", "Özalp", "Saray", "Tuşba"],
    "Yalova": ["Altınova", "Armutlu", "Çınarcık", "Çiftlikköy", "Merkez", "Termal"],
    "Yozgat": ["Akdağmadeni", "Aydıncık", "Boğazlıyan", "Çandır", "Çayıralan", "Çekerek", "Kadışehri", "Merkez", "Saraykent", "Sarıkaya", "Sorgun", "Şefaatli", "Yenifakılı", "Yerköy"],
    "Zonguldak": ["Alaplı", "Çaycuma", "Devrek", "Gökçebey", "Kilimli", "Kozlu", "Karadeniz Ereğli", "Merkez"]
  },

  populateCityDistrict(citySelectId, districtSelectId, selectedCity = '', selectedDistrict = '') {
    const cityEl = typeof citySelectId === 'string' ? document.getElementById(citySelectId) : citySelectId;
    const distEl = typeof districtSelectId === 'string' ? document.getElementById(districtSelectId) : districtSelectId;
    if (!cityEl || !distEl) return;

    const cities = Object.keys(this.locations).sort((a, b) => a.localeCompare(b, 'tr'));

    cityEl.innerHTML = '<option value="">İl Seçiniz...</option>' + cities.map(c =>
      `<option value="${c}" ${selectedCity && c.toLowerCase() === selectedCity.toLowerCase() ? 'selected' : ''}>${c}</option>`
    ).join('');

    const updateDistricts = (cityName, chosenDistrict = '') => {
      const districts = this.locations[cityName] || [];
      if (districts.length === 0) {
        distEl.innerHTML = '<option value="">Önce İl Seçiniz...</option>';
        distEl.disabled = true;
      } else {
        distEl.disabled = false;
        distEl.innerHTML = '<option value="">İlçe Seçiniz...</option>' + districts.map(d =>
          `<option value="${d}" ${chosenDistrict && d.toLowerCase() === chosenDistrict.toLowerCase() ? 'selected' : ''}>${d}</option>`
        ).join('');
      }
    };

    cityEl.onchange = () => {
      updateDistricts(cityEl.value, '');
    };

    if (selectedCity) {
      updateDistricts(selectedCity, selectedDistrict);
    } else {
      updateDistricts('', '');
    }
  },

  async logout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => { });
    this.setUser(null, null);
    this.toast("Başarıyla çıkış yapıldı.", "info");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  },

  // 4. FORMATTERS
  formatPrice(amount) {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2
    }).format(num);
  },

  // 5. TOAST NOTIFICATIONS
  toast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let iconSvg = this.icons.check;
    if (type === "info") iconSvg = this.icons.flame;
    if (type === "error") iconSvg = this.icons.refresh;

    toast.innerHTML = `
      <div class="flex-shrink-0 ${type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-rose-400' : 'text-orange-400'}">${iconSvg}</div>
      <span class="flex-1">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  // 6. CART DRAWER
  openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-drawer-overlay");
    if (drawer && overlay) {
      this.renderCartDrawer();
      overlay.classList.remove("hidden");
      setTimeout(() => {
        overlay.classList.remove("opacity-0");
        drawer.classList.remove("translate-x-full");
      }, 10);
    }
  },

  closeCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-drawer-overlay");
    if (drawer && overlay) {
      drawer.classList.add("translate-x-full");
      overlay.classList.add("opacity-0");
      setTimeout(() => overlay.classList.add("hidden"), 300);
    }
  },

  renderCartDrawer() {
    const listEl = document.getElementById("cart-drawer-items");
    const subtotalEl = document.getElementById("cart-drawer-subtotal");
    const emptyEl = document.getElementById("cart-drawer-empty");
    const footerEl = document.getElementById("cart-drawer-footer");
    const shippingProgressEl = document.getElementById("cart-shipping-progress");

    if (!listEl) return;

    const cart = this.getCart();
    const subtotal = this.getCartSubtotal();
    const freeShippingLimit = 750;

    if (shippingProgressEl) {
      const remaining = Math.max(0, freeShippingLimit - subtotal);
      const percent = Math.min(100, Math.round((subtotal / freeShippingLimit) * 100));
      shippingProgressEl.innerHTML = `
        <div class="mb-2 flex items-center justify-between text-xs font-semibold">
          ${remaining > 0
          ? `<span>Kargo Bedava için <strong class="text-orange-600 font-bold">${this.formatPrice(remaining)}</strong> daha ekleyin!</span>`
          : `<span class="text-emerald-600 font-bold flex items-center gap-1.5"><span class="w-4 h-4 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px]">✓</span> Harika! Kargo Tamamen Ücretsiz!</span>`}
          <span class="text-slate-400 font-mono">%${percent}</span>
        </div>
        <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div class="bg-brand h-full transition-all duration-500 rounded-full" style="width: ${percent}%"></div>
        </div>
      `;
    }

    if (cart.length === 0) {
      if (emptyEl) emptyEl.classList.remove("hidden");
      if (footerEl) footerEl.classList.add("hidden");
      listEl.innerHTML = "";
      return;
    }

    if (emptyEl) emptyEl.classList.add("hidden");
    if (footerEl) footerEl.classList.remove("hidden");

    if (subtotalEl) subtotalEl.textContent = this.formatPrice(subtotal);

    listEl.innerHTML = cart.map((item, index) => `
      <div class="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-2xl object-cover bg-slate-100 flex-shrink-0 border border-slate-100">
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-slate-800 truncate">${item.name}</h4>
          ${item.variant ? `<p class="text-xs text-slate-400 mt-0.5">${item.variant}</p>` : ''}
          <div class="text-sm font-extrabold text-orange-600 mt-1">${this.formatPrice(item.price)}</div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <button onclick="Pazarvadi.removeFromCart(${index})" class="text-slate-400 hover:text-rose-500 p-1 transition" title="Kaldır">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
          <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button onclick="Pazarvadi.updateCartQuantity(${index}, ${item.quantity - 1})" class="px-2.5 py-0.5 text-xs text-slate-600 hover:bg-slate-200 font-bold">-</button>
            <span class="px-2 py-0.5 text-xs font-bold text-slate-900">${item.quantity}</span>
            <button onclick="Pazarvadi.updateCartQuantity(${index}, ${item.quantity + 1})" class="px-2.5 py-0.5 text-xs text-slate-600 hover:bg-slate-200 font-bold">+</button>
          </div>
        </div>
      </div>
    `).join("");

    this.refreshIcons(listEl);
  },

  // 7. HEADER BADGES & USER UI
  updateBadges() {
    const cartCount = this.getCartCount();
    const wishlistCount = this.getWishlist().length;

    document.querySelectorAll(".cart-badge").forEach(el => {
      el.textContent = cartCount;
      el.classList.toggle("hidden", cartCount === 0);
    });

    document.querySelectorAll(".wishlist-badge").forEach(el => {
      el.textContent = wishlistCount;
      el.classList.toggle("hidden", wishlistCount === 0);
    });
  },

  updateUserNav() {
    const user = this.getUser();
    const userContainer = document.getElementById("header-user-menu");
    if (!userContainer) return;

    if (user) {
      userContainer.innerHTML = `
        <div class="relative group">
          <button class="flex items-center gap-2 p-2 rounded-2xl hover:bg-slate-100 text-slate-700 transition">
            <div class="w-8 h-8 rounded-full bg-orange-100 text-brand font-extrabold flex items-center justify-center text-xs shadow-sm">
              ${user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span class="text-xs font-bold max-w-[100px] truncate hidden md:inline-block">${user.full_name}</span>
            <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="absolute right-0 top-full pt-2 w-52 hidden group-hover:block z-50">
            <div class="bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 text-xs text-slate-700 space-y-1">
              <div class="px-4 py-2 border-b border-slate-100">
                <p class="font-extrabold text-slate-900 truncate">${user.full_name}</p>
                <p class="text-[11px] text-slate-400 truncate">${user.email}</p>
              </div>
              <a href="/hesabim?tab=orders" class="flex items-center gap-2.5 px-4 py-2 hover:bg-orange-50 text-slate-700 hover:text-brand font-semibold">
                ${this.icon('package', 'w-4 h-4 text-orange-500')}
                <span>Siparişlerim</span>
              </a>
              <a href="/hesabim?tab=addresses" class="flex items-center gap-2.5 px-4 py-2 hover:bg-orange-50 text-slate-700 hover:text-brand font-semibold">
                ${this.icon('map-pin', 'w-4 h-4 text-orange-500')}
                <span>Adres Bilgilerim</span>
              </a>
              <a href="/hesabim?tab=profile" class="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold">
                ${this.icon('user', 'w-4 h-4 text-slate-500')}
                <span>Profilim</span>
              </a>
              ${user.role === 'admin' ? `
                <a href="/admin" class="flex items-center gap-2.5 px-4 py-2 hover:bg-orange-50 text-brand font-bold">
                  ${this.icon('shield', 'w-4 h-4 text-brand')}
                  <span>Yönetici Paneli</span>
                </a>
              ` : ''}
              <button onclick="Pazarvadi.logout()" class="w-full text-left flex items-center gap-2.5 px-4 py-2 hover:bg-rose-50 text-rose-600 font-semibold">
                ${this.icon('log-out', 'w-4 h-4 text-rose-500')}
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      userContainer.innerHTML = `
        <a href="/giris" class="flex items-center gap-2 px-3.5 py-2 rounded-2xl text-slate-700 hover:text-brand hover:bg-orange-50 text-xs font-bold transition">
          <svg class="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span class="hidden md:inline">Giriş Yap</span>
        </a>
      `;
    }
  },

  // 8. ADMIN LIVE ORDER NOTIFIER (Shown ONLY to Admin users when a REAL new order arrives)
  _adminNotifierInterval: null,
  _lastKnownOrderId: null,
  _toastTimer: null,

  showAdminNewOrderToast(order) {
    const user = this.getUser();
    if (!user || user.role !== 'admin') return;

    let toastEl = document.getElementById("live-sale-toast");
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.id = "live-sale-toast";
      toastEl.className = "bg-white p-4 rounded-2xl shadow-2xl border-2 border-brand/30 ring-4 ring-brand/10 flex items-start gap-3 max-w-sm pointer-events-auto transition-all duration-300 transform";
      document.body.appendChild(toastEl);
    }

    const orderNum = order.order_number || `PZR-${order.id || ''}`;
    const custName = order.customer_name || 'Müşteri';
    const city = order.city || (order.shipping && order.shipping.city) || '';
    const total = typeof order.total === 'number' ? this.formatPrice(order.total) : (order.total || '');

    toastEl.innerHTML = `
      <div class="w-10 h-10 rounded-xl bg-orange-100 text-brand flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
      </div>
      <div class="flex-1 min-w-0 text-left">
        <div class="flex items-center gap-1.5 mb-0.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span class="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wide">Yeni Gerçek Sipariş Geldi!</span>
        </div>
        <p class="text-xs font-extrabold text-slate-900 truncate">${custName} ${city ? `(${city})` : ''}</p>
        <p class="text-[11px] text-slate-500 font-mono mt-0.5"><span class="font-bold text-slate-700">${orderNum}</span> • <strong class="text-brand">${total}</strong></p>
        <a href="/admin?tab=orders" class="inline-block text-[11px] font-bold text-brand hover:underline mt-1">Siparişi İncele →</a>
      </div>
      <button onclick="document.getElementById('live-sale-toast').classList.remove('active')" class="text-slate-300 hover:text-slate-600 p-1 text-xs">✕</button>
    `;

    toastEl.classList.add("active");

    // Optional pleasant sound
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {}

    // Auto hide after 8 seconds (NEVER LOOPS OR REPEATS CONSTANTLY)
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      if (toastEl) toastEl.classList.remove("active");
    }, 8000);
  },

  initAdminOrderNotifier() {
    if (this._adminNotifierInterval) {
      clearInterval(this._adminNotifierInterval);
      this._adminNotifierInterval = null;
    }

    const user = this.getUser();
    // Only active when logged in as admin
    if (!user || user.role !== 'admin') {
      const existing = document.getElementById("live-sale-toast");
      if (existing) existing.remove();
      return;
    }

    const checkForNewOrders = async () => {
      const currentUser = this.getUser();
      if (!currentUser || currentUser.role !== 'admin') {
        if (this._adminNotifierInterval) clearInterval(this._adminNotifierInterval);
        return;
      }

      try {
        const res = await fetch("/api/admin/orders?limit=1&admin=1");
        const data = await res.json();
        if (data.success && Array.isArray(data.orders) && data.orders.length > 0) {
          const latest = data.orders[0];
          
          if (this._lastKnownOrderId === null) {
            // First time initialization: quietly memorize current latest ID so we don't alert on past orders!
            const stored = Number(localStorage.getItem("pazurka_admin_last_order_id"));
            this._lastKnownOrderId = stored || latest.id;
            localStorage.setItem("pazurka_admin_last_order_id", this._lastKnownOrderId);
          } else if (latest.id > this._lastKnownOrderId) {
            // A brand new real order was placed!
            this._lastKnownOrderId = latest.id;
            localStorage.setItem("pazurka_admin_last_order_id", latest.id);
            this.showAdminNewOrderToast(latest);

            if (typeof loadAdminOverview === 'function') loadAdminOverview();
            if (typeof loadAdminOrders === 'function') loadAdminOrders();
          }
        }
      } catch {}
    };

    // Quietly records current latest order ID on first load
    checkForNewOrders();

    // Check periodically (every 10 seconds) for real new orders only
    this._adminNotifierInterval = setInterval(checkForNewOrders, 10000);
  },

  // 9. REFRESH ICONS (Instant Crisp Vector SVG Engine)
  refreshIcons(root) {
    const container = root || document;

    // 1. Immediately replace all data-lucide tags with our built-in crisp vector SVGs
    const elements = container.querySelectorAll('[data-lucide]');
    elements.forEach(el => {
      const iconName = el.getAttribute('data-lucide');
      const classes = el.getAttribute('class') || 'w-4 h-4';
      const svgStr = this.icon(iconName, classes);
      if (svgStr) {
        const wrapper = document.createElement('span');
        wrapper.className = 'inline-flex items-center justify-center';
        wrapper.innerHTML = svgStr;
        el.replaceWith(wrapper.firstElementChild || wrapper);
      }
    });

    // 2. Also run Lucide if available in browser
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      try {
        window.lucide.createIcons(root ? { root } : undefined);
      } catch (e) { }
    }
  },

  // 10. INITIALIZE
  init() {
    this.updateBadges();
    this.updateUserNav();
    this.renderCartDrawer();
    this.refreshIcons();
    this.initAdminOrderNotifier();

    window.addEventListener("storage", (e) => {
      this.updateBadges();
      this.renderCartDrawer();
      this.updateUserNav();
      this.initAdminOrderNotifier();

      if (e.key === 'pazurka_admin_new_order_event' && e.newValue) {
        try {
          const newOrd = JSON.parse(e.newValue);
          const currentUser = this.getUser();
          if (currentUser && currentUser.role === 'admin') {
            this._lastKnownOrderId = newOrd.id || this._lastKnownOrderId;
            this.showAdminNewOrderToast(newOrd);
            if (typeof loadAdminOverview === 'function') loadAdminOverview();
            if (typeof loadAdminOrders === 'function') loadAdminOrders();
          }
        } catch {}
      }
    });

    const searchInputs = document.querySelectorAll(".global-search-input");
    searchInputs.forEach(input => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && input.value.trim()) {
          window.location.href = `/urunler?q=${encodeURIComponent(input.value.trim())}`;
        }
      });
    });
  }
};

window.Pazarvadi = Pazarvadi;
window.Pazurka = Pazarvadi;

document.addEventListener("DOMContentLoaded", () => {
  Pazarvadi.init();
});

/**
 * Shopify Dummy Data Seeder
 * ─────────────────────────
 * Creates dummy collections + products via Shopify Admin REST API.
 *
 * SETUP:
 *   1. Go to your Shopify Admin → Settings → Apps → Develop apps
 *   2. Create a private app with these scopes:
 *        write_products, write_collections, read_products, read_collections
 *   3. Install the app and copy the "Admin API access token"
 *   4. Fill in STORE_DOMAIN and ACCESS_TOKEN below
 *   5. Run:  node seed-data.js
 *
 * REQUIRES: Node 18+ (uses built-in fetch)
 */

// ── CONFIG ──────────────────────────────────────────────────────────────────
const STORE_DOMAIN  = 'your-store.myshopify.com';   // ← change this
const ACCESS_TOKEN  = 'shpat_xxxxxxxxxxxxxxxxxxxx';  // ← change this
// ────────────────────────────────────────────────────────────────────────────

const BASE_URL = `https://${STORE_DOMAIN}/admin/api/2024-01`;

const HEADERS = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': ACCESS_TOKEN,
};

/* ── Utility ── */
async function shopify(method, endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    const msg = JSON.stringify(json.errors || json, null, 2);
    throw new Error(`${method} ${endpoint} → ${res.status}\n${msg}`);
  }
  return json;
}

const POST   = (ep, body) => shopify('POST',   ep, body);
const PUT    = (ep, body) => shopify('PUT',    ep, body);
const GET    = (ep)       => shopify('GET',    ep);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ─────────────────────────────────────────────────────────────────────────
   SEED DATA
   ───────────────────────────────────────────────────────────────────────── */

const COLLECTIONS = [
  {
    title: 'New Arrivals',
    body_html: '<p>Fresh styles just landed. Shop the latest additions to our store.</p>',
    sort_order: 'created-desc',
    image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
  },
  {
    title: 'Best Sellers',
    body_html: '<p>Our most-loved products, chosen by thousands of happy customers.</p>',
    sort_order: 'best-selling',
    image_url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
  },
  {
    title: 'Summer Collection',
    body_html: '<p>Light, breezy and perfect for the warm season. Sun-ready styles for every occasion.</p>',
    sort_order: 'manual',
    image_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
  },
  {
    title: 'Sale',
    body_html: '<p>Up to 50% off on selected items. Limited stock — grab yours before it\'s gone!</p>',
    sort_order: 'price-asc',
    image_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
  },
];

const PRODUCTS = [
  {
    title: 'Classic Cotton T-Shirt',
    vendor: 'Urban Basics',
    product_type: 'Tops',
    body_html: '<p>Everyday essential. Made from 100% organic cotton with a relaxed fit perfect for any occasion. Soft, breathable, and built to last.</p>',
    tags: 'cotton, basics, casual, t-shirt',
    collections: ['New Arrivals', 'Best Sellers', 'Summer Collection'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['White', 'Black', 'Navy', 'Red'] },
      { name: 'Size',  values: ['XS', 'S', 'M', 'L', 'XL'] },
    ],
    price: '29.99',
    compare_at_price: null,
  },
  {
    title: 'Slim Fit Denim Jeans',
    vendor: 'Denim Co.',
    product_type: 'Bottoms',
    body_html: '<p>Modern slim-fit jeans with a touch of stretch for all-day comfort. Classic 5-pocket styling that works dressed up or down.</p>',
    tags: 'denim, jeans, bottoms, slim-fit',
    collections: ['New Arrivals', 'Best Sellers'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['Indigo', 'Black', 'Stone Wash'] },
      { name: 'Size',  values: ['28', '30', '32', '34', '36'] },
    ],
    price: '79.99',
    compare_at_price: '99.99',
  },
  {
    title: 'Floral Wrap Dress',
    vendor: 'Bloom Studio',
    product_type: 'Dresses',
    body_html: '<p>A timeless wrap silhouette with a vibrant floral print. Lightweight fabric flows beautifully — perfect from brunch to evening out.</p>',
    tags: 'dress, floral, summer, wrap',
    collections: ['Summer Collection', 'New Arrivals'],
    images: [
      'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['Blue Floral', 'Pink Floral', 'Green Floral'] },
      { name: 'Size',  values: ['XS', 'S', 'M', 'L'] },
    ],
    price: '64.99',
    compare_at_price: '89.99',
  },
  {
    title: 'Canvas Sneakers',
    vendor: 'StepUp',
    product_type: 'Footwear',
    body_html: '<p>Classic low-top canvas sneakers with a vulcanized rubber sole. Pairs effortlessly with any casual look. Comes with two sets of laces.</p>',
    tags: 'sneakers, shoes, casual, canvas',
    collections: ['Best Sellers', 'Summer Collection'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['White', 'Black', 'Red', 'Navy'] },
      { name: 'Size',  values: ['6', '7', '8', '9', '10', '11'] },
    ],
    price: '49.99',
    compare_at_price: null,
  },
  {
    title: 'Leather Crossbody Bag',
    vendor: 'Modus Bags',
    product_type: 'Accessories',
    body_html: '<p>Compact yet spacious crossbody bag crafted from genuine pebbled leather. Features a zip closure, interior slip pocket, and adjustable strap.</p>',
    tags: 'bag, leather, accessories, crossbody',
    collections: ['New Arrivals', 'Best Sellers'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['Tan', 'Black', 'Burgundy'] },
    ],
    price: '119.99',
    compare_at_price: '149.99',
  },
  {
    title: 'Linen Button-Up Shirt',
    vendor: 'Urban Basics',
    product_type: 'Tops',
    body_html: '<p>Relaxed-fit linen shirt that breathes beautifully in summer heat. Semi-structured collar and a curved hem that looks great tucked or untucked.</p>',
    tags: 'shirt, linen, summer, tops',
    collections: ['Summer Collection', 'New Arrivals'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1602810319428-019690571b5b?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['White', 'Sky Blue', 'Sand', 'Sage'] },
      { name: 'Size',  values: ['S', 'M', 'L', 'XL', 'XXL'] },
    ],
    price: '54.99',
    compare_at_price: null,
  },
  {
    title: 'Oversized Hoodie',
    vendor: 'Comfort Lab',
    product_type: 'Tops',
    body_html: '<p>Heavyweight 400gsm fleece hoodie with a roomy fit made for ultimate comfort. Double-stitched seams and a kangaroo pocket for warmth and style.</p>',
    tags: 'hoodie, fleece, casual, oversized',
    collections: ['Best Sellers', 'Sale'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['Charcoal', 'Cream', 'Dusty Pink', 'Forest Green'] },
      { name: 'Size',  values: ['S', 'M', 'L', 'XL', 'XXL'] },
    ],
    price: '69.99',
    compare_at_price: '89.99',
  },
  {
    title: 'Pleated Wide-Leg Trousers',
    vendor: 'Bloom Studio',
    product_type: 'Bottoms',
    body_html: '<p>Elegant wide-leg trousers with a high-rise fit and front pleats. Crafted from a flowy crepe fabric that drapes beautifully all day long.</p>',
    tags: 'trousers, bottoms, wide-leg, formal',
    collections: ['New Arrivals', 'Sale'],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['Black', 'Camel', 'Ivory'] },
      { name: 'Size',  values: ['XS', 'S', 'M', 'L', 'XL'] },
    ],
    price: '74.99',
    compare_at_price: '99.99',
  },
  {
    title: 'Running Sneakers Pro',
    vendor: 'StepUp',
    product_type: 'Footwear',
    body_html: '<p>High-performance running shoe with responsive foam cushioning and a breathable mesh upper. Ideal for daily training and long-distance runs.</p>',
    tags: 'sneakers, running, athletic, sport',
    collections: ['Best Sellers', 'Sale'],
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['Black', 'White', 'Neon Green', 'Blue'] },
      { name: 'Size',  values: ['7', '8', '9', '10', '11', '12'] },
    ],
    price: '109.99',
    compare_at_price: '139.99',
  },
  {
    title: 'Knit Beanie',
    vendor: 'Urban Basics',
    product_type: 'Accessories',
    body_html: '<p>Cozy ribbed knit beanie with a soft fleece lining. One size fits most. The perfect cold-weather accessory that pairs with everything.</p>',
    tags: 'beanie, hat, accessories, winter',
    collections: ['Best Sellers', 'Sale'],
    images: [
      'https://images.unsplash.com/photo-1510598155-3f7e1c3e4e0a?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['Black', 'Grey', 'Cream', 'Burgundy', 'Navy'] },
    ],
    price: '24.99',
    compare_at_price: null,
  },
  {
    title: 'Satin Slip Skirt',
    vendor: 'Bloom Studio',
    product_type: 'Bottoms',
    body_html: '<p>Luxe satin-finish midi skirt with an elasticated waist and a subtle side split. Effortlessly transitions from day to night wear.</p>',
    tags: 'skirt, satin, midi, summer',
    collections: ['Summer Collection', 'New Arrivals'],
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5218ees9c1?w=800&q=80',
      'https://images.unsplash.com/photo-1583496661160-fb5218ees9c1?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['Champagne', 'Black', 'Dusty Rose'] },
      { name: 'Size',  values: ['XS', 'S', 'M', 'L'] },
    ],
    price: '59.99',
    compare_at_price: '79.99',
  },
  {
    title: 'Structured Blazer',
    vendor: 'Modus Bags',
    product_type: 'Tops',
    body_html: '<p>Tailored single-button blazer with notched lapels and a slightly cropped silhouette. A versatile layering piece that elevates any outfit.</p>',
    tags: 'blazer, formal, jacket, tops',
    collections: ['New Arrivals'],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800&q=80',
    ],
    options: [
      { name: 'Color', values: ['Black', 'Ivory', 'Camel'] },
      { name: 'Size',  values: ['XS', 'S', 'M', 'L', 'XL'] },
    ],
    price: '139.99',
    compare_at_price: null,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   SEED LOGIC
   ───────────────────────────────────────────────────────────────────────── */

async function buildVariants(options, price, compareAtPrice) {
  if (options.length === 0) return [];

  /* Generate cartesian product of all option values */
  function cartesian(arrays) {
    return arrays.reduce((acc, arr) =>
      acc.flatMap(a => arr.map(b => [...a, b])), [[]]
    );
  }

  const combos = cartesian(options.map(o => o.values));

  return combos.map((combo, i) => {
    const variant = {
      price,
      compare_at_price: compareAtPrice || '',
      option1: combo[0] || null,
      option2: combo[1] || null,
      option3: combo[2] || null,
      inventory_management: 'shopify',
      inventory_quantity: Math.floor(Math.random() * 50) + 5,
      requires_shipping: true,
      taxable: true,
      weight: 0.5,
      weight_unit: 'kg',
    };
    return variant;
  });
}

async function createCollection(data) {
  console.log(`  Creating collection: ${data.title}`);
  const body = {
    custom_collection: {
      title: data.title,
      body_html: data.body_html,
      sort_order: data.sort_order,
      published: true,
    },
  };

  if (data.image_url) {
    body.custom_collection.image = { src: data.image_url };
  }

  const result = await POST('/custom_collections.json', body);
  console.log(`  ✓ Collection created: "${data.title}" (id: ${result.custom_collection.id})`);
  return result.custom_collection;
}

async function createProduct(data, collectionMap) {
  console.log(`\n  Creating product: ${data.title}`);

  const variants = await buildVariants(data.options, data.price, data.compare_at_price);

  const productBody = {
    product: {
      title: data.title,
      vendor: data.vendor,
      product_type: data.product_type,
      body_html: data.body_html,
      tags: data.tags,
      published: true,
      options: data.options.map(o => ({ name: o.name })),
      variants,
      images: data.images.map(src => ({ src })),
    },
  };

  const result = await POST('/products.json', productBody);
  const product = result.product;
  console.log(`  ✓ Product created: "${data.title}" (id: ${product.id}, ${product.variants.length} variants)`);

  /* Add to collections */
  for (const colName of (data.collections || [])) {
    const col = collectionMap[colName];
    if (!col) { console.warn(`    ⚠ Collection "${colName}" not found, skipping`); continue; }

    await POST('/collects.json', {
      collect: { product_id: product.id, collection_id: col.id },
    });
    console.log(`    → Added to collection: "${colName}"`);

    await sleep(200); /* avoid rate limits */
  }

  return product;
}

async function run() {
  /* ── Validate config ── */
  if (STORE_DOMAIN === 'your-store.myshopify.com' || ACCESS_TOKEN === 'shpat_xxxxxxxxxxxxxxxxxxxx') {
    console.error('\n❌  Please set STORE_DOMAIN and ACCESS_TOKEN at the top of seed-data.js\n');
    process.exit(1);
  }

  console.log(`\n🛍  Seeding dummy data to ${STORE_DOMAIN}\n`);

  /* ── Create Collections ── */
  console.log('📁 Creating collections...');
  const collectionMap = {};
  for (const col of COLLECTIONS) {
    const created = await createCollection(col);
    collectionMap[col.title] = created;
    await sleep(300);
  }
  console.log(`\n✅ ${COLLECTIONS.length} collections created.\n`);

  /* ── Create Products ── */
  console.log('📦 Creating products...');
  const createdProducts = [];
  for (const product of PRODUCTS) {
    const p = await createProduct(product, collectionMap);
    createdProducts.push(p);
    await sleep(500); /* Shopify allows ~2 requests/sec on Basic plan */
  }

  console.log(`\n✅ Done! Created:\n`);
  console.log(`   • ${COLLECTIONS.length} collections`);
  console.log(`   • ${createdProducts.length} products`);
  console.log(`\nOpen your Shopify admin to see the data:`);
  console.log(`   https://${STORE_DOMAIN}/admin/products`);
  console.log(`   https://${STORE_DOMAIN}/admin/collections\n`);
}

run().catch(err => {
  console.error('\n❌ Error:\n', err.message);
  process.exit(1);
});

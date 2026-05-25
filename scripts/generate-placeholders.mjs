import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(fileURLToPath(new URL('..', import.meta.url)), 'public');

function svg(label, w = 1920, h = 1080, accent = '#C9A962') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0A0B"/>
      <stop offset="50%" style="stop-color:#1a1814"/>
      <stop offset="100%" style="stop-color:#0A0A0B"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="80" y="80" width="${w - 160}" height="${h - 160}" fill="none" stroke="${accent}" stroke-width="2" opacity="0.4"/>
  <text x="50%" y="48%" fill="#F5F0E8" font-family="Georgia, serif" font-size="48" text-anchor="middle">${label}</text>
  <text x="50%" y="56%" fill="${accent}" font-family="sans-serif" font-size="24" text-anchor="middle" opacity="0.8">The Dubai Mall · Placeholder</text>
</svg>`;
}

function pinSvg(label, color = '#C9A962') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="14" fill="${color}" opacity="0.9"/>
  <circle cx="16" cy="16" r="6" fill="#0A0A0B"/>
  <title>${label}</title>
</svg>`;
}

function write(path, content) {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
}

const images = [
  ['images/placeholders/placeholder-16x9.svg', 'Media Placeholder'],
  ['images/placeholders/hero-main.svg', 'Hero Main'],
  ['images/placeholders/hero-atrium.svg', 'Hero Atrium'],
  ['images/placeholders/hero-exterior.svg', 'Hero Exterior'],
  ['images/hero/hero-main.jpg', 'Hero Main'],
  ['images/hero/hero-atrium.jpg', 'Hero Atrium'],
  ['images/hero/hero-exterior.jpg', 'Hero Exterior'],
  ['images/placeholders/attraction-aquarium.svg', 'Dubai Aquarium'],
  ['images/placeholders/attraction-underwater-zoo.svg', 'Underwater Zoo'],
  ['images/placeholders/attraction-fountain.svg', 'Dubai Fountain'],
  ['images/placeholders/attraction-ice-rink.svg', 'Ice Rink'],
  ['images/placeholders/attraction-vr-park.svg', 'VR Park'],
  ['images/placeholders/attraction-souq.svg', 'Souk'],
  ['images/placeholders/attraction-events.svg', 'Events'],
  ['images/attractions/dubai-aquarium.jpg', 'Dubai Aquarium'],
  ['images/attractions/underwater-zoo.jpg', 'Underwater Zoo'],
  ['images/attractions/dubai-fountain.jpg', 'Dubai Fountain'],
  ['images/attractions/ice-rink.jpg', 'Ice Rink'],
  ['images/attractions/vr-park.jpg', 'VR Park'],
  ['images/attractions/souq.jpg', 'Souk'],
  ['images/attractions/events.jpg', 'Events'],
  ['images/placeholders/dining-hero.svg', 'Dining Hero'],
  ['images/placeholders/dining-boulevard.svg', 'Dining Boulevard'],
  ['images/placeholders/dining-signature-01.svg', 'Signature Dining'],
  ['images/placeholders/dining-signature-02.svg', 'Global Cuisine'],
  ['images/placeholders/dining-variety.svg', 'Dining Variety'],
  ['images/dining/dining-hero.jpg', 'Dining Hero'],
  ['images/dining/dining-boulevard.jpg', 'Dining Boulevard'],
  ['images/dining/restaurant-signature-01.jpg', 'Signature 01'],
  ['images/dining/restaurant-signature-02.jpg', 'Signature 02'],
  ['images/dining/dining-variety.jpg', 'Dining Variety'],
  ['images/placeholders/retail-hero.svg', 'Retail Hero'],
  ['images/placeholders/retail-fashion-avenue.svg', 'Fashion Avenue'],
  ['images/placeholders/retail-luxury-wing.svg', 'Luxury Wing'],
  ['images/placeholders/retail-flagship-01.svg', 'Flagship 01'],
  ['images/placeholders/retail-flagship-02.svg', 'Flagship 02'],
  ['images/placeholders/retail-variety.svg', 'Retail Variety'],
  ['images/retail/retail-hero.jpg', 'Retail Hero'],
  ['images/retail/fashion-avenue.jpg', 'Fashion Avenue'],
  ['images/retail/luxury-wing.jpg', 'Luxury Wing'],
  ['images/retail/flagship-01.jpg', 'Flagship 01'],
  ['images/retail/flagship-02.jpg', 'Flagship 02'],
  ['images/retail/retail-variety.jpg', 'Retail Variety'],
  ['images/placeholders/stats-visitors.svg', 'Visitors'],
  ['images/placeholders/stats-scale.svg', 'Scale'],
  ['images/placeholders/stats-retail.svg', 'Retail Power'],
  ['images/placeholders/stats-tourism.svg', 'Tourism'],
  ['images/stats/visitors-annual.jpg', 'Visitors'],
  ['images/stats/square-footage.jpg', 'Scale'],
  ['images/stats/retail-power.jpg', 'Retail'],
  ['images/stats/tourism.jpg', 'Tourism'],
  ['images/placeholders/experiences-events.svg', 'Events'],
  ['images/placeholders/experiences-tourist.svg', 'Tourist'],
  ['images/placeholders/experiences-seasonal.svg', 'Seasonal'],
  ['images/experiences/events-hero.jpg', 'Events'],
  ['images/experiences/tourist-activation.jpg', 'Tourist'],
  ['images/experiences/seasonal.jpg', 'Seasonal'],
  ['images/placeholders/team-contact.svg', 'Contact'],
  ['images/placeholders/team-qr.svg', 'QR'],
  ['images/team/leasing-contact.jpg', 'Leasing Contact'],
  ['images/team/qr-contact.png', 'QR Contact'],
  ['images/placeholders/ui-noise.svg', 'Noise'],
  ['images/placeholders/ui-vignette.svg', 'Vignette'],
  ['images/ui/noise-texture.png', 'Noise'],
  ['images/ui/vignette.png', 'Vignette'],
  ['images/map/floor-map-overview.svg', 'Dubai Mall Map'],
  ['images/map/floor-map-level-g.svg', 'Level G'],
  ['images/map/floor-map-level-1.svg', 'Level 1'],
  ['images/map/floor-map-overview.png', 'Dubai Mall Map'],
  ['images/map/floor-map-level-g.png', 'Level G'],
  ['images/map/floor-map-level-1.png', 'Level 1'],
  ['images/placeholders/why-hero.svg', 'Why Dubai'],
  ['images/why/hero-downtown.jpg', 'Why Hero'],
  ['images/why/location-downtown.jpg', 'Location'],
  ['images/why/tourism-gateway.jpg', 'Tourism'],
  ['images/why/demographics-global.jpg', 'Demographics'],
  ['images/why/access-metro.jpg', 'Access'],
  ['images/placeholders/why-location.svg', 'Location'],
  ['images/placeholders/why-tourism.svg', 'Tourism'],
  ['images/placeholders/why-demographics.svg', 'Demographics'],
  ['images/placeholders/why-access.svg', 'Access'],
  ['images/luxury/luxury-hero.jpg', 'Luxury Hero'],
  ['images/luxury/maisons.jpg', 'Maisons'],
  ['images/luxury/jewellery.jpg', 'Jewellery'],
  ['images/luxury/concierge.jpg', 'Concierge'],
  ['images/luxury/private-shopping.jpg', 'Private Shopping'],
  ['images/placeholders/luxury-hero.svg', 'Luxury'],
  ['images/placeholders/luxury-maisons.svg', 'Maisons'],
  ['images/placeholders/luxury-jewellery.svg', 'Jewellery'],
  ['images/placeholders/luxury-concierge.svg', 'Concierge'],
  ['images/placeholders/luxury-private.svg', 'Private'],
  ['images/events/platform-hero.jpg', 'Events Platform'],
  ['images/events/brand-activations.jpg', 'Activations'],
  ['images/events/concerts.jpg', 'Concerts'],
  ['images/events/fashion-shows.jpg', 'Fashion Shows'],
  ['images/placeholders/events-platform-hero.svg', 'Events'],
  ['images/placeholders/events-activations.svg', 'Activations'],
  ['images/placeholders/events-concerts.svg', 'Concerts'],
  ['images/placeholders/events-fashion.svg', 'Fashion'],
  ['images/venues/fashion-dome.jpg', 'Fashion Dome'],
  ['images/venues/waterfront-promenade.jpg', 'Waterfront'],
  ['images/venues/expo-atrium.jpg', 'Expo Atrium'],
  ['images/venues/ice-rink-events.jpg', 'Ice Rink Events'],
  ['images/placeholders/venue-fashion-dome.svg', 'Fashion Dome'],
  ['images/placeholders/venue-waterfront.svg', 'Waterfront'],
  ['images/placeholders/venue-expo.svg', 'Expo'],
  ['images/placeholders/venue-ice-rink.svg', 'Ice Rink Venue'],
];

const logos = [
  ['images/logos/dubai-mall-logo-white.svg', 'THE DUBAI MALL', '#F5F0E8'],
  ['images/logos/dubai-mall-logo-dark.svg', 'THE DUBAI MALL', '#0A0A0B'],
  ['images/logos/dubai-mall-mark.svg', 'DM', '#C9A962'],
  ['images/logos/emaar-partner.svg', 'EMAAR', '#C9A962'],
  ['images/placeholders/logo-partner.svg', 'PARTNER', '#888'],
];

const pins = [
  ['images/map/map-pin-aquarium.svg', 'Aquarium'],
  ['images/map/map-pin-fashion.svg', 'Fashion'],
  ['images/map/map-pin-ice-rink.svg', 'Ice Rink'],
  ['images/map/map-pin-vr-park.svg', 'VR Park'],
  ['images/map/map-pin-dining.svg', 'Dining'],
  ['images/map/map-pin-souk.svg', 'Souk'],
  ['images/map/map-pin-fountain.svg', 'Fountain'],
];

const uiIcons = ['play', 'pause', 'sound-on', 'sound-off', 'fullscreen', 'close'];

for (const [path, label] of images) {
  const ext = path.endsWith('.png') ? 'svg' : null;
  const content = svg(label);
  write(path.replace(/\.(jpg|png)$/, '.svg'), content);
  if (path.match(/\.(jpg|png)$/)) write(path, content);
}

for (const [path, text, fill] of logos) {
  write(
    path,
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80" viewBox="0 0 320 80">
  <text x="160" y="48" fill="${fill}" font-family="Georgia, serif" font-size="22" text-anchor="middle" letter-spacing="4">${text}</text>
</svg>`
  );
}

for (const [path, label] of pins) write(path, pinSvg(label));

for (const name of uiIcons) {
  write(
    `images/ui/icon-${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="#C9A962" stroke-width="1.5"/><title>${name}</title></svg>`
  );
}
write('images/ui/favicon.svg', pinSvg('DM'));

// Video placeholder readme
write(
  'videos/placeholders/README.md',
  `# Video placeholders\n\nAdd gradient-loop.mp4 here (H.264, 3–5s, 1920x1080).\n\n\`\`\`bash\nffmpeg -f lavfi -i color=c=0x0A0A0B:s=1920x1080:d=5 -pix_fmt yuv420p gradient-loop.mp4\n\`\`\`\n`
);

// .gitkeep for empty video dirs
const videoDirs = [
  'videos/hero',
  'videos/ambient',
  'videos/attractions',
  'videos/dining',
  'videos/retail',
  'videos/transitions',
  'videos/why',
  'videos/luxury',
  'videos/events',
  'videos/venues',
];
for (const d of videoDirs) {
  const p = join(root, d, '.gitkeep');
  if (!existsSync(dirname(p))) mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, '', 'utf8');
}

console.log('Placeholders generated under public/');

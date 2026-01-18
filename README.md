# House Finder

A retro-futuristic web app for discovering house music events across major US cities.

## Features

- **18 US Cities**: Los Angeles, San Diego, Orange County, San Francisco, Sacramento, San Jose, Seattle, Portland, Chicago, Atlanta, Austin, Houston, Dallas/Fort Worth, Las Vegas, Miami, Tampa Bay, Orlando, Denver, New York City
- **Natural Language Date Parsing**: Search using phrases like "tonight", "next weekend", "this friday"
- **Day/Night Event Classification**: Filter events by time of day
- **Interactive Map**: Dark-themed Leaflet map with event markers
- **Retro CLI Aesthetic**: Terminal-style interface with red wireframe design

## Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generator)
- **Maps**: [Leaflet.js](https://leafletjs.com/) with [CartoDB Dark Matter](https://carto.com/basemaps/) tiles
- **Date Parsing**: [chrono-node](https://github.com/wanasit/chrono)
- **Styling**: Custom CSS with VT323 terminal font
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding Events

Events are stored in `src/data/events.json`. To add a new event:

```json
{
  "id": "evt_unique_id",
  "name": "Event Name",
  "venue": {
    "name": "Venue Name",
    "address": "123 Main St, City, ST 12345",
    "lat": 34.0522,
    "lng": -118.2437
  },
  "artists": ["Artist 1", "Artist 2"],
  "promoters": ["Promoter Name"],
  "datetime": "2025-01-25T22:00:00-08:00",
  "endTime": "2025-01-26T04:00:00-08:00",
  "cost": "$40-$80",
  "link": "https://event-page.com",
  "city": "los-angeles"
}
```

### City IDs

Use these city IDs in the `city` field:

| City | ID |
|------|-----|
| Los Angeles | `los-angeles` |
| San Diego | `san-diego` |
| Orange County | `orange-county` |
| San Francisco | `san-francisco` |
| Sacramento | `sacramento` |
| San Jose | `san-jose` |
| Seattle | `seattle` |
| Portland | `portland` |
| Chicago | `chicago` |
| Atlanta | `atlanta` |
| Austin | `austin` |
| Houston | `houston` |
| Dallas/Fort Worth | `dallas-fort-worth` |
| Las Vegas | `las-vegas` |
| Miami | `miami` |
| Tampa Bay | `tampa-bay` |
| Orlando | `orlando` |
| Denver | `denver` |
| New York City | `new-york-city` |

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

Or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` (if you create one) for automatic deployment to GitHub Pages.

## Project Structure

```
house_finder/
├── src/
│   ├── data/
│   │   ├── cities.json      # City definitions with coordinates
│   │   └── events.json      # Event data (manually curated)
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML layout
│   ├── pages/
│   │   └── index.astro      # Main application
│   ├── scripts/
│   │   ├── types.ts         # TypeScript interfaces
│   │   ├── cityMatcher.ts   # City search logic
│   │   ├── dateParser.ts    # Natural language date parsing
│   │   └── eventFilter.ts   # Event filtering utilities
│   └── styles/
│       ├── global.css       # Global styles and variables
│       ├── terminal.css     # Terminal UI styles
│       └── map.css          # Leaflet map customizations
├── public/
│   └── favicon.svg          # Site favicon
├── astro.config.mjs         # Astro configuration
├── netlify.toml             # Netlify deployment config
└── package.json
```

## License

MIT

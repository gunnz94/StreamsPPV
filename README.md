# StreamsPPV Stremio Addon

A Stremio addon that provides streaming content for Movies, Series, and Channels.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the addon:
   ```bash
   npm start
   ```

3. Add the addon to Stremio using the local URL: `http://localhost:PORT`

## Features

- **Movies**: Provides test movie content
- **Series**: Provides test series content  
- **Channels**: Provides test TV channel content
- **Direct Streaming**: All content streams from sources.

## Configuration

The addon will start on a random available port. Check the console output for the exact URL to add to Stremio.

## Files

- `manifest.json` - Stremio addon manifest
- `addon.js` - Main addon logic
- `package.json` - Node.js dependencies
- `README.md` - This file


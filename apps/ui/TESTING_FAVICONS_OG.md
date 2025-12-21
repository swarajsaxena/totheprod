# Testing Favicons and Open Graph Images Locally

## 1. Start the Development Server

```bash
# From the root directory
bun dev

# Or from apps/ui directory
cd apps/ui
bun dev
```

The server will start at `http://localhost:3000` (or the next available port).

## 2. Testing Favicons

### Method 1: Browser Tab

1. Open `http://localhost:3000` in your browser
2. Check the browser tab - you should see the favicon
3. The favicon should automatically switch based on your system theme:
   - **Light mode**: Green logo (#00DF81)
   - **Dark mode**: Dark logo (#141414)

### Method 2: Direct URL Access

Visit these URLs directly in your browser:

- **Light mode favicon**: `http://localhost:3000/icon`
- **Dark mode favicon**: `http://localhost:3000/icon-dark`

You should see a 32x32 PNG image of your logo.

### Method 3: Browser DevTools

1. Open DevTools (F12 or Cmd+Option+I)
2. Go to the **Network** tab
3. Reload the page
4. Filter by "icon" or "favicon"
5. You should see requests for `/icon` and `/icon-dark`
6. Click on them to preview the images

### Method 4: Force Dark Mode Testing

1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Find **Local Storage** or use **Console**:
   ```javascript
   // Force dark mode
   document.documentElement.classList.add('dark')
   // Force light mode
   document.documentElement.classList.remove('dark')
   ```
4. Reload the page to see the appropriate favicon

## 3. Testing Open Graph Images

### Method 1: Direct URL Access

Visit this URL directly in your browser:

```
http://localhost:3000/opengraph-image
```

You should see a 1200x630 PNG image with your logo and "ToTheProd UI" text.

### Method 2: View Page Source

1. Open `http://localhost:3000`
2. Right-click → **View Page Source** (or Cmd+Option+U)
3. Look for the Open Graph meta tags:
   ```html
   <meta
     property="og:image"
     content="http://localhost:3000/opengraph-image"
   />
   <meta
     name="twitter:card"
     content="summary_large_image"
   />
   <meta
     name="twitter:image"
     content="http://localhost:3000/opengraph-image"
   />
   ```

### Method 3: Online Validators (Requires Public URL)

For testing Twitter/X cards, you'll need a publicly accessible URL. Options:

**Option A: Use ngrok or similar tunnel**

```bash
# Install ngrok
npm install -g ngrok

# Start tunnel
ngrok http 3000

# Use the ngrok URL in validators
```

**Option B: Deploy to Vercel Preview**

1. Push to a branch
2. Vercel will create a preview URL
3. Use that URL in validators

**Online Validators:**

- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
- **Open Graph Preview**: https://www.opengraph.xyz/

### Method 4: Browser Extension

Install a browser extension like:

- **Open Graph Preview** (Chrome/Firefox)
- **Meta Tags Preview** (Chrome)

These will show you how your page appears when shared.

## 4. Quick Test Checklist

- [ ] Favicon appears in browser tab (light mode)
- [ ] Favicon switches to dark version when system is in dark mode
- [ ] `/icon` URL returns a 32x32 PNG image
- [ ] `/icon-dark` URL returns a 32x32 PNG image
- [ ] `/opengraph-image` URL returns a 1200x630 PNG image
- [ ] Open Graph image shows your logo
- [ ] Meta tags in page source include correct image URLs
- [ ] Twitter card meta tags are present

## 5. Troubleshooting

### Favicon not showing?

1. Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
2. Clear browser cache
3. Check browser console for errors
4. Verify the icon files are in `apps/ui/app/` directory

### Open Graph image not generating?

1. Check if the dev server is running
2. Visit `/opengraph-image` directly - should return an image
3. Check browser console for errors
4. Verify `opengraph-image.tsx` exists in `apps/ui/app/`

### Dark mode favicon not switching?

1. Check your system theme preference
2. Verify `icon-dark.tsx` exists in `apps/ui/app/`
3. Try manually adding/removing `dark` class on `<html>` element
4. Check if your theme provider is working correctly

## 6. Production Testing

Once deployed, test with:

- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- Share a link on Twitter/X to see the preview card

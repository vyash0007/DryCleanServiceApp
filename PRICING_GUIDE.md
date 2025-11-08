# Pricing Management

## How to Update Pricing

All pricing information is stored in the JSON file located at:
```
src/data/pricing.json
```

### Structure

The pricing data is organized by categories (Dry Clean Rates, Wash Rates, Prepaid Plans), and each category contains services.

### Service Object Structure

Each service has the following properties:

```json
{
  "id": "unique-service-id",
  "icon": "👔",  // Emoji icon
  "name": "Service Name",
  "description": "Service description...",
  "price": 82,  // Numeric price
  "unit": "pc",  // Unit: pc, pair, seat, sqft, etc.
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ]
}
```

### To Add a New Service

1. Open `src/data/pricing.json`
2. Find the appropriate category
3. Add a new service object to the `services` array:

```json
{
  "id": "new-service",
  "icon": "🧴",
  "name": "New Service",
  "description": "Description of the new service...",
  "price": 150,
  "unit": "pc",
  "features": [
    "Feature 1",
    "Feature 2"
  ]
}
```

### To Update Pricing

Simply change the `price` value in the JSON file:

```json
{
  "id": "dry-cleaning",
  "price": 82  // Change this to 90 to update the price
}
```

### To Add/Remove Features

Modify the `features` array:

```json
{
  "features": [
    "Existing Feature",
    "New Feature"  // Add new feature
  ]
}
```

### Pages That Use This Data

- **Homepage** (`/`): Displays the first 6 services
- **Pricing Page** (`/pricing`): Displays all services with tabs

### Notes

- The homepage shows only the first 6 services from the Dry Clean Rates category
- The pricing page shows all services organized by tabs
- Changes to the JSON file will be reflected immediately on both pages
- Make sure to use valid JSON syntax (commas, quotes, brackets)
- Price should be a number (without ₹ symbol)
- Icons should be emojis

### Example: Changing Dry Cleaning Price from ₹82 to ₹90

1. Open `src/data/pricing.json`
2. Find the dry-cleaning service
3. Change `"price": 82` to `"price": 90`
4. Save the file
5. Refresh the website - the new price will be displayed

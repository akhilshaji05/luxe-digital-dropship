# Qikink Dropshipping Integration Guide

## Overview

Your Luxe Digital store now supports **Qikink** print-on-demand and dropshipping integration! This allows you to sell custom products without holding inventory.

---

## How It Works

1. **Add Products**: Add Qikink products to your catalog with their Product/Variant IDs
2. **Customer Orders**: Customers buy from your store
3. **Auto-Forward**: Orders are sent to you via email/dashboard
4. **Qikink Fulfills**: You manually place the order on Qikink for fulfillment
5. **Direct Shipping**: Qikink ships directly to your customer

---

## Step 1: Set Up Your Qikink Account

1. **Sign up** at [qikink.com](https://qikink.com)
2. **Add credits** to your Qikink wallet
3. **Browse catalog** and select products you want to sell

---

## Step 2: Add Qikink Products to Your Store

### In Admin Dashboard:

1. Go to **Admin → Inventory**
2. Click **"Delivery" tab** in the product form
3. Scroll to **"🚀 Qikink Dropshipping"** section
4. Fill in:
   - **Fulfillment Type**: Select "Qikink Fulfillment"
   - **Qikink Product ID**: (Optional) Get from Qikink dashboard
   - **Qikink Variant ID**: (Optional) For specific variants (size/color)

### Example Product Setup:

**Product**: Custom T-Shirt  
**Qikink Product ID**: `12345`  
**Qikink Variant ID**: `67890` (for "Large, Black")  
**Fulfillment Type**: Qikink Fulfillment

---

## Step 3: Process Orders

### When a Customer Places an Order:

#### Method 1: Manual Processing (Current)

1. Check your **Admin → Orders** dashboard
2. For orders with Qikink products:
   - Note: Product name, size, color, customer address
   - Go to your Qikink dashboard
   - Create a new order with customer details
   - Qikink will fulfill and ship

#### Method 2: Email Notifications (Recommended)

Set up email alerts in **Admin → Settings → Site Customization**:
- Orders will email you when placed
- Forward order details to Qikink support: `support@qikink.com`

---

## Step 4: Find Qikink Product IDs

### From Qikink Dashboard:

1. Log in to [qikink.com](https://qikink.com)
2. Go to **Products** or **Catalog**
3. Click on a product
4. Look for:
   - **Product ID** (usually in URL or product details)
   - **Variant ID** (for specific sizes/colors)
5. Copy these IDs to your Luxe Digital admin form

### If IDs Not Visible:

- Contact Qikink support
- Or simply add products without IDs - you can manually match orders later

---

## Step 5: Set Pricing

**Important:** Your store price should include:

```
Your Selling Price = Qikink Cost + Your Profit + Shipping (if applicable)
```

**Example:**
- Qikink T-Shirt Cost: ₹300
- Your Desired Profit: ₹200
- **Set Your Price**: ₹500

---

## Advanced: Automatic Order Forwarding

### Option A: Zapier Integration (Future Enhancement)

1. Connect your Luxe Digital orders to Zapier
2. Use Zapier to auto-forward to Qikink API
3. **Requires**: Qikink API access (contact their support)

### Option B: Google Sheets Workflow (Available Now)

1. Enable **Google Sheets sync** in Admin → Settings
2. Orders automatically log to Google Sheets
3. Use Google Sheets script to forward to Qikink
4. Or manually review and process from sheet

---

## Product Types Best for Qikink

✅ **Recommended:**
- Custom T-Shirts
- Hoodies & Sweatshirts  
- Mugs
- Phone Cases
- Posters & Wall Art
- Tote Bags
- Notebooks

❌ **Not Suitable:**
- Digital downloads
- Non-custom physical items
- Perishable goods

---

## Pricing Examples

### T-Shirt Dropshipping:

| Item | Qikink Cost | Your Price | Your Profit |
|------|------------|------------|-------------|
| Basic Tee | ₹250 | ₹599 | ₹349 |
| Premium Hoodie | ₹650 | ₹1,299 | ₹649 |
| Custom Mug | ₹180 | ₹449 | ₹269 |

---

## Troubleshooting

**Q: Can't find Qikink Product IDs?**  
→ Just add products without IDs. Manually match orders when forwarding to Qikink.

**Q: How do I handle returns?**  
→ Contact Qikink support with order details. They handle quality issues.

**Q: Shipping costs?**  
→ Qikink includes shipping in product cost. Check their pricing for details.

**Q: Order tracking?**  
→ Qikink provides tracking numbers. Share these with customers via email.

---

## Recommended Workflow

1. **Morning**: Check Admin → Orders for new orders
2. **Process**: Copy order details to Qikink dashboard
3. **Confirm**: Place order on Qikink
4. **Update**: Mark order as "Processing" in your admin
5. **Track**: Get tracking from Qikink
6. **Share**: Email tracking to customer

---

## Next Steps

1. **Sign up** for Qikink if you haven't
2. **Browse** their product catalog
3. **Add** 5-10 popular products to your store
4. **Test** with a sample order to yourself
5. **Launch** and start selling!

---

## Support

**Qikink Support:**
- Email: support@qikink.com
- Website: [qikink.com/contact](https://qikink.com/contact)

**Your Store:**
- Admin dashboard for order management
- Google Sheets for order tracking
- Email notifications for alerts

---

**Status**: ✅ Qikink Integration Ready!

You can now add Qikink products to your catalog and start dropshipping!

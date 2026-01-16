
export const generateDummyProducts = (count = 100) => {
    const categories = ['Presets', 'Templates', 'Clothing', 'Accessories', 'Digital Art'];
    const statuses = ['Active', 'Sold Out', 'Draft'];
    const brands = ['Luxe', 'Noir', 'Vanguard', 'Elite', 'Aura'];

    const products = [];

    for (let i = 0; i < count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const type = category === 'Clothing' || category === 'Accessories' ? 'Physical' : 'Digital';
        const price = (Math.random() * 200 + 20).toFixed(2);
        const hasSale = Math.random() > 0.7;
        const salePrice = hasSale ? (price * 0.8).toFixed(2) : null;

        // Abstract patterns or lifestyle shots
        const imageId = Math.floor(Math.random() * 1000);
        const image = `https://picsum.photos/seed/${imageId}/800/800`;

        // Simulate Qikink products (approx 30% chance or if clothing)
        const isQikink = category === 'Clothing' && Math.random() > 0.3;
        const qikinkId = isQikink ? Math.floor(Math.random() * 50000) + 10000 : '';
        const qikinkVarId = isQikink ? Math.floor(Math.random() * 50000) + 10000 : '';

        products.push({
            id: Date.now() + i, // Ensure unique IDs
            name: `${brand} ${category} ${i + 1}`,
            brand: brand,
            sku: `${brand.toUpperCase().substring(0, 3)}-${1000 + i}`,
            stock: Math.floor(Math.random() * 100),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            category: category,
            type: type,
            price: parseFloat(price),
            salePrice: salePrice ? parseFloat(salePrice) : null,
            tags: [category.toLowerCase(), 'premium', 'luxe', 'limited', ...(isQikink ? ['qikink', 'dropship'] : [])],
            weight: type === 'Physical' ? '0.5kg' : '0kg',
            dimensions: type === 'Physical' ? '10x10x10cm' : 'N/A',
            downloadUrl: type === 'Digital' ? 'https://example.com/download' : '',
            qikinkProductId: qikinkId,
            qikinkVariantId: qikinkVarId,
            fulfillmentType: isQikink ? 'qikink' : (type === 'Physical' ? 'self' : 'digital'),
            image: image,
            images: [image, `https://picsum.photos/seed/${imageId + 10000}/800/800`],
            desc: `Premium ${category.toLowerCase()} for the elite.`,
            fullDesc: `Experience the pinnacle of quality with this ${brand} ${category}. Crafted for those who demand excellence. This item #${i + 1} represents our commitment to luxury and performance.${isQikink ? ' Fulfilled by Qikink global network.' : ''}`,
            sizes: type === 'Physical' ? ['S', 'M', 'L', 'XL'] : [],
            colors: type === 'Physical' ? ['Black', 'Gold', 'White', 'Navy'] : [],
            rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
            reviews: [],
            createdAt: new Date().toISOString()
        });
    }

    return products;
};

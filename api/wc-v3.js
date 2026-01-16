
export default function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Mimic WooCommerce REST API v3 Index or specific endpoints
    const path = req.url || '';

    if (path.includes('/products')) {
        return res.status(200).json([]); // Return empty products list
    }

    if (path.includes('/orders')) {
        return res.status(200).json([]); // Return empty orders list
    }

    res.status(200).json({
        namespace: "wc/v3",
        routes: {
            "/wc/v3": {
                "namespace": "wc/v3",
                "methods": ["GET"],
                "endpoints": [{ "methods": ["GET"], "args": [] }]
            },
            "/wc/v3/products": {
                "namespace": "wc/v3",
                "methods": ["GET", "POST"],
                "endpoints": [{ "methods": ["GET", "POST"], "args": [] }]
            },
            "/wc/v3/orders": {
                "namespace": "wc/v3",
                "methods": ["GET", "POST"],
                "endpoints": [{ "methods": ["GET", "POST"], "args": [] }]
            }
        }
    });
}

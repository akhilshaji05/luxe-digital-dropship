
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

    // Standard WordPress Headers
    res.setHeader('X-Powered-By', 'PHP/8.2.0');
    res.setHeader('X-Pingback', `https://${req.headers.host}/xmlrpc.php`);
    res.setHeader('Link', `<https://${req.headers.host}/wp-json/>; rel="https://api.w.org/"`);
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');

    // Handle Legacy ?rest_route= parameter
    const { rest_route } = req.query;
    if (rest_route) {
        if (rest_route.includes('/wc/v3/products')) return res.status(200).json([]);
        if (rest_route.includes('/wc/v3')) return res.status(200).json({ namespace: "wc/v3", routes: { "/wc/v3": { "namespace": "wc/v3" } } });
        if (rest_route === '/' || rest_route === '') { /* fall through to main index */ }
        else if (rest_route.includes('wp/v2')) return res.status(200).json({ namespace: "wp/v2", routes: {} });
    }

    // Mimic WordPress REST API Index
    res.status(200).json({
        name: "Luxe Digital Store",
        description: "Premium E-commerce Store",
        url: `https://${req.headers.host}`,
        home: `https://${req.headers.host}`,
        gmt_offset: "0",
        timezone_string: "UTC",
        namespaces: [
            "wp/v2",
            "wc/v1",
            "wc/v2",
            "wc/v3",
            "jetpack/v4"
        ],
        authentication: [],
        routes: {
            "/": {
                "namespace": "",
                "methods": ["GET"],
                "endpoints": [{
                    "methods": ["GET"],
                    "args": {
                        "context": {
                            "default": "view",
                            "required": false
                        }
                    }
                }],
                "_links": {
                    "self": `https://${req.headers.host}/wp-json/`
                }
            },
            "/wp/v2": {
                "namespace": "wp/v2",
                "methods": ["GET"],
                "endpoints": [{ "methods": ["GET"], "args": [] }]
            },
            "/wp/v2/posts": {
                "namespace": "wp/v2",
                "methods": ["GET"],
                "endpoints": [{ "methods": ["GET"], "args": [] }]
            },
            "/wp/v2/pages": {
                "namespace": "wp/v2",
                "methods": ["GET"],
                "endpoints": [{ "methods": ["GET"], "args": [] }]
            },
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
        },
        "_links": {
            "help": [{ "href": "https://developer.wordpress.org/rest-api/" }],
            "self": [{ "href": `https://${req.headers.host}/wp-json/` }]
        }
    });
}

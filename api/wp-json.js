
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

    // Mimic WordPress REST API Index
    res.status(200).json({
        name: "Luxe Digital Store",
        description: "Premium E-commerce Store",
        url: `https://${req.headers.host}`,
        namespaces: [
            "wp/v2",
            "wc/v1",
            "wc/v2",
            "wc/v3"
        ],
        authentication: [],
        routes: {
            "/": {
                "namespace": "",
                "methods": ["GET"],
                "endpoints": [{ "methods": ["GET"], "args": [] }]
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
            }
        }
    });
}

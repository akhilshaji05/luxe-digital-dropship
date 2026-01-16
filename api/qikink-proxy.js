// Native fetch is available in Vercel Node.js 18+ environment

export default async function handler(req, res) {
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

    try {
        const { endpoint, method = 'GET', body } = req.body;

        if (!endpoint) {
            return res.status(400).json({ error: 'Missing endpoint in request body' });
        }

        console.log(`[Qikink Proxy] ${method} -> ${endpoint}`);

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        if (body && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(body);
        }

        // Pass along Authorization header if present
        if (req.headers.authorization) {
            options.headers['Authorization'] = req.headers.authorization;
        }

        const apiRes = await fetch(endpoint, options);

        // Handle non-JSON responses gracefully
        const contentType = apiRes.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await apiRes.json();
            if (!apiRes.ok) {
                console.error('[Qikink Proxy] API Error:', data);
                return res.status(apiRes.status).json(data);
            }
            return res.status(200).json(data);
        } else {
            const text = await apiRes.text();
            if (!apiRes.ok) {
                console.error('[Qikink Proxy] Text Error:', text);
                return res.status(apiRes.status).json({ error: text });
            }
            return res.status(200).json({ message: 'Success', data: text });
        }

    } catch (error) {
        console.error('[Qikink Proxy] Server Error:', error);
        return res.status(500).json({ error: error.message });
    }
}

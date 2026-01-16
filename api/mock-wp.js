export default function handler(req, res) {
    // If it looks like a CSS/JS file, return empty content with correct type
    const url = req.url || '';
    if (url.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
    else if (url.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
    else res.setHeader('Content-Type', 'text/html');

    res.status(200).send('/* Mock WP Content */');
}

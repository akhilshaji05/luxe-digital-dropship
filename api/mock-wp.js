export default function handler(req, res) {
    // If it looks like a CSS/JS file, return empty content with correct type
    const url = req.url || '';
    const { rsd } = req.query || {};

    if (rsd !== undefined || url.includes('rsd')) {
        res.setHeader('Content-Type', 'text/xml');
        return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><rsd version="1.0" xmlns="http://archipelago.phrasewise.com/rsd"><service><engineName>WordPress</engineName><engineLink>https://wordpress.org/</engineLink><homePageLink>https://${req.headers.host}/</homePageLink><apis><api name="WordPress" blogID="1" preferred="true" apiLink="https://${req.headers.host}/xmlrpc.php" /><api name="Movable Type" blogID="1" preferred="false" apiLink="https://${req.headers.host}/xmlrpc.php" /><api name="MetaWeblog" blogID="1" preferred="false" apiLink="https://${req.headers.host}/xmlrpc.php" /><api name="Blogger" blogID="1" preferred="false" apiLink="https://${req.headers.host}/xmlrpc.php" /><api name="WP-API" blogID="1" preferred="false" apiLink="https://${req.headers.host}/wp-json/" /></apis></service></rsd>`);
    }

    // Handle XML-RPC for Jetpack/Woo verification
    if (url.includes('xmlrpc.php') || req.body && req.body.includes('methodCall')) {
        res.setHeader('Content-Type', 'text/xml');
        return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><methodResponse><params><param><value><string>XML-RPC server accepts POST requests only.</string></value></param></params></methodResponse>`);
    }

    if (url.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
    else if (url.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
    else res.setHeader('Content-Type', 'text/html');

    res.status(200).send('/* Mock WP Content */');
}

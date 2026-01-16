
export default function handler(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<!-- Mock WordPress Login Page --><html><body><h1>WordPress Login</h1></body></html>');
}

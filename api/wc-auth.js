
export default function handler(req, res) {
    const { callback_url, return_url } = req.query;

    // Standard WooCommerce OAuth v1/v3 flow for HTTPS callbacks expects a POST request.
    // We'll use an auto-submitting HTML form to simulate this.
    if (callback_url) {
        const isHttps = callback_url.startsWith('https');

        if (isHttps) {
            return res.status(200).send(`
        <html>
          <body onload="document.forms[0].submit()">
            <form method="post" action="${callback_url}">
              <input type="hidden" name="consumer_key" value="ck_luxe_mock_${Date.now()}" />
              <input type="hidden" name="consumer_secret" value="cs_luxe_mock_${Date.now()}" />
              <input type="hidden" name="key_id" value="1" />
              <input type="hidden" name="user_id" value="1" />
              <input type="hidden" name="success" value="1" />
            </form>
            <p>Connecting to Qikink... Please wait.</p>
          </body>
        </html>
      `);
        } else {
            const mockKeysUrl = new URL(callback_url);
            mockKeysUrl.searchParams.append('consumer_key', `ck_luxe_mock_${Date.now()}`);
            mockKeysUrl.searchParams.append('consumer_secret', `cs_luxe_mock_${Date.now()}`);
            mockKeysUrl.searchParams.append('key_id', '1');
            mockKeysUrl.searchParams.append('user_id', '1');
            return res.redirect(mockKeysUrl.toString());
        }
    }

    if (return_url) {
        return res.redirect(return_url);
    }

    res.status(200).send("Luxe Digital Store Authorization Page. Please return to Qikink to complete setup.");
}

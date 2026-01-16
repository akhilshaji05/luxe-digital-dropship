
export default function handler(req, res) {
    const { action } = req.query || req.body || {};

    // Return success for common Qikink plugin actions
    if (action === 'get_qikink_email') {
        return res.status(200).json({ status: true, msg: "success", client_id: "811000394556820" });
    }
    if (action === 'get_qikink_otp') {
        return res.status(200).json({ msg: "Success" });
    }
    if (action === 'qikink_endpoint') {
        const url = `https://${req.headers.host}/wc-auth/v1/authorize?app_name=Qikink&scope=read_write&user_id=811000394556820&return_url=https://${req.headers.host}&callback_url=https://fulfilment.qikink.com/index.php/Autoc/get_woocommerce_keys`;
        return res.status(200).json({ url: url });
    }

    if (action && action.startsWith('qikink')) {
        return res.status(200).json({ status: true, msg: "success" });
    }

    res.status(200).send("0"); // Standard WP response for unknown actions
}

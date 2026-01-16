
export default function handler(req, res) {
    const { action } = req.query || req.body || {};

    // Return success for common Qikink plugin actions
    if (action && action.startsWith('qikink')) {
        return res.status(200).json({ status: true, msg: "success", client_id: "811000394556820" });
    }

    res.status(200).send("0"); // Standard WP response for unknown actions
}

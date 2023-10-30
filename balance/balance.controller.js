const express = require('express')
const router = express.Router()

const balanceService = require('./balance.service');

router.put('/charge', async (req, res) => {
    const { amount, userId } = req.body;
    if (amount == null || !userId) return res.status(400).send({
        error: "You must provide amount and userId"
    });
    try  {
        const updateResult = await balanceService.updateBalance({ userId, amount });
        return res.send(updateResult);
    } catch (err) {
        return res.status(err.status ?? 500).send({ error: err.message });
    }
});

module.exports = router;

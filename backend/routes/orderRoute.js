import express from 'express';
import orderModel from '../models/orderModel.js';

const router = express.Router();

router.get('/order/:id', async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        if (order) {
            res.json({ success: true, data: order });
        } else {
            res.json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching order" });
    }
});

export default router;

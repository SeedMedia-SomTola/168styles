import { NextApiRequest, NextApiResponse } from 'next';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // Store your token in an environment variable
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Store your group chat ID in an environment variable

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { selectedSize, selectedColor, qtyChange, productId, productName, productPrice, phone, customer, address } = req.body;

    if (!qtyChange && !productId && !productName && !productPrice && !phone && !customer && !address) {
        return res.status(400).json({ message: 'Message is required' });
    }

    const message = `
    📦 *New Product Information* 📦
    - 📇 *Customer Name:* ${customer}
    - 📞 *Phone:* ${phone}
    - 📍 *Address:* ${address}
    - =============================
    - 🆔 *Product ID:* ${productId}
    - 🏷️ *Name:* ${productName}
    - 📏 *Size:* ${selectedSize || 'N/A'}
    - 🎨 *Color:* ${selectedColor || 'N/A'}
    - 🔢 *Quantity:* ${qtyChange || 0}
    - 💵 *Price:* $${Number(productPrice).toFixed(2) || '0.00'}
    - 💵 *Total:* $${(Number(qtyChange) * Number(productPrice)).toFixed(2) || '0.00'}
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown', // Enables formatting
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ message: errorData.description });
        }

        const data = await response.json();
        return res.status(200).json({ message: 'Message sent successfully', data });
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        return res.status(500).json({ message: 'Failed to send message', error });
    }
}

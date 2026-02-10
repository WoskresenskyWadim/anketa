// pages/api/submit.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешён' });
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Анкета`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: req.body
        })
      }
    );

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      const errorText = await response.text();
      console.error('Airtable API error:', errorText);
      res.status(500).json({ success: false, error: errorText });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
}

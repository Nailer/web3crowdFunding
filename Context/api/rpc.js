export default async function handler(req, res) {
    try {
      const response = await fetch("https://testnet.hashio.io/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
      res.status(200).json(data);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
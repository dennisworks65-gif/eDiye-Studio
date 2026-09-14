export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No authorization code provided from GitHub.');
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).send('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET in Vercel environment variables.');
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenResponse.json();
    const accessToken = data.access_token;

    if (!accessToken) {
      return res.status(400).send(`Failed to obtain access token from GitHub: ${JSON.stringify(data)}`);
    }

    // Decap CMS postMessage protocol
    const content = `<!doctype html>
<html>
<head><title>Authenticating...</title></head>
<body>
<p style="font-family: sans-serif; text-align: center; margin-top: 40px;">Authorizing GitHub with eDiye CMS...</p>
<script>
  (function() {
    const payload = 'authorization:github:success:${JSON.stringify({ token: accessToken, provider: 'github' })}';
    function send(origin) {
      try {
        if (window.opener) {
          window.opener.postMessage(payload, origin || '*');
        }
      } catch (err) {}
    }
    function receiveMessage(e) {
      send(e.origin);
      window.removeEventListener('message', receiveMessage, false);
      setTimeout(function() { window.close(); }, 500);
    }
    window.addEventListener('message', receiveMessage, false);
    send('*');
    if (window.opener) {
      window.opener.postMessage('authorizing:github', '*');
    }
  })();
</script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(content);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Authentication error during OAuth token exchange');
  }
}

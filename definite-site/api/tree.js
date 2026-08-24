export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' });
    return;
  }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const input = (body?.input || '').toString().slice(0, 2000).trim();
  const code = (body?.code || '').toString().trim();

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: 'Server not configured: ANTHROPIC_API_KEY missing.' });
    return;
  }
  if (!process.env.DEFINITE_ACCESS_CODE || code !== process.env.DEFINITE_ACCESS_CODE) {
    res.status(401).json({ error: 'Invalid access code. This is a private beta — ask Ville for a code.' });
    return;
  }
  if (input.length < 10) {
    res.status(400).json({ error: 'Give the daemon something definite: a claim, a mission, or a company URL.' });
    return;
  }

  const system = `You are the Definite Daemon: you turn claims about the future into decision trees.
Given a claim, a company mission, or a company URL, produce a branch analysis as STRICT JSON only (no markdown, no prose outside JSON):
{
 "claim": "the claim restated as one definite, checkable sentence",
 "branches": [ {"id":"A","name":"3-5 word name","desc":"one sentence: what this branch means","p":0.35}, ... ],
 "signposts": [ {"watch":"an observable real-world event that would discriminate between branches","discriminates":"which branches it separates","by":"YYYY-MM"}, ... ],
 "kill": "the single condition that would kill the claim's strongest branch, stated concretely",
 "caveat": "one honest sentence about the biggest uncertainty in this analysis"
}
Rules: 3-4 branches, MECE, probabilities sum to 1.0 (two decimals). 3-5 signposts, each genuinely observable and dated within 24 months where possible. Reason from physical/economic bottlenecks (supply chains, capex, regulation, unit economics) and known base rates (technology timelines slip ~2-3x; direction is more predictable than calendars). If given a company URL or mission, first infer the implicit claim the company is making about the future, then tree it. If the input is unfalsifiable as stated, say so in "claim" and give branches for the nearest falsifiable version. Never give investment advice or a company success probability; analyze the claim's world, not the firm's fate.`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1500,
        system,
        messages: [{ role: 'user', content: `Input: ${input}` }]
      })
    });
    const data = await r.json();
    if (!r.ok) {
      res.status(502).json({ error: data?.error?.message || 'Model call failed.' });
      return;
    }
    const text = (data.content || []).map(c => c.text || '').join('');
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) {
      res.status(502).json({ error: 'The daemon returned an unreadable tree. Try again.' });
      return;
    }
    let tree;
    try { tree = JSON.parse(text.slice(start, end + 1)); }
    catch { res.status(502).json({ error: 'The daemon returned an unreadable tree. Try again.' }); return; }
    res.status(200).json({ tree });
  } catch (e) {
    res.status(500).json({ error: 'Daemon error: ' + (e?.message || 'unknown') });
  }
}

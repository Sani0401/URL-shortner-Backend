import shortid from 'shortid';
import supabase from '../config/supabaseConfig.js';

async function convertLink(req, res) {
  try {
    console.log("This is the body :", req.body);
    const { originalUrl } = req.body;
  
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    // Check if the URL already exists
    const { data: existingUrlData, error: checkError } = await supabase
      .from('URLS')
      .select('shortURL')
      .eq('actualURL', originalUrl)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // Handle any error that is not a "no rows" error
      throw checkError;
    }

    if (existingUrlData) {
      // If the URL exists, return the existing short URL
      return res.json({ shortUrl: existingUrlData.shortURL });
    }

    // If the URL doesn't exist, create a new short URL
    const shortId = shortid.generate();
    console.log(shortId);
    const shortUrl = `https://url-shortner-backend-1-f5pi.onrender.com/${shortId}`;

    const { error: insertError } = await supabase
      .from('URLS')
      .insert({ id: shortId, actualURL: originalUrl, shortURL: shortUrl, count: 0 });

    if (insertError) {
      throw insertError;
    }

    // Respond with the created short URL
    res.json({ shortUrl });
  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default convertLink;

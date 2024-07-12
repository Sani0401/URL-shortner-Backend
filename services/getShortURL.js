import supabase from "../config/supabaseConfig.js";

export async function getShortURL(req, res) {
  try {
    const { shortId } = req.params;
    
    // Fetch the original URL and current click count from the database
    const { data, error } = await supabase
      .from("URLS")
      .select("actualURL, count")
      .eq("id", shortId)
      .single();

    if (error) {
      throw error;
    }

    if (data && data.actualURL) {
      // Increment the click count
      const newClickCount = data.count + 1;

      // Update the click count in the database
      const { updateError } = await supabase
        .from("URLS")
        .update({ count: newClickCount })
        .eq("id", shortId);

      if (updateError) {
        throw updateError;
      }

      // Redirect to the original URL
      res.redirect(data.actualURL);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error fetching original URL:", error);
    res.status(500).send("Internal server error");
  }
}

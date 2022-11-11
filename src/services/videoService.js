import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://xmfivcpyskzxfpmfwyji.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZml2Y3B5c2t6eGZwbWZ3eWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzA1ODksImV4cCI6MTk4Mzc0NjU4OX0.xl3IqC1H1xE7rVSEUruF4HxxzFmNHAwFrPcaW7_MRks";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService(){
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        }
    }
}
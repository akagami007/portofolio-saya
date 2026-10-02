import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Ensure this route is dynamic so Prisma page view increment works live on every visit.
// The external fetches inside will be cached by Next.js using `next: { revalidate: 3600 }`.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

    // 1. Fetch GitHub Stats
    let github = {
      commits: 1243, // Mock fallback
      repos: 34,
      stars: 128,
      topLanguage: "TypeScript",
    };

    if (GITHUB_USERNAME && GITHUB_TOKEN) {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
          next: { revalidate: 3600 }, // Cache for 1 hour
        });
        const userData = await userRes.json();
        
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
          headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
          next: { revalidate: 3600 },
        });
        const reposData = await reposRes.json();
        
        let totalStars = 0;
        const languageCounts: Record<string, number> = {};
        
        if (Array.isArray(reposData)) {
           reposData.forEach(repo => {
             totalStars += repo.stargazers_count;
             if (repo.language) {
               languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
             }
           });
        }

        const topLang = Object.keys(languageCounts).sort((a, b) => languageCounts[b] - languageCounts[a])[0];

        github = {
          commits: 1243, // Fallback (GitHub REST API doesn't easily expose total lifetime commits)
          repos: userData.public_repos || 34,
          stars: totalStars,
          topLanguage: topLang || "TypeScript",
        };
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
      }
    }

    // 2. Fetch WakaTime Stats
    let wakatime = {
      hoursThisWeek: 38.5,
      languages: [
        { name: "TypeScript", percent: 65 },
        { name: "Python", percent: 20 },
        { name: "Go", percent: 15 },
      ],
    };

    if (WAKATIME_API_KEY) {
      try {
        const authHeader = `Basic ${Buffer.from(WAKATIME_API_KEY).toString("base64")}`;
        const wakaRes = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
          headers: { Authorization: authHeader },
          next: { revalidate: 3600 },
        });
        
        const wakaData = await wakaRes.json();
        if (wakaData && wakaData.data) {
           const data = wakaData.data;
           wakatime = {
             hoursThisWeek: Math.round(data.total_seconds / 3600 * 10) / 10,
             languages: data.languages.slice(0, 3).map((l: any) => ({
               name: l.name,
               percent: Math.round(l.percent)
             }))
           };
        }
      } catch (err) {
        console.error("Failed to fetch WakaTime data:", err);
      }
    }

    // 3. Fetch Page Views from Prisma
    let pageViews = 1205; // Mock fallback
    if (process.env.DATABASE_URL) {
      try {
        const view = await prisma.pageView.upsert({
          where: { id: 1 },
          update: { count: { increment: 1 } },
          create: { id: 1, count: 1 }
        });
        pageViews = view.count;
      } catch (err) {
        console.error("Failed to update page views in Prisma:", err);
      }
    } else {
      // Simulate slight network delay if using mock data
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return NextResponse.json({
      github,
      wakatime,
      pageViews,
    });
  } catch (error) {
    console.error("Metrics API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}

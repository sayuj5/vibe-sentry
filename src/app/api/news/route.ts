import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

const FEEDS = [
  { name: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews' },
  { name: 'Dark Reading', url: 'https://www.darkreading.com/rss.xml' },
  { name: 'Schneier on Security', url: 'https://www.schneier.com/blog/feed/' },
  { name: 'Bleeping Computer', url: 'https://www.bleepingcomputer.com/feed/' }
];

export async function GET() {
  try {
    const feedPromises = FEEDS.map(async (feed) => {
      try {
        const response = await parser.parseURL(feed.url);
        return response.items.map(item => ({
          ...item,
          source: feed.name,
          sourceUrl: feed.url
        }));
      } catch (err) {
        console.error(`Error fetching feed ${feed.name}:`, err);
        return [];
      }
    });

    const results = await Promise.all(feedPromises);
    const allItems = results.flat().sort((a, b) => {
      const dateA = new Date(a.pubDate || a.isoDate || 0);
      const dateB = new Date(b.pubDate || b.isoDate || 0);
      return dateB.getTime() - dateA.getTime();
    });

    // Return top 20 news items
    return NextResponse.json(allItems.slice(0, 20));
  } catch (error) {
    console.error('News API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

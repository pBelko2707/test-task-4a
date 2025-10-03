import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 сек timeout

    const response = await fetch('https://t-core.fit-hub.pro/Test/GetTariffs', {
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching tariffs:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch tariffs' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

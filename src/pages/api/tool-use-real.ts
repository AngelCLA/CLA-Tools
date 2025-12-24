import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { tool_slug } = body;

    if (!tool_slug) {
      return new Response(JSON.stringify({ error: 'tool_slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    const { error } = await supabase
      .from('tool_usage')
      .insert({
        tool_slug: tool_slug,
        event_type: 'conversion',
        user_agent: userAgent,
        referrer: referrer
      });

    if (error) {
      console.error('Error inserting real tool usage:', error);
    }

    // Siempre retornamos success para no bloquear la UX
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing real usage:', error);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
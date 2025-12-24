// src/pages/api/tool-use-real.ts
import type { APIRoute } from 'astro';
import { supabase } from '@/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // 🔍 Debug logs para Vercel
  console.log('=== API ROUTE DEBUG ===');
  console.log('📍 Ruta: /api/tool-use-real');
  console.log('🌐 Request URL:', request.url);
  console.log('🔧 Method:', request.method);
  console.log('📦 Has Supabase URL:', !!import.meta.env.PUBLIC_SUPABASE_URL);
  console.log('🔑 Has Supabase Key:', !!import.meta.env.PUBLIC_SUPABASE_ANON_KEY);
  
  try {
    const body = await request.json();
    console.log('📥 Body recibido:', body);
    
    const { tool_slug } = body;

    if (!tool_slug) {
      console.error('❌ Falta tool_slug en el body');
      return new Response(JSON.stringify({ 
        error: 'tool_slug is required',
        debug: { receivedBody: body }
      }), {
        status: 400,
        headers
      });
    }

    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || 'unknown';

    console.log('💾 Intentando insertar:', { 
      tool_slug, 
      userAgent: userAgent.substring(0, 50),
      referrer 
    });

    const { data, error } = await supabase
      .from('tool_usage')
      .insert({
        tool_slug: tool_slug,
        event_type: 'conversion',
        user_agent: userAgent,
        referrer: referrer
      })
      .select();

    if (error) {
      console.error('❌ Error de Supabase:', error);
      return new Response(JSON.stringify({ 
        success: false,
        error: error.message,
        code: error.code,
        details: error.details
      }), {
        status: 500,
        headers
      });
    }

    console.log('✅ Conversión registrada exitosamente');
    console.log('📊 Data insertada:', data);

    return new Response(JSON.stringify({ 
      success: true,
      data,
      debug: {
        timestamp: new Date().toISOString(),
        tool_slug
      }
    }), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('💥 Error inesperado:', error);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers
    });
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
};
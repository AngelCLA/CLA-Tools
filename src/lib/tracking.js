import { supabase } from './supabase';

/**
 * Registra un click en una herramienta
 */
export async function trackToolClick(toolSlug) {
  try {
    console.log('👆 Click registrado:', toolSlug);
    
    await supabase
      .from('tool_usage')
      .insert({
        tool_slug: toolSlug,
        event_type: 'click',
        user_agent: navigator.userAgent,
        referrer: document.referrer || window.location.href,
        created_at: new Date().toISOString()
      });
    
    return true;
  } catch (err) {
    console.error('Error tracking click:', err);
    return false;
  }
}

/**
 * Registra una conversión exitosa
 */
export async function trackConversion(toolSlug) {
  try {
    console.log('🎉 Conversión registrada:', toolSlug);
    
    await supabase
      .from('tool_usage')
      .insert({
        tool_slug: toolSlug,
        event_type: 'conversion',
        user_agent: navigator.userAgent,
        referrer: document.referrer || window.location.href,
        created_at: new Date().toISOString()
      });
    
    return true;
  } catch (err) {
    console.error('Error tracking conversion:', err);
    return false;
  }
}
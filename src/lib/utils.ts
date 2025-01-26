import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
}

export async function parseXMLFile(file: File) {
  try {
    const text = await file.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    
    const comprobante = xmlDoc.getElementsByTagName('cfdi:Comprobante')[0];
    const emisor = xmlDoc.getElementsByTagName('cfdi:Emisor')[0];
    const receptor = xmlDoc.getElementsByTagName('cfdi:Receptor')[0];
    const timbre = xmlDoc.getElementsByTagName('tfd:TimbreFiscalDigital')[0];
    const traslados = xmlDoc.getElementsByTagName('cfdi:Traslado');
    
    if (!comprobante || !emisor || !receptor || !timbre) {
      throw new Error('Invalid XML structure');
    }

    // Explicitly handle the tipo value to ensure it matches the type
    const tipoValue = comprobante.getAttribute('TipoDeComprobante') === 'I' ? 'Ingreso' as const : 'Egreso' as const;
    
    // Calcular el impuesto total sumando todos los traslados
    let impuestoTotal = 0;
    for (let i = 0; i < traslados.length; i++) {
      const importe = traslados[i].getAttribute('Importe');
      if (importe) {
        impuestoTotal += parseFloat(importe);
      }
    }

    const total = parseFloat(comprobante.getAttribute('Total') || '0');
    const subtotal = parseFloat(comprobante.getAttribute('SubTotal') || '0');

    return {
      tipo: tipoValue,
      fecha: comprobante.getAttribute('Fecha') || '',
      total: total,
      subtotal: subtotal,
      impuesto: impuestoTotal || (total - subtotal), // Si no hay traslados, calculamos la diferencia
      emisor: emisor.getAttribute('Nombre') || '',
      receptor: receptor.getAttribute('Nombre') || '',
      moneda: comprobante.getAttribute('Moneda') || 'MXN',
      uuid: timbre.getAttribute('UUID') || ''
    };
  } catch (error) {
    console.error('Error parsing XML:', error);
    throw new Error('Failed to parse XML file');
  }
}
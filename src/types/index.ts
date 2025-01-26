export interface Invoice {
  tipo: 'Ingreso' | 'Egreso';
  fecha: string;
  total: number;
  subtotal: number;
  impuesto: number;
  emisor: string;
  receptor: string;
  moneda: string;
  uuid: string;
}
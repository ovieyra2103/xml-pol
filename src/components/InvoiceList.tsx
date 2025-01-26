import React from 'react';
import { FileText, Calendar, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Invoice } from '@/types';

interface InvoiceListProps {
  invoices: Invoice[];
}

export const InvoiceList = ({ invoices }: InvoiceListProps) => {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">
          No hay facturas para mostrar
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.uuid}
          className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900">{invoice.emisor}</p>
              <div className="flex items-center text-sm text-gray-600">
                <FileText className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-mono">{invoice.uuid}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>{new Date(invoice.fecha).toLocaleDateString('es-MX')}</span>
              </div>
            </div>
            <div className="space-y-2 text-right">
              <div className="flex items-center justify-end text-sm text-gray-600">
                <span>Subtotal: {formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex items-center justify-end text-sm text-gray-600">
                <span>IVA: {formatCurrency(invoice.impuesto)}</span>
              </div>
              <div className="flex items-center justify-end mt-2">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(invoice.total)}
                </span>
                <span className="ml-1 text-sm text-gray-600">{invoice.moneda}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
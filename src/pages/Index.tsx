import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DropZone } from '@/components/DropZone';
import { InvoiceList } from '@/components/InvoiceList';
import { DashboardChart } from '@/components/DashboardChart';
import { parseXMLFile, formatCurrency } from '@/lib/utils';
import { Invoice } from '@/types';
import { toast } from 'sonner';

const Index = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedType, setSelectedType] = useState<'Ingreso' | 'Egreso'>('Ingreso');

  const handleFilesAccepted = async (files: File[]) => {
    try {
      const parsedInvoices = await Promise.all(
        files.map(file => parseXMLFile(file))
      );
      setInvoices(parsedInvoices);
    } catch (error) {
      toast.error('Error al procesar los archivos');
      console.error('Error al procesar los archivos:', error);
    }
  };

  const filteredInvoices = invoices.filter(i => i.tipo === selectedType);
  const ingresos = invoices.filter(i => i.tipo === 'Ingreso');
  const egresos = invoices.filter(i => i.tipo === 'Egreso');
  
  const totalIngresos = ingresos.reduce((sum, i) => sum + i.total, 0);
  const totalEgresos = egresos.reduce((sum, i) => sum + i.total, 0);

  const summaryData = [
    { name: 'Ingresos', value: totalIngresos },
    { name: 'Egresos', value: totalEgresos }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Analizador de Facturas XML
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sube tus archivos XML para analizar tus facturas
        </p>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <RadioGroup
            defaultValue={selectedType}
            onValueChange={(value: 'Ingreso' | 'Egreso') => setSelectedType(value)}
            className="flex justify-center space-x-8 mb-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Ingreso" id="ingreso" className="text-success" />
              <Label htmlFor="ingreso" className="text-lg font-medium cursor-pointer hover:text-success">
                Ingresos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Egreso" id="egreso" className="text-error" />
              <Label htmlFor="egreso" className="text-lg font-medium cursor-pointer hover:text-error">
                Egresos
              </Label>
            </div>
          </RadioGroup>

          <DropZone onFilesAccepted={handleFilesAccepted} />
        </div>

        {invoices.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Tabs defaultValue="summary" className="space-y-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6">
                <TabsTrigger value="summary" className="text-sm md:text-base">Resumen</TabsTrigger>
                <TabsTrigger value="income" className="text-sm md:text-base">Ingresos</TabsTrigger>
                <TabsTrigger value="expenses" className="text-sm md:text-base">Egresos</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-600">Total Facturas</h3>
                    <p className="text-3xl font-bold mt-2">{invoices.length}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm border border-green-200">
                    <h3 className="text-sm font-medium text-gray-600">Total Ingresos</h3>
                    <p className="text-3xl font-bold text-success mt-2">
                      {formatCurrency(totalIngresos)}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl shadow-sm border border-red-200">
                    <h3 className="text-sm font-medium text-gray-600">Total Egresos</h3>
                    <p className="text-3xl font-bold text-error mt-2">
                      {formatCurrency(totalEgresos)}
                    </p>
                  </div>
                </div>
                <DashboardChart data={summaryData} title="Ingresos vs Egresos" />
              </TabsContent>

              <TabsContent value="income">
                <InvoiceList invoices={ingresos} />
              </TabsContent>

              <TabsContent value="expenses">
                <InvoiceList invoices={egresos} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
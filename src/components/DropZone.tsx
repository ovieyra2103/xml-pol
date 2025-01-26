import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface DropZoneProps {
  onFilesAccepted: (files: File[]) => void;
}

export const DropZone = ({ onFilesAccepted }: DropZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const xmlFiles = acceptedFiles.filter(
      file => file.type === 'text/xml' || file.name.endsWith('.xml')
    );
    
    if (xmlFiles.length === 0) {
      toast.error('Por favor, sube solo archivos XML');
      return;
    }
    
    onFilesAccepted(xmlFiles);
    toast.success(`${xmlFiles.length} archivos subidos correctamente`);
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/xml': ['.xml']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-12
        transition-all duration-200 ease-in-out
        ${isDragActive 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg text-gray-600 mb-2">
          {isDragActive
            ? 'Suelta tus archivos XML aquí...'
            : 'Arrastra y suelta tus archivos XML aquí'
          }
        </p>
        <p className="text-sm text-gray-500">
          o haz clic para seleccionar archivos
        </p>
      </div>
    </div>
  );
};
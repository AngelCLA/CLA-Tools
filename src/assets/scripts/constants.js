/**
 * Constantes de texto centralizadas
 * Este archivo asegura que todos los textos con caracteres especiales
 * estén en un solo lugar con encoding UTF-8 garantizado
 */

export const MESSAGES = {
  // Unidades
  PAGE_SINGLE: 'página',
  PAGE_PLURAL: 'páginas',
  FILE_SINGLE: 'archivo',
  FILE_PLURAL: 'archivos',
  
  // Estados
  LOADING: 'Cargando...',
  ERROR: 'Error',
  PROCESSING: 'Procesando',
  
  // Acciones
  FILES_SELECTED: (count) => `${count} ${count === 1 ? 'archivo seleccionado' : 'archivos seleccionados'}`,
  FILES_ADDED: (count) => `${count} ${count === 1 ? 'archivo agregado' : 'archivos agregados'}`,
  FILE_DELETED: (name) => `${name} eliminado`,
  ALL_DELETED: 'Todos los archivos eliminados',
  
  // Ordenamiento
  SORTED_NAME: 'Archivos ordenados por nombre',
  SORTED_DATE: 'Archivos ordenados por fecha',
  
  // Merge
  MERGING: 'Combinando PDFs...',
  MERGE_SUCCESS: (count) => `¡${count} PDFs combinados exitosamente!`,
  MERGE_ERROR: 'Error al combinar los PDFs. Intenta de nuevo.',
  NO_FILES: 'No hay archivos PDF para unir',
  
  // Validación
  INVALID_PDF: 'Por favor, selecciona archivos PDF válidos',
  
  // Modal de confirmación
  DELETE_ALL_TITLE: '¿Eliminar todos los archivos?',
  DELETE_ALL_MESSAGE: (count) => `Se eliminarán ${count} ${count > 1 ? 'archivos' : 'archivo'} de la lista. Esta acción no se puede deshacer.`,
  CANCEL: 'Cancelar',
  DELETE: 'Eliminar',
  
  // Conteo de páginas
  PAGE_COUNT: (count) => `${count} ${count === 1 ? 'página' : 'páginas'}`,
};

export const ICONS = {
  SPINNER: '<i class="fas fa-spinner fa-spin text-purple-600"></i>',
  PDF: '<i class="fas fa-file-pdf text-purple-600"></i>',
  TRASH: '<i class="fas fa-trash-alt"></i>',
  PLUS: '<i class="fas fa-plus"></i>',
  TIMES: '<i class="fas fa-times"></i>',
  MERGE: '<i class="fas fa-object-group"></i>',
};
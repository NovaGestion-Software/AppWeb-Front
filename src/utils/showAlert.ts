import Swal from 'sweetalert2';

type AlertParams = {
  title?: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText?: string;
  cancelButtonText?: string;
  showConfirmButton?: boolean; // Esta propiedad controlará la visibilidad del botón de confirmación
  showCancelButton?: boolean;
  timer?: number;
  willClose?: () => void;
};

export default function showAlert({
  title,
  text = '',
  icon,
  confirmButtonText,
  cancelButtonText,
  showConfirmButton = false,
  showCancelButton = false,
  timer = 0,
  willClose,
}: AlertParams) {
  return Swal.fire({
    title,
    text,
    icon,
    showConfirmButton,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    timer,
    timerProgressBar: true,
    willClose,
  });
}

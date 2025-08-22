import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extiende dayjs con soporte para UTC y zonas horarias.
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Configuración global de Day.js.
 *
 * - Habilita manejo de fechas en **UTC**.
 * - Soporta conversión automática entre **zonas horarias**.
 * - Establece como zona horaria por defecto: `America/Argentina/Buenos_Aires`.
 *
 * Esto asegura que, al formatear fechas, se muestren siempre en horario de Argentina,
 * independientemente de la zona horaria del cliente o del servidor.
 *
 * @example
 * ```ts
 * import dayjs from "@/lib/days";
 *
 * // Fecha actual en horario de Argentina
 * console.log(dayjs().format("YYYY-MM-DD HH:mm"));
 *
 * // Convertir desde UTC explícitamente
 * console.log(dayjs.utc("2025-03-10T21:34:23Z").tz().format("YYYY-MM-DD HH:mm"));
 * ```
 */
dayjs.tz.setDefault("America/Argentina/Buenos_Aires");

export default dayjs;

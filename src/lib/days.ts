import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Mostrá todo por defecto en horario de Argentina:
dayjs.tz.setDefault("America/Argentina/Buenos_Aires");

export default dayjs;

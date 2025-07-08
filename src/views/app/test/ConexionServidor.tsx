
import CloverConfigForm from "./CloverConfigForm";

export default function ConexionServidor() {
  // const [respuesta, setRespuesta] = useState("");
  // const [respuestaPago, setRespuestaPago] = useState("");

  // const probarConexion = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:4000/");
  //     setRespuesta(res.data);
  //   } catch (err) {
  //     setRespuesta("❌ Error al conectar con el servidor");
  //   }
  // };
  // const realizarPago = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:4000/pagar", {
  //       monto: 1000,
  //       referencia: "pago-" + Date.now(),
  //     });
  //     setRespuesta("✅ Pago iniciado: " + res.data.status);
  //   } catch (err) {
  //     setRespuesta("❌ Error al iniciar el pago");
  //   }
  // };

  // const consultarRespuesta = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:4000/pago/respuesta");
  //     setRespuestaPago("🧾 Resultado: " + JSON.stringify(res.data));
  //   } catch (err) {
  //     setRespuestaPago("⚠️ No hay respuesta todavía");
  //   }
  // };

  return (
      <CloverConfigForm />
  );
}

import { ActionButton, FlexibleInputField } from "@/frontend-resourses/components";
import { Card } from "@/frontend-resourses/components/Cards/CardBase";
import { useState } from "react";

export default function Ranking() {
  const [formData, setFormData] = useState({
    usuario: "wsfhogar",
    cuit: "",
    tipo: "S",
  });
  const [dataScore, setDataScore] = useState<any>();
  const [dataNombre, setDataNombre] = useState<any>();

  const handleSubmit = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjUxNTAsImlhdCI6MTc0OTA1MDY5MiwiZXhwIjoxNzQ5MDU3ODkyfQ.0WXmm225sA21PfhIIWXVr34ZUrt_fjRHAACYZansCuk";

      const response = await fetch("https://www.pypdatos.com.ar:469/lcomer/rest/serviciospyp/persona/json", {
        method: "POST",
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          json: "", // Campo requerido por la API
        }),
      });
      console.log("Respuesta de la API:", response);

      const data = await response.json();
      console.log("Respuesta de la API:", data.RESULTADO);
      if (data.RESULTADO && data.RESULTADO.Score) {
        setDataScore(data.RESULTADO.Score.row.score);
        setDataNombre(data.RESULTADO.Existencia_Fisica_Resu.row.ape_nom);
      } else {
        console.error("Estructura de datos inesperada:", data);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  console.log("data score", dataScore);
  return (
    <div className="flex items-center justify-center m-4">
      <Card className="flex flex-col justify-center space-y-4 p-4 w-full max-w-md">
        <h1 className="font-bold m-auto text-base">Ranking</h1>

        <form className="flex flex-col space-y-2">
          <FlexibleInputField label="Usuario" name="usuario" value={formData.usuario} onChange={(value) => setFormData((prev) => ({ ...prev, usuario: value }))} disabled />
          <FlexibleInputField label="N° Dni o Cuit" name="cuit" value={formData.cuit} onChange={(value) => setFormData((prev) => ({ ...prev, cuit: value }))} inputType="number" />
          <FlexibleInputField
            label="Tipo"
            name="tipo"
            value={formData.tipo}
            onChange={(value) => setFormData((prev) => ({ ...prev, tipo: value }))}
            inputType="select"
            options={[
              { value: "M", label: "Masculino" },
              { value: "F", label: "Femenino" },
            ]}
          />
          <div className="flex justify-end mt-4">
            <ActionButton onClick={handleSubmit} color="blue" size="xs" text="Consultar" />
          </div>{" "}
        </form>

        <div>
          {dataScore !== null && (
            <div className="flex flex-col space-y-1">
              <h2 className="text-xl">
                Score: <span className="text-2xl font-semibold">{dataScore}</span>
              </h2>
              <h3>
                Nombre: <span className="text-xl font-semibold">{dataNombre}</span>
              </h3>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginEmpresa } from "@/services/UserService";
import { Account } from "@/types";
import InputLabel from "@/Components/ui/Inputs/InputLabel";
import Cookies from "js-cookie";
import { verificarIntegracionMP } from "../Utils/verificarIntegracionMP";

export default function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const initialValues: Account = {
    empresa: "",
    usuario: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: initialValues,
    mode: "onChange",
  });

  useEffect(() => {
    // Coloca el foco en el input de empresa tan pronto como se renderiza
    const empresaInput = document.getElementById("empresa") as HTMLInputElement;
    if (empresaInput) {
      empresaInput.focus();
    }
  }, []);

  const inputs = [
    {
      id: "empresa",
      label: "Empresa",
      type: "number",
      placeholder: "N° de empresa",
      required: true,
    },
    {
      id: "usuario",
      label: "Usuario",
      type: "text",
      placeholder: "Nombre de Usuario",
      required: true,
    },
    {
      id: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "**********",
      required: true,
    },
  ];

  // Función para manejar el evento de presionar Enter y mover el foco al siguiente input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, nextInputId: string) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evitar el comportamiento predeterminado de enviar el formulario
      const nextInput = document.getElementById(nextInputId) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus(); // Coloca el foco en el siguiente input
      }
    }
  };

  const { mutate, status } = useMutation({
    mutationFn: loginEmpresa,
    onError: (error) => {
      console.log(error.message);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    },
    onSuccess: async (data) => {
      if (data.tusuario === 1) {
        // Para administradores, guardar tokens especiales en cookies
        Cookies.set("token_acceso_prod", data.token_acceso_prod, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("token_refresh_prod", data.token_refresh_prod, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("token_acceso_des", data.token_acceso_des, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("token_refresh_des", data.token_refresh_des, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        // Definir el ambiente actual por defecto
        const currentEnv = "production";
        localStorage.setItem("_ce", currentEnv);
        localStorage.setItem("modo", "homo");
        localStorage.setItem("_p", "prod");

        // Guardar los tokens actuales según el ambiente por defecto
        Cookies.set("token_acceso", data[`token_acceso_${currentEnv === "production" ? "prod" : "des"}`], { path: "/", secure: true, sameSite: "Strict" });
        Cookies.set("token_refresh", data[`token_refresh_${currentEnv === "production" ? "prod" : "des"}`], { path: "/", secure: true, sameSite: "Strict" });

        // Guardar nombres de base de datos en localStorage
        localStorage.setItem("_dbp", data.dbnameprod);
        localStorage.setItem("_dbd", data.dbnamedev);
        localStorage.setItem("_tu", data.tusuario);
      } else {
        // Para usuarios normales, guardar tokens regulares en cookies
        Cookies.set("token_acceso", data.token_acceso, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("token_refresh", data.token_refresh, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
      }

      const dataUser = {
        empresa: data.empresa,
        nfantasia: data.nfantasia,
        usuario: data.usuario,
        tusuario: data.tusuario,
        logoemp: data.logoemp,
        logonova: data.logonova,
      };
      await verificarIntegracionMP(data.empresa);
      localStorage.setItem("_u", JSON.stringify(dataUser));

      navigate("/home");
    },
  });

  const handleForm = (formData: Account) => {
    // console.log(formData);

    mutate(formData);
  };

  return (
    <>
      <form
        className="flex flex-col justify-center items-center h-[35rem] w-[25rem] py-6 px-2 border border-blue-500 bg-white rounded-2xl shadow-xl backdrop-blur-md space-y-6"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <div className="">
          <img src="/img/logos/novalogo-normal.png" alt="Nova Logo" width={150} height={150} />
        </div>
        <p className="text-sm font-medium">Ingresa tus credenciales debajo</p>

        {error && (
          <div className="absolute w-2/4 bg-red-600 border-2 border-red-700 text-gray-300 text-center text-[10px] mb-2" style={{ top: "195px", left: "50%", transform: "translateX(-50%)" }}>
            {error}
          </div>
        )}
        {inputs.map((input, index) => (
          <InputLabel
            key={input.id}
            id={input.id}
            label={input.label}
            type={input.type}
            placeholder={input.placeholder}
            register={register}
            required={input.required}
            onKeyDown={(event) => {
              if (index < inputs.length - 1) {
                handleKeyDown(event, inputs[index + 1].id);
              } else {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSubmit(handleForm)();
                }
              }
            }}
          />
        ))}

        <button
          id="submitButton"
          type="submit"
          className={`mt-6 tracking-wider transition-all block py-3 px-4 w-3/4 font-bold rounded focus:bg-blue-900
        ${
          status === "pending"
            ? "bg-gradient-to-r from-emerald-600 to-emerald-900"
            : isValid
            ? "text-white ring-0 bg-gradient-to-r from-blue-600 to-emerald-400 hover:from-emerald-700 hover:to-blue-500 cursor-pointer transform hover:-translate-y-1  hover:shadow-lg "
            : " ring-2 ring-gray-400 bg-gray-400 text-gray-700 cursor-default opacity-50"
        } 
        `}
          disabled={!isValid} // Deshabilitar el botón hasta que los campos sean válidos
        >
          {status === "pending" ? "Ingresando..." : status === "success" ? "Bienvenido!" : "Ingresar"}
        </button>
      </form>
    </>
  );
}

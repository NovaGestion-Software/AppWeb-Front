import { useForm } from 'react-hook-form';
import LoginForm from '../../Components/features/forms/LoginForm';
import { useMutation } from '@tanstack/react-query';
import { loginEmpresa } from '../../services/UserService';
import { Account } from '../../types';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Portal() {
  const navigate = useNavigate();

  const initialValues: Account = {
    empresa: '',
    usuario: '',
    password: '',
  };

  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  // console.log(errors);

  const { mutate } = useMutation({
    mutationFn: loginEmpresa,
    onError: (error) => {
      console.log(error.message);
    },
    onSuccess: (data) => {
      if (data.tusuario === 1) {
        // Para administradores, guardar tokens especiales en cookies
        Cookies.set('token_acceso_prod', data.token_acceso_prod, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
        Cookies.set('token_refresh_prod', data.token_refresh_prod, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
        Cookies.set('token_acceso_des', data.token_acceso_des, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
        Cookies.set('token_refresh_des', data.token_refresh_des, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });

        // Definir el ambiente actual por defecto
        const currentEnv = 'production';
        localStorage.setItem('currentEnv', currentEnv);

        // Guardar los tokens actuales según el ambiente por defecto
        Cookies.set(
          'token_acceso',
          data[`token_acceso_${currentEnv === 'production' ? 'prod' : 'des'}`],
          { path: '/', secure: true, sameSite: 'Strict' }
        );
        Cookies.set(
          'token_refresh',
          data[`token_refresh_${currentEnv === 'production' ? 'prod' : 'des'}`],
          { path: '/', secure: true, sameSite: 'Strict' }
        );

        // Guardar nombres de base de datos en localStorage
        localStorage.setItem('dbNameProd', data.dbnameprod);
        localStorage.setItem('dbNameDev', data.dbnamedev);
      } else {
        // Para usuarios normales, guardar tokens regulares en cookies
        Cookies.set('token_acceso', data.token_acceso, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
        Cookies.set('token_refresh', data.token_refresh, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
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

      localStorage.setItem('user', JSON.stringify(dataUser));

      navigate('/home');
    },
  });

  const handleForm = (formData: Account) => {
    // console.log(formData);

    mutate(formData);
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-300 to-blue-800">
      <form
        className="flex flex-col justify-center items-center h-[35rem] w-[25rem] py-6 px-2 border border-blue-500 bg-white rounded-2xl shadow-xl backdrop-blur-md space-y-6"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <div className="">
          <img src="/img/logos/novalogo-normal.png" alt="Nova Logo" width={150} height={150} />
        </div>
        <p className="text-sm font-medium">Ingresa tus credenciales debajo</p>

        <LoginForm register={register} />

        <input
          type="submit"
          className={`mt-6 tracking-wider transition-all block py-3 px-4 w-3/4 text-white font-bold rounded cursor-pointer hover:from-emerald-700 hover:to-blue-500 focus:bg-blue-900 transform hover:-translate-y-1 hover:shadow-lg 
            ${
              status === 'pending'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-900'
                : 'bg-gradient-to-r from-blue-600 to-emerald-400'
            }`}
          value={
            status === 'pending'
              ? 'Ingresando...'
              : status === 'success'
              ? 'Bienvenido!'
              : 'Ingresar'
          }
        />
      </form>
    </main>
  );
}

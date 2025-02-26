import { UseFormRegister } from 'react-hook-form';

type LoginFormProps = {
  register: UseFormRegister<{
    empresa: string;
    usuario: string;
    password: string;
  }>;
};

export default function LoginForm({ register }: LoginFormProps) {
  return (
    <>
      <div className="w-3/4">
        <label htmlFor="empresa" className="block text-sm font-semibold">
          Empresa
        </label>
        <input
          id="empresa"
          className="block w-full px-2 py-1 mt-1 text-gray-600 rounded bg-gray-50 border focus:border-transparent placeholder:text-sm"
          type="text"
          placeholder="52524598"
          {...register('empresa')}
        />
      </div>

      <div className="w-3/4">
        <label htmlFor="usuario" className="block font-semibold text-sm">
          Usuario
        </label>
        <input
          id="usuario"
          className="block w-full px-2 py-1 mt-1 text-gray-600 rounded bg-gray-50 border focus:border-transparent placeholder:text-sm"
          type="text"
          placeholder="usuario123"
          {...register('usuario')}
        />
      </div>
      <div className="w-3/4">
        <label htmlFor="password" className="block font-semibold text-sm">
          Contraseña
        </label>
        <input
          id="password"
          className="block w-full px-2 py-1 mt-1 text-gray-600 rounded bg-gray-50 border focus:border-transparent placeholder:text-sm"
          type="password"
          placeholder="**********"
          {...register('password')}
        />
      </div>
    </>
  );
}

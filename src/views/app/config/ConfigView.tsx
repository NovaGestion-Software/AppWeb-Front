import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function ConfigView() {
  // Obtener el entorno actual de localStorage o establecer 'prod' por defecto
  const [env, setEnv] = useState<string>('');
  const [config, setConfig] = useState({
    empresa: '',
    usuario: '',
    tusuario: '',
    iphost: '',
    db: '',
  });

  const currentEnv = localStorage.getItem('_ce') || '';
  const dbNameDev = localStorage.getItem('_dbd') || '';
  const dbNameProd = localStorage.getItem('_dbp') || '';
  const user = JSON.parse(localStorage.getItem('_u') || '{}');

  useEffect(() => {
    setEnv(currentEnv);

    setConfig({
      empresa: user.nfantasia || '',
      usuario: user.usuario || '',
      tusuario: user.tusuario || '',
      iphost: '46.202.146.93',
      db: currentEnv === 'production' ? dbNameProd : dbNameDev,
    });
  }, [currentEnv]);

  const handleSwitchChange = () => {
    const newEnv = env === 'production' ? 'development' : 'production';
    setEnv(newEnv);
    localStorage.setItem('_ce', newEnv);

    const dbNameProd = localStorage.getItem('_dbp') || 'default_prod_db';
    const dbNameDev = localStorage.getItem('_dbp') || 'default_dev_db';

    const tokenAcceso = Cookies.get(`token_acceso_${newEnv === 'production' ? 'prod' : 'des'}`);
    const tokenRefresh = Cookies.get(`token_refresh_${newEnv === 'production' ? 'prod' : 'des'}`);

    if (tokenAcceso && tokenRefresh) {
      Cookies.set('token_acceso', tokenAcceso, { path: '/', secure: true, sameSite: 'Strict' });
      Cookies.set('token_refresh', tokenRefresh, { path: '/', secure: true, sameSite: 'Strict' });
    }

    setConfig((prevConfig) => ({
      ...prevConfig,
      db: newEnv === 'production' ? dbNameProd : dbNameDev,
    }));
  };

  const configData = [
    { label: 'Empresa', value: config.empresa },
    { label: 'USUARIO', value: config.usuario },
    { label: 'TUSUARIO', value: config.tusuario },
    { label: 'IPHOST', value: config.iphost },
    { label: 'DB', value: config.db },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 ml-5 mt-4">Administración</h2>
      <div className="flex justify-between items-center max-w-5xl p-6 bg-white shadow-md rounded-lg ml-10 gap-10">
        {/* Título */}

        {/* Imagen Placeholder */}
        <div className="flex items-center justify-center h-60 w-60 bg-gray-200 rounded-lg mb-6">
          <span className="text-gray-600">Imagen Placeholder</span>
        </div>

        {/* Información de Configuración */}
        <div className="space-y-4">
          {configData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start w-60 gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100"
            >
              <label className="text-sm font-medium underline text-gray-700">{item.label}:</label>
              <p className="text-blue-800 font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Cambio de Entorno */}
        <div className="flex flex-col items-center justify-center mt-6 ">
          <span
            className={`text-lg font-semibold px-4 py-1  rounded-full mb-10 ${
              env === 'production' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            {env === 'production' ? 'Producción' : 'Desarrollo'}
          </span>
          <button
            onClick={handleSwitchChange}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            Cambiar Entorno
          </button>
        </div>
      </div>
    </>
  );
}

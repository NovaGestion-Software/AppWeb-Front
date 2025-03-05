import { useState } from 'react';
import TablaCaja from './components/features/TablaCaja';
import RefreshButton from '../../../Components/ui/Buttons/RefreshButton';
import CardComponent from './components/features/CardComponent';
import CajasList from './components/features/CajasList';

export default function CajasView() {
  const [handleRefetch, setHandleRefetch] = useState(false);

  return (
    <>
      <div className="overflow-hidden">
        <div className="flex items-center text-2xl font-bold px-6 py-2 gap-x-3">
          <h1>Movimientos de Cajas</h1>
          <RefreshButton setRefetch={setHandleRefetch} />
        </div>

        <div className="grid grid-cols-12 w-full p-4 gap-8">
          <div className="col-span-12 mx-4 ">
            <CardComponent handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
          </div>
          <div className="col-span-12  flex flex-row gap-8 justify-center ">
            <CajasList />
            <TablaCaja handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
          </div>
        </div>
      </div>
    </>
  );
}

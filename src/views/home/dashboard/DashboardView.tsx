import { useState } from 'react';
import RefreshButton from '../../../Components/ui/Buttons/RefreshButton';
import CardsDashboard from './components/features/CardsDashboard';
import GraficoVentas from './components/features/GraficoVentas';
import GraficoTortaFPago from './components/features/GraficoTortaFPago';

export default function DashboardView() {
  const [handleRefetch, setHandleRefetch] = useState(false);

  return (
    <>
      <div className="text-2xl font-bold px-6 py-2 flex flex-row items-center  gap-x-3">
        <h1>Dashboard</h1>
        <RefreshButton setRefetch={setHandleRefetch} />
      </div>

      <div className="grid grid-cols-12 gap-4 py-2 px-6">
        <div className="col-span-12">
          <div className="space-y-5">
            <CardsDashboard handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
            <GraficoVentas handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
            <div className="flex gap-4  pb-12 ">
              <GraficoTortaFPago />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import CardsComponent from './components/features/cards/CardsComponent';
import GraficoVentas from './components/features/graphic/GraficoVentas';
import GraficoTorta from './components/features/donut/GraficoTorta';
import ViewTitle from '@/Components/ui/Labels/ViewTitle';

export default function DashboardView() {
  const [handleRefetch, setHandleRefetch] = useState(false);

  return (
    <>
      <ViewTitle title={'Dashboard'} showRefreshButton={true} setHandleRefetch={setHandleRefetch} />

      <div className="grid grid-cols-12 gap-4 py-2 px-10">
        <div className="col-span-12 ">
          <div className="space-y-5">
            <CardsComponent handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
            <GraficoVentas handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
            <GraficoTorta handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
          </div>
        </div>
      </div>
    </>
  );
}

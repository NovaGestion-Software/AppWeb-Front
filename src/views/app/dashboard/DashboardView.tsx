import { useState } from 'react';
import CardsComponent from './components/features/cards/CardsComponent';
import GraficoVentas from './components/features/graphic/GraficoVentas';
import GraficoTorta from './components/features/donut/GraficoTorta';
import ViewTitle from '@/frontend-resourses/components/Labels/ViewTitle';

export default function DashboardView() {
  const [handleRefetch, setHandleRefetch] = useState(false);

  return (
    <>
      <ViewTitle
        title={'Dashboard'}
        showRefreshButton={true}
        setHandleRefetch={setHandleRefetch}
      />

      <div className="grid grid-cols-12 gap-4 py-2 pl-8 pr-4 mb-10 2xl:px-20">
        <div className="col-span-12 ">
          <div className="2xl:space-y-10">
            <CardsComponent handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
            <GraficoVentas handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
            <GraficoTorta handleRefetch={handleRefetch} setHandleRefetch={setHandleRefetch} />
          </div>
        </div>
      </div>
    </>
  );
}

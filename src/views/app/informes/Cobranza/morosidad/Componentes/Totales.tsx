import { Card } from '@/frontend-resourses/components/Cards/CardBase';
import React from 'react';

interface TotalItem {
  title: string;
  value: string | number;
  hasPercentage?: boolean;
  percentageValue?: string | number;
  className?: string;
}

interface TotalesVertProps {
  className?: string;
  items: TotalItem[];
}

const TotalesVert: React.FC<TotalesVertProps> = ({ className, items }) => {
  return (
    <Card className={`${className} flex flex-col gap-2 items-center justify-center pb-2 text-xs`}>
      {items.map((item, index) => (
        <div key={index} className="w-full">
          <span className={`font-semibold text-gray-900 px-1  text-[0.6rem] v1440:text-xs`}>
            {item.title}
          </span>
          <div 
            className={`w-full h-6 text-[0.5rem] v1440:h-7 v1440:text-xs flex items-center justify-end tabular-nums font-semibold rounded-md p-1     pb-0.5
             border-gray-300 border bg-gray-100 overflow-hidden shadow-md shadow-gray-300`}  >
            {item.value}
         
          </div>
          
          {item.hasPercentage && item.percentageValue && (
            <div className="mt-2 flex gap-2 items-center justify-end">
              <span className='font-bold text-[0.5rem] v1440:text-xs'>%</span>
              <div className="w-1/2 h-5 tabular-nums font-semibold border rounded-md p-1 text-[0.5rem] v1440:text-xs   shadow-md shadow-gray-300  pb-0.5 bg-gray-100 flex items-center justify-end ">
                {item.percentageValue}
              </div>
            </div>
          )}
        </div>
      ))}
    </Card>
  );
};

export default TotalesVert;
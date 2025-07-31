import { useEffect, Dispatch } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DashboardCard } from '@/types';
import { obtenerDashboardCards } from '@/services/AppService';
import CardWithBadge from './CardsWithBadge';
import SkCard from './SkCard';

type CardsComponentProps = {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
};

export default function CardsComponent({ handleRefetch, setHandleRefetch }: CardsComponentProps) {
  const {
    data: dataCards = [],
    refetch: refetchCards,
    isFetching: fetchingCards,
  } = useQuery<DashboardCard[]>({
    queryKey: ['dashboard-cards'],
    queryFn: obtenerDashboardCards,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  useEffect(() => {
    if (handleRefetch) {
      refetchCards();
      setHandleRefetch(false);
    }
  }, [handleRefetch]);

  const filteredCards = dataCards?.filter((card: any) => !card.titulo.includes('Ejemplo')) || [];
  console.log(dataCards, 'dataCards');

  return (
    <div>
      {fetchingCards ? (
        <div className="space-y-2 mb-5">
          {[...Array(2)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center w-full gap-5">
              {rowIndex === 0 ? (
                // Primera fila: 4 tarjetas
                [...Array(4)].map((_, cardIndex) => <SkCard key={cardIndex} />)
              ) : (
                // Segunda fila: solo tarjetas 2 y 3, las demás vacías
                <>
                  <div className="w-full h-full"></div>{' '}
                  {/* Espacio vacío para la primera tarjeta */}
                  <SkCard key={1} /> {/* Tarjeta 2 */}
                  <SkCard key={2} /> {/* Tarjeta 3 */}
                  <div className="w-full h-full"></div> {/* Espacio vacío para la cuarta tarjeta */}
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 mb-5">
          {filteredCards
            .reduce<(typeof filteredCards)[]>((rows, card, index) => {
              const rowIndex = Math.floor(index / 4);
              if (!rows[rowIndex]) rows[rowIndex] = [];
              rows[rowIndex].push(card);
              return rows;
            }, [])
            .map((row, rowIndex, allRows) => (
              <div
                key={rowIndex}
                className={`flex gap-4 w-full justify-center ${
                  row.length < 4 && rowIndex === allRows.length - 1
                    ? 'px-80' // Estilo personalizado para filas incompletas
                    : ''
                }`}
              >
                {row.map((card, cardIndex) => (
                  <CardWithBadge key={cardIndex} data={card} />
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

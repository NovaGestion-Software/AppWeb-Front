import { useEffect, useState, Dispatch } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerDashboardCards } from '../../../../../services/AppService';
import CardWithBadge from './CardsWithBadge';
import SkeletonCard from './SkeletonCard';

type CardsDashboardProps = {
  handleRefetch: boolean;
  setHandleRefetch: Dispatch<React.SetStateAction<boolean>>;
};

export default function CardsDashboard({ handleRefetch, setHandleRefetch }: CardsDashboardProps) {
  const {
    data: dataCards,
    isLoading: loadingCards,
    refetch: refetchCards,
    isFetching: fetchingCards,
  } = useQuery({
    queryKey: ['dashboard cards'],
    queryFn: obtenerDashboardCards,
    refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
  });

  if (handleRefetch) {
    refetchCards();
    setHandleRefetch(false);
  }

  useEffect(() => {
    if (handleRefetch) {
      // refetchCards();
      setHandleRefetch(false);
    }
  }, [handleRefetch]);

  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    if (dataCards) {
      // Filtrar las cartas que no contengan la palabra "ejemplo"
      const filtered = dataCards.filter((card: any) => !card.titulo.includes('Ejemplo'));
      setFilteredCards(filtered);
    }
  }, [dataCards]);

  return (
    <div>
      {loadingCards || fetchingCards ? (
        <div className="space-y-4 mb-5">
          {[...Array(2)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center w-full gap-4">
              {[...Array(4)].map((_, cardIndex) => (
                <SkeletonCard key={cardIndex} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 mb-5">
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

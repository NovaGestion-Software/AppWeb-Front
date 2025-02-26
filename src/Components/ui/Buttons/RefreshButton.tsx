import { Dispatch } from 'react';
import { LuRefreshCcw } from 'react-icons/lu';

type RefreshButtonProps = {
  setRefetch: Dispatch<React.SetStateAction<boolean>>;
};

export default function RefreshButton({ setRefetch }: RefreshButtonProps) {
  const handleRefetch = () => {
    setRefetch(true);
  };

  return (
    <LuRefreshCcw
      className="cursor-pointer active:rotate-[360deg] hover:scale-100 scale-90 transition-all duration-300 w-5"
      onClick={handleRefetch}
    />
  );
}

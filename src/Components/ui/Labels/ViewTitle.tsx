import { Dispatch } from 'react';
import RefreshButton from '../Buttons/RefreshButton';

interface ViewTitleProps {
  title: string;
  className?: string;
  showRefreshButton?: boolean;
  setHandleRefetch?: Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewTitle({
  title,
  className,
  showRefreshButton,
  setHandleRefetch,
}: ViewTitleProps) {
  return (
    <div
      className={`flex items-center h-8 2xl:h-10 w-full px-10 gap-2 bg-gradient-to-b from-slate-800 to-[#081A51] border-[#2973B2] shadow-lg 2xl:px-12 ${className}`}
    >
      <h1 className="text-lg text-white font-semibold tracking-wide font-roboto">{title}</h1>

      {showRefreshButton && setHandleRefetch && (
        <RefreshButton setHandleRefetch={setHandleRefetch} />
      )}
    </div>
  );
}

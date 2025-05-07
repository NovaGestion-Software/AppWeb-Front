import { Dispatch } from 'react';
import RefreshButton from '../../../frontend-resourses/components/Buttons/RefreshButton';

interface ViewTitleProps {
  type?: 'title' | 'subtitle';
  title: string;
  className?: string;
  showRefreshButton?: boolean;
  setHandleRefetch?: Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewTitle({
  type,
  title,
  className,
  showRefreshButton,
  setHandleRefetch,
}: ViewTitleProps) {
  const styles = {
    title: {
      bgColor: 'bg-gradient-to-b from-slate-800 to-[#081A51]',
      height: 'h-10 2xl:h-12',
      textSize: 'text-lg 2xl:text-2xl font-bold',
    },
    subtitle: {
      bgColor: 'bg-[#1F5A8D]',
      height: 'h-8 2xl:h-10',
      textSize: 'text-base 2xl:text-lg font-semibold',
    },
  };

  const { bgColor, height, textSize } = styles[type || 'title'];

  return (
    <div
      className={`flex items-center ${height}
       w-full px-10 gap-2 ${bgColor} 
       border-[#2973B2] shadow-lg 2xl:px-12 ${className}`}
    >
      <h1 className={`${textSize} text-white tracking-wide font-roboto`}>{title}</h1>

      {showRefreshButton && setHandleRefetch && (
        <RefreshButton setHandleRefetch={setHandleRefetch} />
      )}
    </div>
  );
}

import { SkCardList } from './SkCardList';

export default function SkListComponent() {
  return (
    <div className="flex flex-col h-full p-10 gap-9 bg-white  shadow-md rounded-md ">
      <SkCardList />
      <SkCardList />
      <SkCardList />
      <SkCardList />
    </div>
  );
}

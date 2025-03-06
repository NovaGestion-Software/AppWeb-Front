interface ViewTitleProps {
  title: string;
}

export default function ViewTitle({ title }: ViewTitleProps) {
  return (
    <div className="relative flex h-10 w-screen right-1 py-2 px-3 text-xl text-white font-medium tracking-wide bg-[#3866a8]">
      <h1 className="relative left-4">{title}</h1>
    </div>
  );
}

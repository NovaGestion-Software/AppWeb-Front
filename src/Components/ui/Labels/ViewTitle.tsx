interface ViewTitleProps {
  title: string;
}

export default function ViewTitle({ title }: ViewTitleProps) {
  return (
    <div className="flex items-center justify-start h-14 2xl:h-16 w-screen relative right-1 py-3 px-3 text-xl text-white font-medium tracking-wide bg-[#3866a8] border-b-8 border-[#2973B2]">
    <h1 className="relative left-4 font-roboto font-bold">{title}</h1>
  </div>
  );
}

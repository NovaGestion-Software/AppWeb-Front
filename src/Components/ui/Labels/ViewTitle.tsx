interface ViewTitleProps {
  title: string;
}

export default function ViewTitle({ title }: ViewTitleProps) {
  return (
    <div className="flex h-14 w-screen relative right-1 py-3 px-3 text-xl text-white font-medium tracking-wide bg-[#2973B2] border-b-8 border-[#3866a8]">
    <h1 className="relative left-4">{title}</h1>
  </div>
  );
}

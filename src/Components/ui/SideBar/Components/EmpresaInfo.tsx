interface EmpresaInfoProps {
  user: any;
  open: boolean;
}

export default function EmpresaInfo({ user, open }: EmpresaInfoProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="relative flex flex-col justify-center items-center gap-1 w-16 h-28">
        <div className={`flex justify-center items-center p-2 w-14 h-14 rounded-full bg-white transition-all duration-500 ${open ? "translate-y-1" : "translate-y-5"}`}>
          <img width={200} height={200} alt="logoempresa" src={`data:image/jpeg;base64,${user.logoemp}`} className="transition-all duration-500" />
        </div>
        <span className={`h-8 text-sm text-white font-semibold origin-left transition-all translate-y-2 2xl:text-xl ${open ? "opacity-100 duration-500" : "opacity-0 duration-100"} overflow-hidden whitespace-nowrap`}>
          {user.nfantasia}
        </span>
      </div>
    </div>
  );
}

import { ActionButton } from "@/frontend-resourses/components";
import { BotoneraConfig } from "@/types/ButtonConfig";



export function Botonera({ config, className = "" }: { config: BotoneraConfig[]; className?: string }) {
  return (
    <div className={`${className} flex flex-row gap-3`}>
      {config.map((btn, idx) =>
        btn.type === "custom" ? (
          <div key={idx}>{btn.button}</div>
        ) : (
          <ActionButton
            key={idx}
            text={btn.text}
            icon={btn.icon}
            color={btn.color}
            disabled={btn.disabled}
            onClick={btn.onClick}
            addClassName={btn.addClassName}
            
          />
        )
      )}
    </div>
  );
}

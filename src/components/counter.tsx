import { useCallback } from "react";
import { Minus, Plus } from "@phosphor-icons/react";

interface CouterProps {
  title: string;
  subtitle?: string;
  value: number;
  onChange: (value: number) => void;
}
const Counter: React.FC<CouterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const add = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const reduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="text-md font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] text-muted-foreground transition hover:opacity-80"
          onClick={reduce}
        >
          <Minus className="w-4" />
        </div>
        <div className="text-xl text-secondary-foreground">{value}</div>
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] text-muted-foreground transition hover:opacity-80"
          onClick={add}
        >
          <Plus className="w-4" />
        </div>
      </div>
    </div>
  );
};

export default Counter;

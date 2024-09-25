import { TooltipWrapper } from './tooltip';

export function BadgeRequired() {
  return (
    <TooltipWrapper description="Campo Obrigatório">
      <span className="text-red-500">*</span>
    </TooltipWrapper>
  );
}

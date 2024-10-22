"use client";
import { usePathname } from "next/navigation";
import { Button } from "../../../g-hair-front/src/components/ui/button";
import { Icon } from "@/lib/icons";
import Link from "next/link";
import { ChangeTheme } from "./change-theme";

export function Sidebar() {
  const pathname = usePathname();
  const classNameOptionsMenu = "mr-2 w-4 h-4";

  const variantValidation = (value: string) =>
    pathname == value ? "secondary" : "ghost";

  const optionsServices = [
    {
      variant: variantValidation("/scheduling"),
      path: "/scheduling",
      icons: <Icon.calendar className={classNameOptionsMenu} />,
      describe: "Agendamentos",
    },
    {
      variant: variantValidation("/customers"),
      path: "/customers",
      icons: <Icon.user className={classNameOptionsMenu} />,
      describe: "Clientes",
    },
    {
      variant: variantValidation("/services"),
      path: "/services",
      icons: <Icon.file className={classNameOptionsMenu} />,
      describe: "Serviços",
    },
  ];

  const optionsFinance = [
    {
      variant: variantValidation("/bills"),
      path: "/bills",
      icons: <Icon.receiveCoins className={classNameOptionsMenu} />,
      describe: "Contas",
    },
    {
      variant: variantValidation("/commission"),
      path: "/commission",
      icons: <Icon.handShake className={classNameOptionsMenu} />,
      describe: "Comissões",
    },

    {
      variant: variantValidation("/box"),
      path: "/box",
      icons: <Icon.pigBank className={classNameOptionsMenu} />,
      describe: "Controle de caixa",
    },
  ];

  const optionsStocks = [
    {
      variant: variantValidation("/stock"),
      path: "/stock",
      icons: <Icon.box className={classNameOptionsMenu} />,
      describe: "Controle de estoque",
    },
    {
      variant: variantValidation("/audit"),
      path: "/audit",
      icons: <Icon.fileBox className={classNameOptionsMenu} />,
      describe: "Auditoria de estoque",
    },
    {
      variant: variantValidation("/buy-nf"),
      path: "/buy-nf",
      icons: <Icon.openPackage className={classNameOptionsMenu} />,
      describe: "Compras e entrada de NF",
    },
    {
      variant: variantValidation("/multi-stock"),
      path: "/multi-stock",
      icons: <Icon.package className={classNameOptionsMenu} />,
      describe: "Controle de Multi-estoque",
    },
    {
      variant: variantValidation("/table"),
      path: "/table",
      icons: <Icon.sheet className={classNameOptionsMenu} />,
      describe: "Tabela de preços",
    },
  ];
  const optionsConfig = [
    {
      variant: variantValidation("/suppliers"),
      path: "/suppliers",
      icons: <Icon.contact className={classNameOptionsMenu} />,
      describe: "Fornecedores",
    },
    {
      variant: variantValidation("/brands"),
      path: "/brands",
      icons: <Icon.pencilRuler className={classNameOptionsMenu} />,
      describe: "Marca",
    },
    {
      variant: variantValidation("/bath-grooming"),
      path: "/bath-grooming",
      icons: <Icon.shower className={classNameOptionsMenu} />,
      describe: "Banho e tosa",
    },
    {
      variant: variantValidation("/transport"),
      path: "/transport",
      icons: <Icon.truck className={classNameOptionsMenu} />,
      describe: "Transporte",
    },
    {
      variant: variantValidation("/report"),
      path: "/report",
      icons: <Icon.report className={classNameOptionsMenu} />,
      describe: "Relatórios",
    },
    {
      variant: variantValidation("/config"),
      path: "/config",
      icons: <Icon.config className={classNameOptionsMenu} />,
      describe: "Configurações",
    },
  ];

  return (
    <div className="w-[280px] border-r h-screen">
      <div className="space-y-4 py-4">
        {/* Atendimentos */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Atendimento
          </h2>
          <div className="space-y-1">
            {optionsServices.map((items, index) => (
              <Link key={index} legacyBehavior href={items.path}>
                <Button
                  //@ts-ignore
                  variant={items.variant}
                  className="w-full justify-start"
                >
                  {items.icons}
                  {items.describe}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        {/* Financeiro */}
        <div className="px-3 py-2  opacity-15">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Financeiro
          </h2>
          <div className="space-y-1">
            {optionsFinance.map((items, index) => (
              <Link key={index} legacyBehavior href={items.path}>
                <Button
                  disabled
                  //@ts-ignore
                  variant={items.variant}
                  className="w-full justify-start"
                >
                  {items.icons}
                  {items.describe}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        {/* Estoque */}
        <div className="px-3 py-2 opacity-15">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Estoque
          </h2>
          <div className="space-y-1">
            {optionsStocks.map((items, index) => (
              <Link key={index} legacyBehavior href={items.path}>
                <Button
                  disabled
                  //@ts-ignore
                  variant={items.variant}
                  className="w-full justify-start"
                >
                  {items.icons}
                  {items.describe}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        {/* Configurações */}
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Administração{" "}
          </h2>
          <div className="space-y-1">
            {optionsConfig.map((items, index) => (
              <Link key={index} legacyBehavior href={items.path}>
                <Button
                  //@ts-ignore
                  variant={items.variant}
                  className="w-full justify-start"
                >
                  {items.icons}
                  {items.describe}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        {/* <ChangeTheme /> */}
        {/* Config */}
        {/* <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Estoque
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Icon.box className={classNameOptionsMenu} />
              Controle de estoque
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon.fileBox className={classNameOptionsMenu} />
              Auditoria de estoque
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon.openPackage className={classNameOptionsMenu} />
              Compras e entrada de NF
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon.package className={classNameOptionsMenu} />
              Controle de Multi-estoque
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon.sheet className={classNameOptionsMenu} />
              Tabela de preços
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

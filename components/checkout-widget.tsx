"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Wallet, Loader2 } from "lucide-react"
import { VeloxLogo } from "./velox-logo"

type WalletType = "freighter" | "ledger" | null
type CurrencyType = "USDC" | "XLM"

export function CheckoutWidget() {
  const [selectedWallet, setSelectedWallet] = useState<WalletType>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [recurringEnabled, setRecurringEnabled] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>("USDC")

  const handlePayment = async () => {
    if (!selectedWallet) return

    setIsProcessing(true)
    console.log("[v0] Iniciando pago con billetera:", selectedWallet)
    console.log("[v0] Pagos recurrentes:", recurringEnabled)
    console.log("[v0] Moneda seleccionada:", selectedCurrency)

    // Simulate wallet connection and payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Pago completado exitosamente")
    setIsProcessing(false)
    setIsComplete(true)
  }

  const handleWalletSelect = (walletId: WalletType) => {
    console.log("[v0] Billetera seleccionada:", walletId)
    setSelectedWallet(walletId)
  }

  const handleCurrencySelect = (currency: CurrencyType) => {
    console.log("[v0] Moneda seleccionada:", currency)
    setSelectedCurrency(currency)
  }

  const getPrice = () => {
    if (selectedCurrency === "USDC") return "29.99"
    // XLM conversión aproximada (1 USDC ≈ 9 XLM)
    return "269.91"
  }

  const wallets = [
    { id: "freighter" as const, name: "Freighter", icon: "🚀" },
    { id: "ledger" as const, name: "Ledger", icon: "🔐" },
  ]

  const handleReset = () => {
    console.log("[v0] Reiniciando widget de pago")
    setIsComplete(false)
    setIsProcessing(false)
    setSelectedWallet(null)
    setRecurringEnabled(false)
    setSelectedCurrency("USDC")
  }

  return (
    <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VeloxLogo className="h-8 w-8" />
            <CardTitle className="text-xl">VELOX</CardTitle>
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary">
            Red Stellar
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">
          Pago seguro con USDC o XLM en blockchain Stellar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isComplete ? (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Pagar con</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCurrencySelect("USDC")}
                    className={`flex items-center justify-center gap-2 rounded-lg border p-3 transition-all ${
                      selectedCurrency === "USDC"
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-card hover:border-primary/50"
                    }`}
                  >
                    <span className="font-semibold text-foreground">USDC</span>
                    {selectedCurrency === "USDC" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </button>
                  <button
                    onClick={() => handleCurrencySelect("XLM")}
                    className={`flex items-center justify-center gap-2 rounded-lg border p-3 transition-all ${
                      selectedCurrency === "XLM"
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-card hover:border-primary/50"
                    }`}
                  >
                    <span className="font-semibold text-foreground">XLM</span>
                    {selectedCurrency === "XLM" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Monto</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">{getPrice()}</span>
                    <span className="text-lg text-primary">{selectedCurrency}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Suscripción Premium - Mensual</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Wallet className="h-4 w-4 text-primary" />
                  Seleccionar Billetera
                </label>
                <div className="grid gap-2">
                  {wallets.map((wallet) => (
                    <button
                      key={wallet.id}
                      onClick={() => handleWalletSelect(wallet.id)}
                      className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                        selectedWallet === wallet.id
                          ? "border-primary bg-primary/10"
                          : "border-border/50 bg-card hover:border-primary/50"
                      }`}
                    >
                      <span className="text-2xl">{wallet.icon}</span>
                      <span className="font-medium text-foreground">{wallet.name}</span>
                      {selectedWallet === wallet.id && <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-border/30 bg-secondary/20 p-3">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={recurringEnabled}
                  onChange={(e) => {
                    setRecurringEnabled(e.target.checked)
                    console.log("[v0] Pagos recurrentes:", e.target.checked)
                  }}
                  className="h-4 w-4 rounded border-border accent-primary"
                />
                <label htmlFor="recurring" className="text-sm text-muted-foreground cursor-pointer">
                  Habilitar pagos recurrentes (renovación automática)
                </label>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={!selectedWallet || isProcessing}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  Pagar {getPrice()} {selectedCurrency}
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="space-y-4 py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">¡Pago Exitoso!</h3>
              <p className="mt-2 text-sm text-muted-foreground">Tu transacción ha sido confirmada en la red Stellar</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-secondary/20 p-3">
              <p className="text-xs text-muted-foreground">ID de Transacción</p>
              <p className="mt-1 font-mono text-sm text-foreground">0x742d...8f4a</p>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full border-border/50 bg-transparent">
              Hacer Otro Pago
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Wallet, Loader2, AlertCircle } from "lucide-react"
import { VeloxLogo } from "./velox-logo"

type WalletType = "freighter" | "ledger" | null
type CurrencyType = "USDC" | "XLM"

export function CheckoutWidget() {
  const [selectedWallet, setSelectedWallet] = useState<WalletType>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [recurringEnabled, setRecurringEnabled] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>("USDC")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [error, setError] = useState("")

  const handlePayment = async () => {
    if (!selectedWallet || !name.trim() || !email.trim()) return

    setIsProcessing(true)
    setError("")

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          paymentMethod: selectedWallet,
          currency: selectedCurrency,
          amount: getPrice(),
          recurring: recurringEnabled,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Error al procesar el pago")
      }

      setTransactionId(data.transactionId)
      setIsComplete(true)
    } catch (err) {
      console.error("[v0] Payment failed:", err)
      setError(err instanceof Error ? err.message : "Error al procesar el pago")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleWalletSelect = (walletId: WalletType) => {
    setSelectedWallet(walletId)
  }

  const handleCurrencySelect = (currency: CurrencyType) => {
    setSelectedCurrency(currency)
  }

  const getPrice = () => {
    if (selectedCurrency === "USDC") return "29.99"
    return "269.91"
  }

  const wallets = [
    { id: "freighter" as const, name: "Freighter", icon: "🚀", type: "crypto" },
    { id: "ledger" as const, name: "Ledger", icon: "🔐", type: "crypto" },
  ]

  const handleReset = () => {
    setIsComplete(false)
    setIsProcessing(false)
    setSelectedWallet(null)
    setRecurringEnabled(false)
    setSelectedCurrency("USDC")
    setName("")
    setEmail("")
    setTransactionId("")
    setError("")
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
              <div className="space-y-3">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nombre completo
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-card border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Correo electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-card border-border/50"
                  />
                </div>
              </div>

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
                    <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#2775CA" />
                      <path
                        d="M20.5 16C20.5 13.79 19.21 12.5 17 12.5H14.5V19.5H17C19.21 19.5 20.5 18.21 20.5 16ZM17 10.5C20.31 10.5 22.5 12.69 22.5 16C22.5 19.31 20.31 21.5 17 21.5H14.5V24H12.5V8H17C17 8 17 10.5 17 10.5Z"
                        fill="white"
                      />
                      <path
                        d="M17.5 13.5C18.88 13.5 19.5 14.12 19.5 15.5V16.5C19.5 17.88 18.88 18.5 17.5 18.5H15.5V13.5H17.5Z"
                        fill="white"
                      />
                    </svg>
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
                    <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#000000" />
                      <path
                        d="M8 24L13.5 16L8 8H11L16.5 16L11 24H8ZM16.5 16L22 8H25L19.5 16L25 24H22L16.5 16Z"
                        fill="white"
                      />
                    </svg>
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
                  Selecciona tu billetera
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
                  onChange={(e) => setRecurringEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-primary"
                />
                <label htmlFor="recurring" className="text-sm text-muted-foreground cursor-pointer">
                  Habilitar pagos recurrentes (renovación automática)
                </label>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              onClick={handlePayment}
              disabled={!selectedWallet || isProcessing || !name.trim() || !email.trim()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Procesando pago...
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
              <p className="mt-2 text-sm text-muted-foreground">Tu transacción ha sido confirmada</p>
            </div>
            <div className="rounded-lg border border-border/50 bg-secondary/20 p-3">
              <p className="text-xs text-muted-foreground">ID de Transacción</p>
              <p className="mt-1 font-mono text-xs break-all text-foreground">{transactionId}</p>
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

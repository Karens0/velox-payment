"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, Info } from "lucide-react"

export function YieldInvestment() {
  const [investAmount, setInvestAmount] = useState(1000)
  const [percentage, setPercentage] = useState(50)

  const totalBalance = 12458.32
  const currentlyInvested = 8420.0
  const apy = 8.45
  const estimatedEarnings = (investAmount * apy) / 100

  const handleInvest = () => {
    if (investAmount <= 0) {
      alert("Por favor ingresa un monto válido")
      return
    }
    if (investAmount > totalBalance - currentlyInvested) {
      alert("No tienes suficiente balance disponible")
      return
    }

    console.log("[v0] Invirtiendo", investAmount, "USDC en DeFindex")
    console.log("[v0] Ganancias anuales estimadas:", estimatedEarnings.toFixed(2), "USDC")
    alert(
      `¡Inversión exitosa! Has invertido ${investAmount.toFixed(2)} USDC en DeFindex.\n\nGanancias anuales estimadas: ${estimatedEarnings.toFixed(2)} USDC`,
    )
  }

  const handleWithdraw = () => {
    console.log("[v0] Retirando fondos de DeFindex")
    alert("Retirando fondos de DeFindex - Tus fondos estarán disponibles en tu billetera en 24-48 horas")
  }

  const handleSliderChange = (value: number[]) => {
    const newPercentage = value[0]
    const availableBalance = totalBalance - currentlyInvested
    const newAmount = (availableBalance * newPercentage) / 100

    console.log("[v0] Slider actualizado:", newPercentage + "%", "=", newAmount.toFixed(2), "USDC")
    setPercentage(newPercentage)
    setInvestAmount(newAmount)
  }

  const handleAmountChange = (value: string) => {
    const numValue = Number(value)
    if (isNaN(numValue)) return

    const availableBalance = totalBalance - currentlyInvested
    const clampedValue = Math.min(Math.max(0, numValue), availableBalance)
    const newPercentage = (clampedValue / availableBalance) * 100

    console.log("[v0] Monto actualizado:", clampedValue.toFixed(2), "USDC")
    setInvestAmount(clampedValue)
    setPercentage(newPercentage)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-chart-1" />
            Invertir en DeFindex
          </CardTitle>
          <CardDescription>Genera ingresos pasivos con tu balance de USDC</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Monto de Inversión (USDC)</Label>
            <Input
              id="amount"
              type="number"
              value={investAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              max={totalBalance - currentlyInvested}
              min={0}
              className="border-border/50 bg-input text-lg font-semibold"
            />
            <p className="text-xs text-muted-foreground">
              Disponible: {(totalBalance - currentlyInvested).toFixed(2)} USDC
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Porcentaje del Balance Disponible</Label>
              <span className="text-sm font-semibold text-primary">{percentage.toFixed(0)}%</span>
            </div>
            <Slider value={[percentage]} onValueChange={handleSliderChange} max={100} step={1} className="w-full" />
          </div>

          <div className="space-y-3 rounded-lg border border-border/50 bg-secondary/20 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">TAE Actual</span>
              <span className="text-lg font-bold text-chart-1">{apy}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Est. Ganancias Anuales</span>
              <span className="text-lg font-bold text-success">+{estimatedEarnings.toFixed(2)} USDC</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Est. Ganancias Mensuales</span>
              <span className="text-lg font-bold text-foreground">+{(estimatedEarnings / 12).toFixed(2)} USDC</span>
            </div>
          </div>

          <Button
            onClick={handleInvest}
            disabled={investAmount <= 0 || investAmount > totalBalance - currentlyInvested}
            className="w-full bg-chart-1 text-white hover:bg-chart-1/90 disabled:opacity-50"
            size="lg"
          >
            Invertir {investAmount.toFixed(2)} USDC
          </Button>

          <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
            <Info className="h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs text-muted-foreground">
              Tus fondos se depositan en el protocolo DeFindex. Puedes retirar en cualquier momento. La TAE puede variar
              según las condiciones del mercado.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Resumen de Inversión</CardTitle>
          <CardDescription>Estado actual del portafolio de rendimiento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Actualmente Invertido</span>
                <span className="font-semibold text-foreground">{currentlyInvested.toFixed(2)} USDC</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-gradient-to-r from-chart-1 to-chart-2"
                  style={{ width: `${(currentlyInvested / totalBalance) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Balance Disponible</span>
                <span className="font-semibold text-foreground">
                  {(totalBalance - currentlyInvested).toFixed(2)} USDC
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/60"
                  style={{ width: `${((totalBalance - currentlyInvested) / totalBalance) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Proyección de Ganancias</h4>
            {[
              { period: "Diario", amount: ((currentlyInvested * apy) / 100 / 365).toFixed(2) },
              { period: "Semanal", amount: ((currentlyInvested * apy) / 100 / 52).toFixed(2) },
              { period: "Mensual", amount: ((currentlyInvested * apy) / 100 / 12).toFixed(2) },
              { period: "Anual", amount: ((currentlyInvested * apy) / 100).toFixed(2) },
            ].map((item) => (
              <div
                key={item.period}
                className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/20 p-3"
              >
                <span className="text-sm text-muted-foreground">{item.period}</span>
                <span className="font-semibold text-success">+{item.amount} USDC</span>
              </div>
            ))}
          </div>

          <Button
            onClick={handleWithdraw}
            variant="outline"
            className="w-full border-border/50 bg-transparent"
            size="lg"
          >
            Retirar de DeFindex
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

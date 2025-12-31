"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Wallet, DollarSign, PieChart, Bell } from "lucide-react"
import { VeloxLogo } from "./velox-logo"
import { TransactionHistory } from "./transaction-history"
import { YieldInvestment } from "./yield-investment"
import { BalanceChart } from "./balance-chart"
import { CheckoutWidget } from "./checkout-widget"

export function DashboardView() {
  const [view, setView] = useState<"dashboard" | "checkout">("dashboard")
  const [showNotifications, setShowNotifications] = useState(false)

  const handleWithdraw = () => {
    console.log("[v0] Iniciando retiro de USDC")
    alert("Función de retiro activada - Conecta tu billetera para continuar")
  }

  const handleInvest = () => {
    console.log("[v0] Navegando a inversión DeFindex")
    // Cambiar a la pestaña de inversión
    const investTab = document.querySelector('[value="yield"]') as HTMLElement
    investTab?.click()
  }

  const handleConnectWallet = () => {
    console.log("[v0] Conectando billetera")
    alert("Conectando billetera Stellar - Selecciona tu proveedor preferido")
  }

  const handleNotifications = () => {
    setShowNotifications(!showNotifications)
    console.log("[v0] Toggle de notificaciones:", !showNotifications)
  }

  if (view === "checkout") {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setView("dashboard")}>
              ← Volver al Panel
            </Button>
          </div>
          <div className="flex items-center justify-center py-12">
            <CheckoutWidget />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <VeloxLogo className="h-10 w-10" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">VELOX</h1>
              <p className="text-sm text-muted-foreground">Panel de Pasarela de Pagos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-border/50 bg-transparent"
              onClick={handleNotifications}
            >
              <Bell className="mr-2 h-4 w-4" />
              Alertas
              {showNotifications && <span className="ml-2 flex h-2 w-2 rounded-full bg-primary" />}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setView("checkout")}>
              Ver Widget de Pago
            </Button>
            <Badge variant="outline" className="border-success/30 bg-success/10 text-success">
              <div className="mr-2 h-2 w-2 rounded-full bg-success" />
              Conectado
            </Badge>
          </div>
        </header>

        {/* Balance Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Balance Total</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">12,458.32</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">+12.5%</span> desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Invertido en Rendimiento</CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-1" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">8,420.00</div>
              <p className="text-xs text-muted-foreground">67.6% del balance total</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">TAE Estimada</CardTitle>
              <PieChart className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">8.45%</div>
              <p className="text-xs text-muted-foreground">~$711.89 ganancias anuales</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
            <TabsTrigger value="yield">Inversión de Rendimiento</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <BalanceChart />

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                  <CardDescription>Gestiona tus fondos eficientemente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleWithdraw}
                    className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    <ArrowDownLeft className="mr-2 h-5 w-5" />
                    Retirar USDC
                  </Button>
                  <Button
                    onClick={handleInvest}
                    className="w-full justify-start bg-chart-1 text-white hover:bg-chart-1/90"
                    size="lg"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Invertir en DeFindex
                  </Button>
                  <Button
                    onClick={handleConnectWallet}
                    variant="outline"
                    className="w-full justify-start border-border/50 bg-transparent"
                    size="lg"
                  >
                    <Wallet className="mr-2 h-5 w-5" />
                    Conectar Billetera
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Flujo de Pagos</CardTitle>
                <CardDescription>Cómo VELOX procesa tus pagos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 space-y-1 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">Cliente</p>
                    <p className="text-xs text-muted-foreground">Paga con USDC</p>
                  </div>
                  <ArrowUpRight className="mx-auto h-6 w-6 rotate-90 text-muted-foreground md:rotate-0" />
                  <div className="flex-1 space-y-1 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chart-1/20">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">Red Stellar</p>
                    <p className="text-xs text-muted-foreground">Liquidación instantánea</p>
                  </div>
                  <ArrowUpRight className="mx-auto h-6 w-6 rotate-90 text-muted-foreground md:rotate-0" />
                  <div className="flex-1 space-y-1 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                      <Wallet className="h-6 w-6 text-success" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Tu Billetera</p>
                    <p className="text-xs text-muted-foreground">Recibe fondos</p>
                  </div>
                  <ArrowUpRight className="mx-auto h-6 w-6 rotate-90 text-muted-foreground md:rotate-0" />
                  <div className="flex-1 space-y-1 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chart-2/20">
                      <TrendingUp className="h-6 w-6 text-chart-2" />
                    </div>
                    <p className="text-sm font-medium text-foreground">DeFindex</p>
                    <p className="text-xs text-muted-foreground">Genera rendimiento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="yield">
            <YieldInvestment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

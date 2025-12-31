import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react"

const transactions = [
  {
    id: "1",
    type: "payment",
    amount: 29.99,
    description: "Suscripción Premium",
    date: "2025-12-31 14:32",
    status: "completado",
    txHash: "0x742d...8f4a",
  },
  {
    id: "2",
    type: "payment",
    amount: 149.99,
    description: "Licencia Anual",
    date: "2025-12-30 09:15",
    status: "completado",
    txHash: "0x8a3c...2b1f",
  },
  {
    id: "3",
    type: "withdrawal",
    amount: 500.0,
    description: "Retiro a billetera",
    date: "2025-12-29 16:45",
    status: "completado",
    txHash: "0x4f7e...9c3d",
  },
  {
    id: "4",
    type: "yield",
    amount: 1000.0,
    description: "Depósito DeFindex",
    date: "2025-12-28 11:20",
    status: "completado",
    txHash: "0x6d2a...5e8b",
  },
  {
    id: "5",
    type: "payment",
    amount: 79.99,
    description: "Actualización Plan Pro",
    date: "2025-12-27 13:55",
    status: "completado",
    txHash: "0x9b4f...7a2c",
  },
]

export function TransactionHistory() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Historial de Transacciones</CardTitle>
        <CardDescription>Todos los pagos, retiros y depósitos de rendimiento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/20 p-4 transition-colors hover:bg-secondary/40"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    tx.type === "payment"
                      ? "bg-primary/20"
                      : tx.type === "withdrawal"
                        ? "bg-warning/20"
                        : "bg-chart-1/20"
                  }`}
                >
                  {tx.type === "payment" && <ArrowDownLeft className="h-5 w-5 text-primary" />}
                  {tx.type === "withdrawal" && <ArrowUpRight className="h-5 w-5 text-warning" />}
                  {tx.type === "yield" && <TrendingUp className="h-5 w-5 text-chart-1" />}
                </div>
                <div>
                  <p className="font-medium text-foreground">{tx.description}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                    <Badge variant="outline" className="h-5 border-success/30 text-xs text-success">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-semibold ${
                    tx.type === "payment" ? "text-success" : tx.type === "withdrawal" ? "text-warning" : "text-chart-1"
                  }`}
                >
                  {tx.type === "payment" ? "+" : "-"}
                  {tx.amount.toFixed(2)} USDC
                </p>
                <p className="text-xs font-mono text-muted-foreground">{tx.txHash}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

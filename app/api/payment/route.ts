import { type NextRequest, NextResponse } from "next/server"

type PaymentMethod = "freighter" | "ledger" | "visa" | "mastercard" | "amex"
type Currency = "USDC" | "XLM"

interface PaymentRequest {
  name: string
  email: string
  paymentMethod: PaymentMethod
  currency: Currency
  amount: string
  recurring: boolean
}

interface PaymentResponse {
  success: boolean
  transactionId: string
  message: string
  timestamp: string
}

// Simular procesamiento de pago crypto en Stellar
async function processCryptoPayment(
  paymentMethod: "freighter" | "ledger",
  currency: Currency,
  amount: string,
): Promise<string> {
  // Simular delay de red blockchain
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generar ID de transacción realista de Stellar
  const txHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

  return txHash
}

// Simular procesamiento de pago con tarjeta
async function processCardPayment(paymentMethod: "visa" | "mastercard" | "amex", amount: string): Promise<string> {
  // Simular delay de gateway de pago
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generar ID de transacción de tarjeta
  const txId = `${paymentMethod.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  return txId
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()

    // Validar datos requeridos
    if (!body.name || !body.email || !body.paymentMethod || !body.currency || !body.amount) {
      return NextResponse.json({ success: false, message: "Faltan datos requeridos" }, { status: 400 })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false, message: "Email inválido" }, { status: 400 })
    }

    let transactionId: string

    // Procesar según método de pago
    if (body.paymentMethod === "freighter" || body.paymentMethod === "ledger") {
      transactionId = await processCryptoPayment(body.paymentMethod, body.currency, body.amount)
    } else {
      transactionId = await processCardPayment(body.paymentMethod, body.amount)
    }

    // Simular guardado en base de datos
    console.log("[v0] Payment processed:", {
      transactionId,
      name: body.name,
      email: body.email,
      paymentMethod: body.paymentMethod,
      currency: body.currency,
      amount: body.amount,
      recurring: body.recurring,
      timestamp: new Date().toISOString(),
    })

    const response: PaymentResponse = {
      success: true,
      transactionId,
      message: "Pago procesado exitosamente",
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error("[v0] Payment error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error al procesar el pago. Por favor intenta nuevamente.",
      },
      { status: 500 },
    )
  }
}

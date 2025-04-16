"use client"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  AlertCircle,
  Bell,
  Command,
  CreditCard,
  DollarSign,
  Download,
  Globe,
  LineChart,
  Lock,
  MessageSquare,
  Mic,
  Moon,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  Hexagon,
  type LucideIcon,
  Sun,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// NavItem component
function NavItem({
  icon: Icon,
  label,
  active,
  sectionId,
  onClick,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  sectionId: string
  onClick: (sectionId: string) => void
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start transition-colors duration-200 ${
        active
          ? "bg-slate-800/70 text-cyan-400 border-l-2 border-cyan-400"
          : "text-slate-400 hover:text-cyan-400 hover:bg-slate-800/30 border-l-2 border-transparent"
      }`}
      onClick={() => onClick(sectionId)}
    >
      <Icon className={`mr-2 h-4 w-4 ${active ? "text-cyan-400" : "group-hover:text-cyan-400"}`} />
      {label}
    </Button>
  )
}

// StatusItem component
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="text-sm font-medium">
        <span className={`text-${color}-400`}>{value}%</span>
      </div>
    </div>
  )
}

// MetricCard component
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  isCurrency,
}: {
  title: string
  value: string
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  isCurrency?: boolean
}) {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-500`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isCurrency && "$"}
          {value}
        </div>
        <p className="text-xs text-slate-500">{detail}</p>
      </CardContent>
      <CardFooter className="text-xs text-slate-400">
        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
        {trend === "up" ? "Increased" : trend === "down" ? "Decreased" : "Stable"}
      </CardFooter>
    </Card>
  )
}

// PerformanceChart component
function PerformanceChart() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
      {/* Placeholder for chart */}
      <LineChart className="h-32 w-32 opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
        {/* Chart Placeholder */}
      </div>
    </div>
  )
}

// TransactionRow component
function TransactionRow({
  date,
  description,
  category,
  amount,
  balance,
  status,
}: { date: string; description: string; category: string; amount: number; balance: number; status: string }) {
  return (
    <div className="grid grid-cols-12 p-3 text-xs text-slate-400">
      <div className="col-span-1">{date}</div>
      <div className="col-span-4">{description}</div>
      <div className="col-span-2">{category}</div>
      <div className="col-span-2">
        {amount < 0 ? (
          <span className="text-red-400">-${Math.abs(amount).toFixed(2)}</span>
        ) : (
          <span className="text-green-400">${amount.toFixed(2)}</span>
        )}
      </div>
      <div className="col-span-2">${balance.toFixed(2)}</div>
      <div className="col-span-1">
        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/50">
          {status}
        </Badge>
      </div>
    </div>
  )
}

// InvestmentItem component
function InvestmentItem({
  name,
  total,
  value,
  change,
}: { name: string; total: number; value: number; change: number }) {
  const profit = value - total
  const profitPercentage = (profit / total) * 100

  return (
    <Card className="bg-slate-800/30 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-200">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-cyan-400">${value.toLocaleString()}</div>
        <div className="text-xs text-slate-400">Total Investment: ${total.toLocaleString()}</div>
        <div className={`text-xs ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
          {profit >= 0 ? "+" : "-"}${Math.abs(profit).toLocaleString()} ({profitPercentage.toFixed(2)}%)
        </div>
        <div className="text-xs text-slate-500">Change: {change.toFixed(2)}%</div>
      </CardContent>
    </Card>
  )
}

// AccountCard component
function AccountCard({
  type,
  accountNumber,
  balance,
  color,
  isCredit,
}: { type: string; accountNumber: string; balance: number; color: string; isCredit?: boolean }) {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-200">{type} Account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-cyan-400">${balance.toLocaleString()}</div>
        <div className="text-xs text-slate-400">Account Number: {accountNumber}</div>
        {isCredit && <div className="text-xs text-red-400">Credit Limit: $5,000</div>}
      </CardContent>
    </Card>
  )
}

// AlertItem component
function AlertItem({
  title,
  time,
  description,
  type,
}: { title: string; time: string; description: string; type: string }) {
  let iconColor = "text-blue-500"
  if (type === "warning") iconColor = "text-amber-500"
  if (type === "update") iconColor = "text-purple-500"
  if (type === "success") iconColor = "text-green-500"

  return (
    <div className="flex items-start space-x-3">
      <AlertCircle className={`h-4 w-4 ${iconColor} mt-0.5`} />
      <div>
        <div className="text-sm font-medium text-slate-200">{title}</div>
        <div className="text-xs text-slate-400">{description}</div>
        <div className="text-xs text-slate-500">{time}</div>
      </div>
    </div>
  )
}

// CommunicationItem component
function CommunicationItem({
  sender,
  time,
  message,
  avatar,
  unread,
}: { sender: string; time: string; message: string; avatar: string; unread?: boolean }) {
  return (
    <div className="flex items-start space-x-3">
      <Avatar>
        <AvatarImage src={avatar || "/placeholder.svg"} alt={sender} />
        <AvatarFallback className="bg-slate-700 text-cyan-500">US</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-medium text-slate-200">{sender}</div>
        <div className="text-xs text-slate-400">{message}</div>
        <div className="text-xs text-slate-500">
          {time} {unread && <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/50">New</Badge>}
        </div>
      </div>
    </div>
  )
}

// AnalyticsCard component
function AnalyticsCard({
  title,
  value,
  change,
  period,
  isPercentage,
}: { title: string; value: number; change: number; period: string; isPercentage?: boolean }) {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value.toLocaleString()} {isPercentage && "%"}
        </div>
        <div className={`text-xs ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
          {change >= 0 ? "+" : "-"}
          {Math.abs(change).toFixed(2)}% {period}
        </div>
      </CardContent>
    </Card>
  )
}

// AnalyticsChart component
function AnalyticsChart() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
      {/* Placeholder for chart */}
      <LineChart className="h-32 w-32 opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
        {/* Chart Placeholder */}
      </div>
    </div>
  )
}

// ExpenseCategory component
function ExpenseCategory({
  category,
  amount,
  percentage,
  color,
}: { category: string; amount: number; percentage: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-slate-400">{category}</div>
      <div className="text-sm font-medium">
        ${amount.toLocaleString()} <span className={`text-${color}-400`}>({percentage.toFixed(1)}%)</span>
      </div>
    </div>
  )
}

// FinancialGoal component
function FinancialGoal({
  name,
  current,
  target,
  percentage,
  color,
  completed,
}: { name: string; current: number; target: number; percentage: number; color: string; completed?: boolean }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-200">{name}</div>
        <div className="text-xs text-slate-400">
          {completed ? "Completed!" : `$${current.toLocaleString()} / $${target.toLocaleString()}`}
        </div>
      </div>
      <Progress value={percentage} className="h-2 bg-slate-700">
        <div
          className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-700 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </Progress>
    </div>
  )
}

// InvestmentPerformanceChart component
function InvestmentPerformanceChart() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
      {/* Placeholder for chart */}
      <LineChart className="h-32 w-32 opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
        {/* Chart Placeholder */}
      </div>
    </div>
  )
}

// QuickTransferCard component
function QuickTransferCard() {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-200">Quick Transfer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Amount"
            className="w-full bg-slate-700/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <select className="w-full bg-slate-700/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500">
            <option>Checking Account</option>
            <option>Savings Account</option>
          </select>
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Transfer Now</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// BillPaymentCard component
function BillPaymentCard() {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-200">Bill Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Payee"
            className="w-full bg-slate-700/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full bg-slate-700/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Pay Bill</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// MobileDepositCard component
function MobileDepositCard() {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-200">Mobile Deposit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Amount"
            className="w-full bg-slate-700/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <Button className="w-full bg-green-600 hover:bg-green-700">Deposit Check</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// UpcomingPayment component
function UpcomingPayment({
  payee,
  amount,
  dueDate,
  status,
  recurring,
}: { payee: string; amount: number; dueDate: string; status: string; recurring: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-slate-200">{payee}</div>
        <div className="text-xs text-slate-400">
          {dueDate}{" "}
          {recurring && <Badge className="ml-1 bg-purple-500/20 text-purple-400 border-purple-500/50">Recurring</Badge>}
        </div>
      </div>
      <div className="text-sm font-medium">
        ${amount.toLocaleString()}{" "}
        <Badge className="ml-1 bg-amber-500/20 text-amber-400 border-amber-500/50">{status}</Badge>
      </div>
    </div>
  )
}

// RecentTransfer component
function RecentTransfer({
  recipient,
  amount,
  date,
  status,
  isInternal,
}: { recipient: string; amount: number; date: string; status: string; isInternal?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-slate-200">{recipient}</div>
        <div className="text-xs text-slate-400">
          {date}{" "}
          {isInternal && <Badge className="ml-1 bg-green-500/20 text-green-400 border-green-500/50">Internal</Badge>}
        </div>
      </div>
      <div className="text-sm font-medium">
        ${amount.toLocaleString()}{" "}
        <Badge className="ml-1 bg-green-500/20 text-green-400 border-green-500/50">{status}</Badge>
      </div>
    </div>
  )
}

// PaymentMethod component
function PaymentMethod({
  name,
  lastFour,
  expiryDate,
  isDefault,
}: { name: string; lastFour: string; expiryDate: string; isDefault?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-slate-200">{name}</div>
        <div className="text-xs text-slate-400">
          **** {lastFour} - Expires {expiryDate}{" "}
          {isDefault && <Badge className="ml-1 bg-cyan-500/20 text-cyan-400 border-cyan-500/50">Default</Badge>}
        </div>
      </div>
    </div>
  )
}

// SecurityActivity component
function SecurityActivity({
  event,
  time,
  location,
  status,
}: { event: string; time: string; location: string; status: string }) {
  return (
    <div className="flex items-start space-x-3">
      <Shield className="h-4 w-4 text-cyan-500" />
      <div>
        <div className="text-sm font-medium text-slate-200">{event}</div>
        <div className="text-xs text-slate-400">{location}</div>
        <div className="text-xs text-slate-500">
          {time} <Badge className="ml-1 bg-green-500/20 text-green-400 border-green-500/50">{status}</Badge>
        </div>
      </div>
    </div>
  )
}

// MarketIndex component
function MarketIndex({
  name,
  value,
  change,
}: {
  name: string
  value: string
  change: number
}) {
  const isPositive = change >= 0

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-slate-300">{name}</div>
        <div className="text-xs text-slate-500">{value}</div>
      </div>
      <div className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
        {isPositive ? "+" : ""}
        {change}%
      </div>
    </div>
  )
}

// Forex Rate component
function ForexRate({
  base,
  target,
  rate,
  change,
}: {
  base: string
  target: string
  rate: number
  change: number
}) {
  const isPositive = change >= 0

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-slate-300">
          {base}/{target}
        </div>
        <div className="text-xs text-slate-500">{rate.toFixed(4)}</div>
      </div>
      <div className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
        {isPositive ? "+" : ""}
        {change}%
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [systemStatus, setSystemStatus] = useState(85)
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [securityLevel, setSecurityLevel] = useState(75)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const [accountBalance, setAccountBalance] = useState(42568.75)
  const [monthlyIncome, setMonthlyIncome] = useState(8750.42)
  const [monthlyExpenses, setMonthlyExpenses] = useState(5842.18)
  const [investmentReturn, setInvestmentReturn] = useState(12.4)
  const [savingsRate, setSavingsRate] = useState(24.5)
  const [creditScore, setCreditScore] = useState(785)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Add a new state variable to track the active section
  const [activeSection, setActiveSection] = useState("dashboard")

  // Fake notifications data
  const [notifications] = useState<{ id: number; title: string; description: string; time: string; type: string }[]>([
    { id: 1, title: "System update available", description: "Version 2.3.1 can be installed.", time: "10:00 AM", type: "update" },
    { id: 2, title: "Password changed", description: "Your password was changed successfully.", time: "9:45 AM", type: "success" },
    { id: 3, title: "Unusual login", description: "Login attempt from unknown device.", time: "8:30 AM", type: "warning" },
    { id: 4, title: "Payment due", description: "Your credit card payment is due tomorrow.", time: "Yesterday", type: "warning" },
  ])

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
      setSystemStatus(Math.floor(Math.random() * 10) + 80)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing financial data
  useEffect(() => {
    const interval = setInterval(() => {
      setMonthlyIncome((prev) => prev + (Math.random() * 100 - 50))
      setMonthlyExpenses((prev) => prev + (Math.random() * 80 - 40))
      setInvestmentReturn((prev) => Math.max(0, Math.min(30, prev + (Math.random() * 2 - 1))))
      setSavingsRate((prev) => Math.max(0, Math.min(40, prev + (Math.random() * 2 - 1))))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Add a new function to determine market status based on time
  // Add this function before the Dashboard component return statement

  // Function to determine market status
  function getMarketStatus(market: string, currentTime: Date): { status: string; color: string } {
    // Convert to local time in the market's timezone
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    const day = currentTime.getDay() // 0 is Sunday, 6 is Saturday

    // Weekend check (Saturday and Sunday)
    if (day === 0 || day === 6) {
      return { status: "Closed", color: "text-red-400" }
    }

    // Simplified logic for demo purposes
    switch (market) {
      case "NYSE":
      case "NASDAQ":
        // 9:30 AM - 4:00 PM EST
        if ((hour === 9 && minute >= 30) || (hour > 9 && hour < 16)) {
          return { status: "Open", color: "text-green-400" }
        } else if (hour === 9 && minute < 30 && hour >= 8) {
          return { status: "Opening Soon", color: "text-amber-400" }
        } else if (hour === 16 && minute <= 15) {
          return { status: "Closing", color: "text-amber-400" }
        } else {
          return { status: "Closed", color: "text-red-400" }
        }

      case "London":
        // 8:00 AM - 4:30 PM GMT
        if (hour >= 8 && (hour < 16 || (hour === 16 && minute <= 30))) {
          return { status: "Open", color: "text-green-400" }
        } else if (hour === 7 && minute >= 45) {
          return { status: "Opening Soon", color: "text-amber-400" }
        } else if (hour === 16 && minute > 30 && minute <= 45) {
          return { status: "Closing", color: "text-amber-400" }
        } else {
          return { status: "Closed", color: "text-red-400" }
        }

      case "Tokyo":
        // 9:00 AM - 3:00 PM JST
        if (hour >= 9 && hour < 15) {
          return { status: "Open", color: "text-green-400" }
        } else if (hour === 8 && minute >= 45) {
          return { status: "Opening Soon", color: "text-amber-400" }
        } else if (hour === 15 && minute <= 15) {
          return { status: "Closing", color: "text-amber-400" }
        } else {
          return { status: "Closed", color: "text-red-400" }
        }

      default:
        return { status: "Unknown", color: "text-slate-400" }
    }
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">SYSTEM INITIALIZING</div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              FINEX AI
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search systems..."
                className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-[10px] font-medium text-white">
                      {notifications.length}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <AlertItem key={n.id} title={n.title} time={n.time} description={n.description} type={n.type} />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-slate-700 text-cyan-500">CM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem
                    icon={Command}
                    label="Dashboard"
                    active={activeSection === "dashboard"}
                    sectionId="dashboard"
                    onClick={setActiveSection}
                  />
                  <NavItem
                    icon={DollarSign}
                    label="Accounts"
                    active={activeSection === "accounts"}
                    sectionId="accounts"
                    onClick={setActiveSection}
                  />
                  <NavItem
                    icon={CreditCard}
                    label="Transactions"
                    active={activeSection === "transactions"}
                    sectionId="transactions"
                    onClick={setActiveSection}
                  />
                  <NavItem
                    icon={PieChart}
                    label="Investments"
                    active={activeSection === "investments"}
                    sectionId="investments"
                    onClick={setActiveSection}
                  />
                  <NavItem
                    icon={TrendingUp}
                    label="Analytics"
                    active={activeSection === "analytics"}
                    sectionId="analytics"
                    onClick={setActiveSection}
                  />
                  <NavItem
                    icon={Users}
                    label="Payments"
                    active={activeSection === "payments"}
                    sectionId="payments"
                    onClick={setActiveSection}
                  />
                  <NavItem
                    icon={Shield}
                    label="Security"
                    active={activeSection === "security"}
                    sectionId="security"
                    onClick={setActiveSection}
                  />
                  <NavItem
                    icon={Settings}
                    label="Settings"
                    active={activeSection === "settings"}
                    sectionId="settings"
                    onClick={setActiveSection}
                  />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">FINANCIAL STATUS</div>
                  <div className="space-y-3">
                    <StatusItem label="Cash Flow" value={78} color="cyan" />
                    <StatusItem label="Investments" value={65} color="green" />
                    <StatusItem label="Credit Health" value={92} color="blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            {activeSection === "dashboard" && (
              <div className="grid gap-6">
                {/* System overview */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-700/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center">
                        <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                        Financial Overview
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                          LIVE
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <MetricCard
                        title="Account Balance"
                        value={accountBalance.toFixed(2)}
                        icon={Wallet}
                        trend="up"
                        color="cyan"
                        detail="USD | Checking + Savings"
                        isCurrency={true}
                      />
                      <MetricCard
                        title="Monthly Income"
                        value={monthlyIncome.toFixed(2)}
                        icon={TrendingUp}
                        trend="stable"
                        color="purple"
                        detail="Last 30 days"
                        isCurrency={true}
                      />
                      <MetricCard
                        title="Monthly Expenses"
                        value={monthlyExpenses.toFixed(2)}
                        icon={TrendingDown}
                        trend="down"
                        color="blue"
                        detail="Last 30 days"
                        isCurrency={true}
                      />
                    </div>

                    <div className="mt-8">
                      <Tabs defaultValue="performance" className="w-full">
                        <div className="flex items-center justify-between mb-4">
                          <TabsList className="bg-slate-800/50 p-1">
                            <TabsTrigger
                              value="performance"
                              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                            >
                              Cash Flow
                            </TabsTrigger>
                            <TabsTrigger
                              value="processes"
                              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                            >
                              Transactions
                            </TabsTrigger>
                            <TabsTrigger
                              value="storage"
                              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                            >
                              Investments
                            </TabsTrigger>
                          </TabsList>

                          <div className="flex items-center space-x-2 text-xs text-slate-400">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                              Income
                            </div>
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                              Expenses
                            </div>
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                              Savings
                            </div>
                          </div>
                        </div>

                        <TabsContent value="performance" className="mt-0">
                          <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                            <PerformanceChart />
                            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                              <div className="text-xs text-slate-400">Net Cash Flow</div>
                              <div className="text-lg font-mono text-cyan-400">
                                ${(monthlyIncome - monthlyExpenses).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="processes" className="mt-0">
                          <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                            <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                              <div className="col-span-1">Date</div>
                              <div className="col-span-4">Description</div>
                              <div className="col-span-2">Category</div>
                              <div className="col-span-2">Amount</div>
                              <div className="col-span-2">Balance</div>
                              <div className="col-span-1">Status</div>
                            </div>

                            <div className="divide-y divide-slate-700/30">
                              <TransactionRow
                                date="04/15"
                                description="Salary Deposit"
                                category="Income"
                                amount={4250.0}
                                balance={42568.75}
                                status="completed"
                              />
                              <TransactionRow
                                date="04/14"
                                description="Amazon Purchase"
                                category="Shopping"
                                amount={-129.99}
                                balance={38318.75}
                                status="completed"
                              />
                              <TransactionRow
                                date="04/12"
                                description="Apartment Rent"
                                category="Housing"
                                amount={-1850.0}
                                balance={38448.74}
                                status="completed"
                              />
                              <TransactionRow
                                date="04/10"
                                description="Stock Dividend"
                                category="Investment"
                                amount={175.25}
                                balance={40298.74}
                                status="completed"
                              />
                              <TransactionRow
                                date="04/08"
                                description="Grocery Store"
                                category="Food"
                                amount={-86.34}
                                balance={40123.49}
                                status="completed"
                              />
                              <TransactionRow
                                date="04/05"
                                description="Utility Bill"
                                category="Utilities"
                                amount={-142.87}
                                balance={40209.83}
                                status="completed"
                              />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="storage" className="mt-0">
                          <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <InvestmentItem name="Stock Portfolio" total={125000} value={142500} change={14.0} />
                              <InvestmentItem name="Crypto Assets" total={15000} value={18750} change={25.0} />
                              <InvestmentItem name="Retirement Fund" total={250000} value={267500} change={7.0} />
                              <InvestmentItem name="Real Estate" total={350000} value={385000} change={10.0} />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </CardContent>
                </Card>

                {/* Security & Alerts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <Shield className="mr-2 h-5 w-5 text-green-500" />
                        Account Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-400">Two-Factor Auth</div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-400">Fraud Protection</div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-400">Transaction Alerts</div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-400">Last Security Check</div>
                          <div className="text-sm text-cyan-400">
                            Updated <span className="text-slate-500">2 days ago</span>
                          </div>
                        </div>

                        <div className="pt-2 mt-2 border-t border-slate-700/50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">Credit Score</div>
                            <div className="text-sm text-cyan-400">{creditScore}</div>
                          </div>
                          <Progress value={(creditScore / 850) * 100} className="h-2 bg-slate-700">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                              style={{ width: `${(creditScore / 850) * 100}%` }}
                            />
                          </Progress>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                        Financial Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <AlertItem
                          title="Unusual Transaction Detected"
                          time="14:32:12"
                          description="Online purchase of $499.99 at Electronics Store"
                          type="warning"
                        />
                        <AlertItem
                          title="Bill Payment Due"
                          time="13:45:06"
                          description="Credit card payment due in 3 days"
                          type="info"
                        />
                        <AlertItem
                          title="Investment Opportunity"
                          time="09:12:45"
                          description="Tech sector showing strong growth potential"
                          type="update"
                        />
                        <AlertItem
                          title="Savings Goal Reached"
                          time="04:30:00"
                          description="Emergency fund target of $10,000 achieved"
                          type="success"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Communications */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                      Financial Updates
                    </CardTitle>
                    <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
                      4 New Messages
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <CommunicationItem
                        sender="Financial Advisor"
                        time="15:42:12"
                        message="Your portfolio review is ready. Overall performance is up 8.2% this quarter."
                        avatar="/placeholder.svg?height=40&width=40"
                        unread
                      />
                      <CommunicationItem
                        sender="Market Alert"
                        time="14:30:45"
                        message="S&P 500 up 1.2% today. Your watchlist stocks are performing well."
                        avatar="/placeholder.svg?height=40&width=40"
                        unread
                      />
                      <CommunicationItem
                        sender="Bank Notice"
                        time="12:15:33"
                        message="Your mortgage payment was processed successfully. Next payment due on May 15."
                        avatar="/placeholder.svg?height=40&width=40"
                        unread
                      />
                      <CommunicationItem
                        sender="Tax Reminder"
                        time="09:05:18"
                        message="Don't forget to submit your quarterly tax payment by April 30."
                        avatar="/placeholder.svg?height=40&width=40"
                        unread
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-slate-700/50 pt-4">
                    <div className="flex items-center w-full space-x-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                      <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button size="icon" className="bg-cyan-600 hover:bg-cyan-700">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}

            {activeSection === "accounts" && (
              <div className="grid gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-700/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center">
                        <DollarSign className="mr-2 h-5 w-5 text-cyan-500" />
                        Accounts Overview
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                          LIVE
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AccountCard type="Checking" accountNumber="**** 4832" balance={12568.42} color="cyan" />
                      <AccountCard type="Savings" accountNumber="**** 7631" balance={30000.33} color="blue" />
                      <AccountCard type="Investment" accountNumber="**** 9214" balance={142500.0} color="purple" />
                      <AccountCard
                        type="Credit Card"
                        accountNumber="**** 5123"
                        balance={-2845.67}
                        color="red"
                        isCredit={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "transactions" && (
              <div className="grid gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-700/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-cyan-500" />
                        Transaction History
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 bg-slate-800/50">
                          <Download className="h-3.5 w-3.5 mr-1" /> Export
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 bg-slate-800/50">
                          <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                      <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                        <div className="col-span-1">Date</div>
                        <div className="col-span-4">Description</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-2">Amount</div>
                        <div className="col-span-2">Balance</div>
                        <div className="col-span-1">Status</div>
                      </div>

                      <div className="divide-y divide-slate-700/30">
                        <TransactionRow
                          date="04/15"
                          description="Salary Deposit"
                          category="Income"
                          amount={4250.0}
                          balance={42568.75}
                          status="completed"
                        />
                        <TransactionRow
                          date="04/14"
                          description="Amazon Purchase"
                          category="Shopping"
                          amount={-129.99}
                          balance={38318.75}
                          status="completed"
                        />
                        <TransactionRow
                          date="04/12"
                          description="Apartment Rent"
                          category="Housing"
                          amount={-1850.0}
                          balance={38448.74}
                          status="completed"
                        />
                        <TransactionRow
                          date="04/10"
                          description="Stock Dividend"
                          category="Investment"
                          amount={175.25}
                          balance={40298.74}
                          status="completed"
                        />
                        <TransactionRow
                          date="04/08"
                          description="Grocery Store"
                          category="Food"
                          amount={-86.34}
                          balance={40123.49}
                          status="completed"
                        />
                        <TransactionRow
                          date="04/05"
                          description="Utility Bill"
                          category="Utilities"
                          amount={-142.87}
                          balance={40209.83}
                          status="completed"
                        />
                        <TransactionRow
                          date="04/03"
                          description="Netflix Subscription"
                          category="Entertainment"
                          amount={-17.99}
                          balance={40352.7}
                          status="completed"
                        />
                        <TransactionRow
                          date="04/02"
                          description="Gas Station"
                          category="Transportation"
                          amount={-45.67}
                          balance={40370.69}
                          status="completed"
                        />
                        <TransactionRow
                          date="04/01"
                          description="Health Insurance"
                          category="Insurance"
                          amount={-356.78}
                          balance={40416.36}
                          status="completed"
                        />
                        <TransactionRow
                          date="03/29"
                          description="Restaurant Dinner"
                          category="Food"
                          amount={-78.45}
                          balance={40773.14}
                          status="completed"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "investments" && (
              <div className="grid gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-700/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center">
                        <PieChart className="mr-2 h-5 w-5 text-cyan-500" />
                        Investment Portfolio
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-slate-800/50 text-green-400 border-green-500/50 text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                          +12.4% YTD
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InvestmentItem name="Stock Portfolio" total={125000} value={142500} change={14.0} />
                      <InvestmentItem name="Crypto Assets" total={15000} value={18750} change={25.0} />
                      <InvestmentItem name="Retirement Fund" total={250000} value={267500} change={7.0} />
                      <InvestmentItem name="Real Estate" total={350000} value={385000} change={10.0} />
                    </div>

                    <div className="mt-6 bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                      <h3 className="text-sm font-medium text-slate-200 mb-4">Portfolio Allocation</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm text-slate-400">Stocks</div>
                              <div className="text-xs text-cyan-400">42% allocated</div>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                style={{ width: "42%" }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm text-slate-400">Bonds</div>
                              <div className="text-xs text-purple-400">28% allocated</div>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{ width: "28%" }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm text-slate-400">Real Estate</div>
                              <div className="text-xs text-blue-400">20% allocated</div>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                style={{ width: "20%" }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-sm text-slate-400">Cash</div>
                              <div className="text-xs text-green-400">10% allocated</div>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                style={{ width: "10%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "analytics" && (
              <div className="grid gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-700/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-cyan-500" />
                        Financial Analytics
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 bg-slate-800/50">
                          <Download className="h-3.5 w-3.5 mr-1" /> Export
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 bg-slate-800/50">
                          <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <AnalyticsCard title="Monthly Spending" value={5842.18} change={-3.2} period="vs Last Month" />
                      <AnalyticsCard
                        title="Savings Rate"
                        value={24.5}
                        change={2.1}
                        period="vs Last Month"
                        isPercentage
                      />
                      <AnalyticsCard title="Net Worth" value={814250.0} change={5.4} period="vs Last Quarter" />
                    </div>

                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-slate-200">Spending Analysis</h3>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400">
                            Monthly
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400">
                            Quarterly
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-cyan-400">
                            Yearly
                          </Button>
                        </div>
                      </div>
                      <div className="h-64 w-full relative">
                        <AnalyticsChart />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                        <h3 className="text-sm font-medium text-slate-200 mb-4">Expense Breakdown</h3>
                        <div className="space-y-3">
                          <ExpenseCategory category="Housing" amount={1850} percentage={31.7} color="cyan" />
                          <ExpenseCategory category="Food & Dining" amount={850} percentage={14.5} color="purple" />
                          <ExpenseCategory category="Transportation" amount={450} percentage={7.7} color="blue" />
                          <ExpenseCategory category="Utilities" amount={320} percentage={5.5} color="green" />
                          <ExpenseCategory category="Entertainment" amount={280} percentage={4.8} color="amber" />
                          <ExpenseCategory category="Other" amount={2092.18} percentage={35.8} color="slate" />
                        </div>
                      </div>

                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                        <h3 className="text-sm font-medium text-slate-200 mb-4">Financial Goals</h3>
                        <div className="space-y-4">
                          <FinancialGoal
                            name="Emergency Fund"
                            current={10000}
                            target={10000}
                            percentage={100}
                            color="green"
                            completed
                          />
                          <FinancialGoal
                            name="Home Down Payment"
                            current={45000}
                            target={80000}
                            percentage={56.25}
                            color="cyan"
                          />
                          <FinancialGoal
                            name="Vacation Fund"
                            current={2500}
                            target={5000}
                            percentage={50}
                            color="purple"
                          />
                          <FinancialGoal name="New Car" current={12000} target={35000} percentage={34.3} color="blue" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-700/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center">
                        <LineChart className="mr-2 h-5 w-5 text-cyan-500" />
                        Investment Performance
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-slate-200">Portfolio Performance</h3>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400">
                            1M
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400">
                            3M
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-cyan-400">
                            1Y
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400">
                            5Y
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400">
                            All
                          </Button>
                        </div>
                      </div>
                      <div className="h-64 w-full relative">
                        <InvestmentPerformanceChart />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "payments" && (
              <div className="grid gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-700/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center">
                        <Users className="mr-2 h-5 w-5 text-cyan-500" />
                        Payments & Transfers
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs border-slate-700 bg-slate-800/50">
                          <Plus className="h-3.5 w-3.5 mr-1" /> New Payment
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <QuickTransferCard />
                      <BillPaymentCard />
                      <MobileDepositCard />
                    </div>

                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 mb-6">
                      <h3 className="text-sm font-medium text-slate-200 mb-4">Upcoming Payments</h3>
                      <div className="space-y-3">
                        <UpcomingPayment
                          payee="Rent"
                          amount={1850}
                          dueDate="May 1, 2023"
                          status="scheduled"
                          recurring
                        />
                        <UpcomingPayment
                          payee="Electric Company"
                          amount={142.87}
                          dueDate="May 5, 2023"
                          status="scheduled"
                          recurring
                        />
                        <UpcomingPayment
                          payee="Internet Provider"
                          amount={89.99}
                          dueDate="May 8, 2023"
                          status="scheduled"
                          recurring
                        />
                        <UpcomingPayment
                          payee="Credit Card"
                          amount={750}
                          dueDate="May 15, 2023"
                          status="pending"
                          recurring
                        />
                        <UpcomingPayment
                          payee="Water Bill"
                          amount={78.45}
                          dueDate="May 20, 2023"
                          status="pending"
                          recurring
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                        <h3 className="text-sm font-medium text-slate-200 mb-4">Recent Transfers</h3>
                        <div className="space-y-3">
                          <RecentTransfer
                            recipient="Savings Account"
                            amount={500}
                            date="Apr 28, 2023"
                            status="completed"
                            isInternal
                          />
                          <RecentTransfer recipient="John Smith" amount={125} date="Apr 25, 2023" status="completed" />
                          <RecentTransfer
                            recipient="Investment Account"
                            amount={1000}
                            date="Apr 20, 2023"
                            status="completed"
                            isInternal
                          />
                          <RecentTransfer
                            recipient="Sarah Johnson"
                            amount={75.5}
                            date="Apr 15, 2023"
                            status="completed"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                        <h3 className="text-sm font-medium text-slate-200 mb-4">Payment Methods</h3>
                        <div className="space-y-3">
                          <PaymentMethod name="Visa Credit Card" lastFour="5123" expiryDate="05/25" isDefault />
                          <PaymentMethod name="Mastercard Debit" lastFour="4832" expiryDate="09/24" />
                          <PaymentMethod name="American Express" lastFour="7651" expiryDate="12/26" />
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-xs border-slate-700 bg-slate-800/50 hover:bg-slate-800/80 hover:border-cyan-500/50 hover:text-cyan-400"
                            >
                              <Plus className="h-3.5 w-3.5 mr-1" /> Add Payment Method
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "security" && (
              <div className="grid gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-700/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-cyan-500" />
                        Security Center
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                        <h3 className="text-sm font-medium text-slate-200 mb-4">Security Status</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-400">Two-Factor Auth</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Enabled</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-400">Fraud Protection</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-400">Transaction Alerts</div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Enabled</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-400">Last Security Check</div>
                            <div className="text-sm text-cyan-400">
                              Updated <span className="text-slate-500">2 days ago</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                        <h3 className="text-sm font-medium text-slate-200 mb-4">Recent Security Activity</h3>
                        <div className="space-y-3">
                          <SecurityActivity
                            event="Login from new device"
                            time="Today, 10:42 AM"
                            location="San Francisco, CA"
                            status="verified"
                          />
                          <SecurityActivity
                            event="Password changed"
                            time="Apr 12, 2023"
                            location="Your account"
                            status="completed"
                          />
                          <SecurityActivity
                            event="Unusual login attempt"
                            time="Apr 10, 2023"
                            location="Beijing, China"
                            status="blocked"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="grid gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="border-b border-slate-700/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 flex items-center">
                        <Settings className="mr-2 h-5 w-5 text-cyan-500" />
                        Account Settings
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                        <h3 className="text-sm font-medium text-slate-200 mb-4">Preferences</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Bell className="text-cyan-500 mr-2 h-4 w-4" />
                              <Label className="text-sm text-slate-400">Notifications</Label>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Lock className="text-cyan-500 mr-2 h-4 w-4" />
                              <Label className="text-sm text-slate-400">Auto-Lock</Label>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <DollarSign className="text-cyan-500 mr-2 h-4 w-4" />
                              <Label className="text-sm text-slate-400">Round-Up Savings</Label>
                            </div>
                            <Switch />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Globe className="text-cyan-500 mr-2 h-4 w-4" />
                              <Label className="text-sm text-slate-400">International Transfers</Label>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                        <h3 className="text-sm font-medium text-slate-200 mb-4">Account Information</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <div className="text-sm text-slate-400">Email</div>
                            <div className="text-sm text-slate-300">user@example.com</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-slate-400">Phone</div>
                            <div className="text-sm text-slate-300">+1 (555) 123-4567</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-slate-400">Address</div>
                            <div className="text-sm text-slate-300">123 Financial St, New York, NY</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-slate-400">Member Since</div>
                            <div className="text-sm text-slate-300">January 2022</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              {/* Financial Markets Time */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1 font-mono">MARKETS TIME</div>
                      <div className="text-3xl font-mono text-cyan-400 mb-1">{formatTime(currentTime)}</div>
                      <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {["NYSE", "NASDAQ", "London", "Tokyo"].map((market) => {
                        const { status, color } = getMarketStatus(market, currentTime)
                        return (
                          <div key={market} className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-1">{market}</div>
                            <div className={`text-sm font-mono ${color}`}>{status}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Indices */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base flex items-center">
                    <LineChart className="mr-2 h-4 w-4 text-cyan-500" />
                    Market Indices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <MarketIndex name="S&P 500" value="5,218.24" change={1.23} />
                    <MarketIndex name="NASDAQ" value="16,742.39" change={1.56} />
                    <MarketIndex name="DOW" value="38,563.80" change={0.78} />
                    <MarketIndex name="FTSE 100" value="8,142.15" change={-0.42} />
                  </div>
                </CardContent>
              </Card>

              {/* Forex Rates */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-cyan-500" />
                    Forex Rates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ForexRate base="USD" target="EUR" rate={0.9245} change={0.12} />
                    <ForexRate base="USD" target="GBP" rate={0.7912} change={-0.08} />
                    <ForexRate base="USD" target="JPY" rate={154.32} change={0.45} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

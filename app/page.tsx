"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Medal,
  Trophy,
  MapPin,
  ChevronDown,
  ArrowRight,
  Users,
  ClipboardList,
  Clock,
  Footprints,
  Route,
  HandIcon as PointingHand,
  Smartphone,
  UserPlus,
  UsersRound,
  Info,
  ListChecks,
  Ticket,
  Upload,
  Menu,
  X,
  Tag,
  Building2,
  Building,
  HeadphonesIcon,
  ChevronUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 在文件頂部導入新組件
import BadgeCard from "./components/badge-card"
import { SpotCard } from "./components/spot-card"

// 在 RunningEventPage 函數之前添加這個常量
const BADGES_DATA = [
  {
    id: 1,
    name: "里程勳章",
    description: "單日累積 3 公里，即可獲​得 1 枚「里程勳章」；不限​場域、路線。",
    color: "bg-blue-500",
    note: ["每人、每日最多​獲得 1 枚。", "速度不可高於每​公里 3 分鐘。"],
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_1.png",
    ticket: "1張抽獎券",
  },
  {
    id: 2,
    name: "步數勳章",
    description: "單日累積 6,000 步，即可獲得 1 枚​「步數勳章」；不限場域、路線。",
    color: "bg-yellow-500",
    note: "每人、每日最多獲得 1 ​枚。",
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_2.png",
    ticket: "1張抽獎券",
  },
  {
    id: 3,
    name: "景點勳章",
    description:
      "經過指定高雄市 24 個 景點之一檢查​點，即可獲得 1 枚「景點勳章」；若​經過 2 個檢查點，即可獲得 2 枚​「景點勳章」，以此類推。",
    color: "bg-red-500",
    note: ["同一感應點每人、每次​僅計算一次。", "每人、每日最多獲得 5 ​枚。", "單筆數據里程數不可少​於 1 公里。"],
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_3_9.png",
    ticket: "1張抽獎券",
  },
  {
    id: 4,
    name: "登頂勳章",
    description: "抵達指定 6 座山頂其中之一個「山​頂」感應點，即可獲得 1 枚「登頂勳​章」。",
    color: "bg-green-600",
    note: ["每人、每日最多獲得 3 ​枚。", "預計 6 座，配合高雄市​政府政策滾動式調整。"],
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_4.png",
    ticket: "1張抽獎券",
  },
  {
    id: 5,
    name: "連續勳章",
    description: "單日達 6,000 步或單日達 3 公里，​單月累積 10 日，即可獲得 1 枚「連​續運動勳章」。",
    color: "bg-purple-500",
    note: "4/1發送3月份；5/1發​送4月份；6/1發送5月​份。",
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_5.png",
    ticket: "3張抽獎券",
  },
  {
    id: 6,
    name: "百K勳章",
    description: "個人累積里程每 100 公里，可獲得 1 ​枚「百 K 勳章」。",
    color: "bg-orange-500",
    note: "每人最多領取 15 枚。",
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_6.png",
    ticket: "5張抽獎券",
  },
  {
    id: 7,
    name: "路線勳章",
    description:
      "由跑者投稿跑步路線GPX，最後由馬​拉松世界選出至少 5 條最具創意的路​線。民眾可依照 GPX 地圖指示進行​跑走任務，完成 1 條路線即可獲得 1 ​枚「路線勳章」。",
    color: "bg-indigo-500",
    note: ["每人、每日最多獲得 1 ​枚。", "2/27-3/30開放徵選路​線；4/1公布決選名單並​開放任務挑戰。"],
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_7.png",
    ticket: "1張抽獎券",
  },
  {
    id: 8,
    name: "元宵節特別勳章",
    description: "在 2/12~2/17 期間內上傳跑步或走​路運動數據，可獲得「元宵節特別版​勳章」。(於活動正式上線後補發勳章)",
    color: "bg-pink-500",
    note: ["每人、每日限領 1 枚。", "(於活動正式上線後開始後補發抽獎券)"],
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_8.png",
    ticket: "1張抽獎券",
  },
  {
    id: 9,
    name: "智慧城市展 特別版",
    description: "在高雄智慧城市展攤位所設立的跑步​機上完成 30 秒走跑，即可獲得「智​慧城市展特別版勳章」。",
    color: "bg-cyan-500",
    note: "每人、每日限領 1 枚。",
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_9.png",
    ticket: "1張抽獎券",
  },
  {
    id: 10,
    name: "端午節特別版",
    description: "在 5/31 上傳走跑數據，即可獲得「端午節特別版勳章」。",
    color: "bg-amber-500",
    note: "每人、每日限領 1 枚。",
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_10.png",
    ticket: "1張抽獎券",
  },
  {
    id: 11,
    name: "路跑勳章",
    description: "參加指定高雄路跑賽事，即可獲得 1 ​枚「高雄路跑賽勳章」。",
    color: "bg-emerald-600",
    note: "同一場比賽，每人限獲​得1枚。",
    image: "https://www.marathonsworld.com/ExploreKaohsiung/images/medal_13.png",
    ticket: "1張抽獎券",
  },
]

// 在 RunningEventPage 函數之前添加這個常量
const SPOTS_DATA = [
  { id: 2, name: "蓮池潭", area: "左營", description: "高雄著名風景區，環湖步道適合健走" },
  { id: 4, name: "佛光山佛陀紀念館", area: "大樹", description: "佛教聖地，建築宏偉" },
  { id: 9, name: "漢神巨蛋運動中心", area: "左營", description: "現代化運動設施" },
  { id: 10, name: "高雄國家體育場", area: "左營", description: "2009世運主場館，著名螺旋形建築" },
  { id: 12, name: "三民公園", area: "三民區", description: "市區綠地，休閒好去處" },
  { id: 16, name: "壽山", area: "鼓山", description: "俯瞰高雄港灣，登山健行勝地" },
  { id: 17, name: "阿公店水庫", area: "岡山", description: "水庫風光，環湖步道" },
  { id: 18, name: "衛武公園", area: "鳳山", description: "歷史建築與綠地結合" },
  { id: 19, name: "中正體育公園", area: "苓雅", description: "運動設施完善的市區公園" },
  { id: 20, name: "金獅湖風景區", area: "三民區", description: "湖光山色，環湖步道" },
  { id: 21, name: "半屏山登山步道", area: "楠梓", description: "生態豐富的登山路線" },
  { id: 22, name: "觀音山登山步道", area: "大社", description: "知名登山路線，視野遼闊" },
  { id: 24, name: "高雄都會公園", area: "楠梓", description: "都市中的大型綠地，適合跑步" },
]

// 在 RunningEventPage 函數之前添加這個常量
const NORTH_SPOTS = SPOTS_DATA.filter((spot) => [2, 9, 10, 21, 24].includes(spot.id))
const CENTRAL_SPOTS = SPOTS_DATA.filter((spot) => [12, 16, 19, 20].includes(spot.id))
const EAST_SPOTS = SPOTS_DATA.filter((spot) => [4, 17, 22].includes(spot.id))
const SOUTH_SPOTS = SPOTS_DATA.filter((spot) => [18].includes(spot.id))

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const FaqItem = ({ faq, index }: { faq: { question: string; answer: string }; index: number }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
      setIsOpen((prevOpen) => !prevOpen)
    }, [])

    return (
      <div key={index} className="rounded-lg border p-4 shadow-sm">
        <div className="flex items-center justify-between cursor-pointer" onClick={toggleOpen}>
          <h3 className="text-lg font-medium">{faq.question}</h3>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
          />
        </div>
        <div
          className={`mt-2 text-sm text-muted-foreground overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {faq.answer}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 頂部導航 */}
      <header className="sticky top-0 z-40 w-full border-b bg-emerald-50/95 backdrop-blur supports-[backdrop-filter]:bg-emerald-50/60">
        <div className="container mx-auto px-4 md:px-6 flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Footprints className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold">走跑高雄2.0</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
            <Link href="#statistics" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              活動成果統計
            </Link>
            <Link href="#leaderboard" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              排行榜
            </Link>
            <Link href="#how-to-join" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              如何參與
            </Link>
            <div className="relative group">
              <Link
                href="#badges"
                className="text-sm font-medium hover:text-emerald-500 transition-colors flex items-center"
              >
                開始挑戰任務
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link
                    href="#badges"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-500"
                  >
                    任務與徽章說明
                  </Link>
                  <Link
                    href="#spots"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-500"
                  >
                    24景點地圖
                  </Link>
                  <Link
                    href="#routes"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-500"
                  >
                    路線徵選活動
                  </Link>
                </div>
              </div>
            </div>
            <Link href="#prizes" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              抽獎資訊
            </Link>
            <Link href="#partners" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              合作店家
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              常見問題
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              聯絡資訊
            </Link>
            <div className="flex gap-2">
              <Button
                className="border border-emerald-600 text-emerald-600 rounded-full bg-white hover:bg-emerald-600 hover:text-white px-6 py-2"
                variant="outline"
                onClick={() => window.open("https://www.marathonsworld.com/product/online_marathon/5/agreement.php?rid=358&", "_blank")}
              >
                個人報名
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-2"
                onClick={() => window.open("https://www.marathonsworld.com/product/online_marathon/5/agreement.php?rid=368&", "_blank")}
              >
                團體報名
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="ml-auto md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="container px-4 py-4 space-y-4">
              <Link
                href="#statistics"
                className="block text-sm font-medium hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                活動成果統計
              </Link>
              <Link
                href="#leaderboard"
                className="block text-sm font-medium hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                排行榜
              </Link>
              <Link
                href="#how-to-join"
                className="block text-sm font-medium hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                如何參與
              </Link>
              <div className="space-y-2">
                <Link
                  href="#badges"
                  className="block text-sm font-medium hover:text-emerald-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  開始挑戰任務
                </Link>
                <div className="pl-4 space-y-2">
                  <Link
                    href="#badges"
                    className="block text-sm text-gray-700 hover:text-emerald-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    任務與徽章說明
                  </Link>
                  <Link
                    href="#spots"
                    className="block text-sm text-gray-700 hover:text-emerald-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    24景點地圖
                  </Link>
                  <Link
                    href="#routes"
                    className="block text-sm text-gray-700 hover:text-emerald-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    路線徵選活動
                  </Link>
                </div>
              </div>
              <Link
                href="#prizes"
                className="block text-sm font-medium hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                抽獎資訊
              </Link>
              <Link
                href="#partners"
                className="block text-sm font-medium hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                合作店家
              </Link>
              <Link
                href="#faq"
                className="block text-sm font-medium hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                常見問題
              </Link>
              <Link
                href="#contact"
                className="block text-sm font-medium hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                聯絡資訊
              </Link>
              <Button
                className="w-full border border-emerald-600 text-emerald-600 rounded-full mb-2 bg-white hover:bg-emerald-600 hover:text-white"
                variant="outline"
                onClick={() => window.open("https://www.marathonsworld.com/product/online_marathon/5/agreement.php?rid=358&", "_blank")}
              >
                個人報名
              </Button>
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full"
                onClick={() => window.open("https://www.marathonsworld.com/product/online_marathon/5/agreement.php?rid=368&", "_blank")}
              >
                團體報名
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 英雄區塊 */}
        <section
          className="relative w-full min-h-[400px] md:min-h-[900px] flex items-center justify-center bg-emerald-50 bg-cover bg-center"
          style={{ backgroundImage: "url(/demorungame/images/Hero_bg.png)" }}
        >
          <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-center">
            {/* 文字區塊 */}
            <div className="flex flex-col justify-center items-center w-full max-w-xl mx-auto text-center py-16 md:py-24 lg:hidden">
              <div className="flex flex-col gap-2 min-[400px]:flex-row md:flex-row">
                <Button
                  className="border border-emerald-600 text-emerald-600 rounded-full bg-white hover:bg-emerald-600 hover:text-white px-6 py-2"
                  variant="outline"
                  onClick={() => window.open("https://www.marathonsworld.com/product/online_marathon/5/agreement.php?rid=358&", "_blank")}
                >
                  個人報名
                </Button>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-2"
                  onClick={() => window.open("https://www.marathonsworld.com/product/online_marathon/5/agreement.php?rid=368&", "_blank")}
                >
                  團體報名
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 活動成果統計 */}
        <section id="statistics" className="w-full py-8 md:py-12 lg:py-16 bg-emerald-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  活動數據
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">活動成果統計</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">挑戰活動的每日統計數據</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-6 grid-cols-2 lg:grid-cols-5">
              {[
                {
                  icon: <Users className="h-10 w-10 text-emerald-500" />,
                  value: "4854",
                  label: "活動參加人數",
                  unit: "人",
                },
                {
                  icon: <ClipboardList className="h-10 w-10 text-emerald-500" />,
                  value: "203104",
                  label: "總記錄次數",
                  unit: "筆",
                },
                {
                  icon: <Clock className="h-10 w-10 text-emerald-500" />,
                  value: "140809",
                  label: "總活動時間",
                  unit: "小時",
                },
                {
                  icon: <Footprints className="h-10 w-10 text-emerald-500" />,
                  value: "1559641347",
                  label: "運動步數",
                  unit: "步",
                },
                {
                  icon: <Route className="h-10 w-10 text-emerald-500" />,
                  value: "1070646",
                  label: "總里程",
                  unit: "公里",
                },
              ].map((stat, index) => (
                <div
                  key={`stat-${index}`}
                  className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl border bg-card shadow-sm"
                >
                  <div className="p-2 rounded-full bg-emerald-50">{stat.icon}</div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">
                      {stat.value}
                      <span className="text-lg ml-1 text-muted-foreground">{stat.unit}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 排行榜 */}
        <section id="leaderboard" className="w-full py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  競賽榜單
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">排行榜</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">查看個人和團隊的最新排名</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-6 md:grid-cols-3">
              {[
                {
                  title: "個人里程排行",
                  icon: <Route className="h-6 w-6 text-emerald-500" />,
                  rankings: [
                    { rank: 1, name: "王小明", value: "325 公里" },
                    { rank: 2, name: "李大華", value: "298 公里" },
                    { rank: 3, name: "張美玲", value: "276 公里" },
                    { rank: 4, name: "陳志明", value: "254 公里" },
                    { rank: 5, name: "林小芳", value: "231 公里" },
                  ],
                },
                {
                  title: "個人步數排行",
                  icon: <Footprints className="h-6 w-6 text-emerald-500" />,
                  rankings: [
                    { rank: 1, name: "陳大明", value: "458,325 步" },
                    { rank: 2, name: "林小華", value: "421,298 步" },
                    { rank: 3, name: "王美玲", value: "398,276 步" },
                    { rank: 4, name: "張志明", value: "376,254 步" },
                    { rank: 5, name: "李小芳", value: "352,231 步" },
                  ],
                },
                {
                  title: "團隊排行",
                  icon: <Users className="h-6 w-6 text-emerald-500" />,
                  rankings: [
                    { rank: 1, name: "跑跑先鋒隊", value: "1,325 公里" },
                    { rank: 2, name: "風馳電掣", value: "1,198 公里" },
                    { rank: 3, name: "健康衝刺", value: "1,076 公里" },
                    { rank: 4, name: "活力四射", value: "954 公里" },
                    { rank: 5, name: "夢想起跑", value: "831 公里" },
                  ],
                },
              ].map((category, index) => {
                // 根據 index 指定不同的連結
                let link = "#"
                if (index === 0) link = "https://www.marathonsworld.com/ExploreKaohsiung/ranking.php?type=1"
                if (index === 1) link = "https://www.marathonsworld.com/ExploreKaohsiung/ranking.php?type=2"
                if (index === 2) link = "https://www.marathonsworld.com/ExploreKaohsiung/ranking.php?type=3"
                return (
                  <div key={`category-${index}`} className="flex flex-col space-y-4 p-6 rounded-xl border bg-card shadow-sm">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.rankings.map((item) => (
                        <div key={`ranking-${item.rank}`} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                item.rank === 1
                                  ? "bg-yellow-500"
                                  : item.rank === 2
                                    ? "bg-gray-400"
                                    : item.rank === 3
                                      ? "bg-amber-700"
                                      : "bg-gray-200"
                              } text-white font-bold`}
                            >
                              {item.rank}
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-2 w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    >
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        查看更多
                        <PointingHand className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 活動說明 */}
        <section id="how-to-join" className="w-full py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  活動說明
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">如何參與並贏取獎品</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  簡單三步驟，開始您的跑步徽章收集之旅
                </p>
              </div>
            </div>

            {/* 三步驟流程 */}
            <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 py-6">
              {[
                {
                  step: "step 1",
                  icon: <UserPlus className="h-10 w-10 text-emerald-500" />,
                  title: "選擇個人或團體報名",
                  description: "APP內與此頁面皆可報名",
                },
                {
                  step: "step 2",
                  icon: <Smartphone className="h-10 w-10 text-emerald-500" />,
                  title: "開始跑步收集徽章",
                  description: "使用我們的APP或上傳紀錄皆可以",
                },
                {
                  step: "step 3",
                  icon: <Medal className="h-10 w-10 text-emerald-500" />,
                  title: "收集徽章獲得抽獎券",
                  description: "不同任務勳章提供相對應抽獎券",
                },
              ].map((step, index, arr) => (
                <React.Fragment key={step.step || index}>
                  <div className="flex flex-col items-center text-center space-y-2 p-2">
                    <div className="p-2 rounded-full bg-emerald-50">{step.icon}</div>
                    <span className="text-xs text-emerald-600 mb-1">{step.step}</span>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < arr.length - 1 && <ArrowRight className="h-6 w-6 text-emerald-400 mx-1 shrink-0" />}
                </React.Fragment>
              ))}
            </div>

            {/* 報名方式說明 */}
            <div id="signup-section" className="mx-auto max-w-5xl py-4">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl border bg-card shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-emerald-50">
                      <UserPlus className="h-6 w-6 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold">個人報名</h3>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        下載馬拉松世界App並登入帳號後，可於<span className="font-medium">個人首頁</span>
                        ＞「高雄智慧走跑2.0活動專​區」報名活動。
                      </li>
                      <li>或是點擊下方報名按鈕報名參加。</li>
                    </ul>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 mt-auto"
                          onClick={() => window.open("https://www.marathonsworld.com/product/online_marathon/5/agreement.php?rid=358&", "_blank")}>
                    立即報名去
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="p-6 rounded-xl border bg-card shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-emerald-50">
                      <UsersRound className="h-6 w-6 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold">團體報名</h3>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        隊員登錄方式：以企業/跑團為單位，每個單位人數上限 11人，由團長統一登錄所有團員之馬拉松世界
                        ID，即可​透過團隊累積里程數進行排名。累積里程越高，排名越前面。
                      </li>
                      <li>
                        排名計算機制：排行榜每週取前三名，週冠軍隊伍每人可獲得一枚「團隊金牌勳章」等同於 3
                        張抽獎券；第二名​隊伍每人可獲得一枚「團隊銀牌勳章」等同於 2
                        張抽獎券；第三名隊伍每人可獲得一枚「團隊銅​牌勳章」等同於 1 張抽獎券。
                      </li>
                      <li>計算時間：每週一開始計算至當週日。隔週里程歸零重新計算。</li>
                      <li>第一週將從 3/3 開始。</li>
                    </ul>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-auto"
                            onClick={() => window.open("https://www.marathonsworld.com/product/online_marathon/5/agreement.php?rid=368&", "_blank")}>
                      立即報名去
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 詳細說明 */}
            <div className="mx-auto max-w-5xl py-4">
              <div className="rounded-xl border bg-slate-50 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-emerald-500" />
                  詳細說明活動方式
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="p-2 h-fit rounded-full bg-emerald-100">
                      <ListChecks className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">任務勳章</h4>
                      <p className="text-sm text-muted-foreground">
                        每一項走跑任務皆設有相對應之勳章，完成任務即可獲得。
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-2 h-fit rounded-full bg-emerald-100">
                      <Ticket className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">抽獎券</h4>
                      <p className="text-sm text-muted-foreground">
                        每一個任務勳章提供相對應抽獎券，藉由走跑活動的進行可以累積越多抽獎券，中獎機率也越高。每張抽獎券皆有序號，抽出獎項後，除了公告得獎序號之外，也將主動寄發獲獎通知信給得獎者。每抽到一個獎項，就會扣除一張抽獎券，其餘繼續累積至下一次抽獎使用。
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-2 h-fit rounded-full bg-emerald-100">
                      <Upload className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">如何記錄</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        跑友可以使用以下任一方式，上傳紀錄至馬拉松世界網站：
                      </p>
                      <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                        <li>
                          <span className="font-medium">使用馬拉松世界 App</span>（支援
                          iPhone、Android），只要下載馬拉松世界
                          App，跑完紀錄就會自動上傳。假如，當場沒有網路，回到可以上網的地方，打開 App 就會自動上傳資料。
                        </li>
                        <li>
                          <span className="font-medium">使用 Garmin 手錶 / Strava 同步</span>
                          ，若之前沒有開啟過同步功能，請於活動上傳資料前，事先將同步功能設定開啟，同步 Garmin/Strava
                          資料方式：至 App 點選右下角更多 &gt; 選 Garmin Connect 或 Strava &gt; 點選同步 Garmin Connect
                          或 Strava，並輸入 Garmin Connect 或 Strava 帳號，（點選後畫面會變為停止同步 Garmin Connect 或
                          Strava）確認與 Garmin Connect 或 Strava 連接成功後，待您上傳新的紀錄至 Garmin Connect 或
                          Strava，馬拉松世界同時也會上傳您的紀錄。
                        </li>
                        <li>
                          <span className="font-medium">Apple Watch 同步功能</span>：在 App 更多頁面，點選 Apple Watch
                          按鈕，然後開啟同步功能即可。
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 徽章收集 */}
        <section id="badges" className="w-full py-8 md:py-12 lg:py-16 bg-emerald-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  開始挑戰任務
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">任務與徽章說明</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  完成不同的任務，獲取徽章與抽獎券，增加中獎機率！
                </p>
              </div>
            </div>
            {/* 在徽章部分替換為 */}
            <div className="mx-auto grid max-w-5xl gap-6 py-6 md:grid-cols-2 lg:grid-cols-4">
              {BADGES_DATA.map((badge, index) => (
                <BadgeCard key={index} badge={badge} />
              ))}
            </div>
          </div>
        </section>

        {/* 24景點地圖 */}
        <section id="spots" className="w-full py-8 md:py-12 lg:py-16 bg-emerald-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  景點一覽
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">24景點走跑地圖</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  探索高雄各區精選景點，完成走跑挑戰
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* 左側地圖 */}
                <div className="relative h-full w-full rounded-lg overflow-hidden order-2 lg:order-1">
                  <a
                    href="https://www.marathonsworld.com/ExploreKaohsiung/images/kaohsiung_24_map.png"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="https://www.marathonsworld.com/ExploreKaohsiung/images/kaohsiung_24_map.png"
                      alt="高雄24景點走跑地圖"
                      fill
                      priority
                      className="object-contain"
                    />
                    <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-md text-xs text-gray-700">
                      點擊查看大圖
                    </div>
                  </a>
                </div>

                {/* 右側標籤頁 */}
                <div className="order-1 lg:order-2">
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-4">
                      <TabsTrigger value="all">全部景點</TabsTrigger>
                      <TabsTrigger value="north">北高雄</TabsTrigger>
                      <TabsTrigger value="central">中高雄</TabsTrigger>
                      <TabsTrigger value="east">東高雄</TabsTrigger>
                      <TabsTrigger value="south">南高雄</TabsTrigger>
                    </TabsList>

                    {/* 在景點部分替換為 */}
                    <TabsContent value="all" className="mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                        {SPOTS_DATA.map((spot) => (
                          <SpotCard key={spot.id} spot={spot} />
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="north" className="mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                        {NORTH_SPOTS.map((spot) => (
                          <SpotCard key={spot.id} spot={spot} />
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="central" className="mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                        {CENTRAL_SPOTS.map((spot) => (
                          <SpotCard key={spot.id} spot={spot} />
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="east" className="mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                        {EAST_SPOTS.map((spot) => (
                          <SpotCard key={spot.id} spot={spot} />
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="south" className="mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                        {SOUTH_SPOTS.map((spot) => (
                          <SpotCard key={spot.id} spot={spot} />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* 景點勳章分級制 */}
              <div className="mt-16">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold">景點勳章分級制</h3>
                  <p className="text-muted-foreground mt-2">
                    蒐集越多「景點特色勳章」分級越高，不同分級也將對應至不同抽獎品項
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    {
                      level: "青銅等級",
                      range: "0-5",
                      color: "bg-amber-700",
                      icon: <Medal className="h-8 w-8 text-white" />,
                      borderColor: "border-amber-700",
                    },
                    {
                      level: "白銀等級",
                      range: "6-11",
                      color: "bg-gray-400",
                      icon: <Medal className="h-8 w-8 text-white" />,
                      borderColor: "border-gray-400",
                    },
                    {
                      level: "黃金等級",
                      range: "12-17",
                      color: "bg-yellow-500",
                      icon: <Medal className="h-8 w-8 text-white" />,
                      borderColor: "border-yellow-500",
                    },
                    {
                      level: "藍寶石等級",
                      range: "18-23",
                      color: "bg-blue-600",
                      icon: <Medal className="h-8 w-8 text-white" />,
                      borderColor: "border-blue-600",
                    },
                    {
                      level: "鑽石等級",
                      range: "24",
                      color: "bg-teal-500",
                      icon: <Trophy className="h-8 w-8 text-white" />,
                      borderColor: "border-teal-500",
                    },
                  ].map((rank, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border-2 ${rank.borderColor} p-4 flex flex-col items-center text-center hover:shadow-md transition-all`}
                    >
                      <div className={`${rank.color} w-16 h-16 rounded-full flex items-center justify-center mb-3`}>
                        {rank.icon}
                      </div>
                      <h4 className="font-bold text-lg mb-1">{rank.level}</h4>
                      <div className="text-sm text-muted-foreground">
                        蒐集
                        <span className="font-semibold text-black mx-1">{rank.range}</span>
                        個不同的景點勳章
                      </div>
                      <div className="mt-3 flex">
                        {Array.from({
                          length: Math.min(5, Number.parseInt(rank.range.split("-")[1] || rank.range)),
                        }).map((_, i) => (
                          <div
                            key={`progress-${i}`}
                            className={`w-4 h-4 rounded-full ${
                              i < Number.parseInt(rank.range.split("-")[0]) ? rank.color : "bg-gray-200"
                            } mx-0.5`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 路線徵選活動 */}
        <section id="routes" className="w-full py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  創意路線
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">路線徵選活動</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  分享您的創意路線，贏取豐富獎品並啟發其他跑者
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl py-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="rounded-xl border p-6 bg-card shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Route className="h-5 w-5 mr-2 text-emerald-500" />
                      徵選方式
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      2/27-3/30於馬拉松世界APP上傳走跑數據，並在此筆數據中的編輯敘述欄位打上
                      <span className="font-semibold text-emerald-600">#走跑高雄創意路線徵選</span>，儲存後即投稿成功。
                    </p>
                    <p className="text-sm text-gray-600">
                      跑者投稿跑步路線GPX，前20名上傳創意路線(依照時間) 可獲得
                      <span className="font-semibold">200 元超商禮券</span>。
                    </p>
                  </div>

                  <div className="rounded-xl border p-6 bg-card shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-emerald-500" />
                      評選
                    </h3>
                    <p className="text-sm text-gray-600">
                      4/1 由馬拉松世界評選並公告 5 條最具創意的路線，獲選者可獲得
                      <span className="font-semibold">MiiR 20oz VI WM BOTTLE 雙層真空保溫/保冰保溫瓶</span>
                      乙件（價值 1,480$）
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Image
                          src="https://cdn.store-assets.com/s/737785/i/50148867.jpeg?width=1024"
                          width={100}
                          height={100}
                          alt="MiiR保溫瓶"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border p-6 bg-card shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-emerald-500" />
                      路線模仿任務
                    </h3>
                    <p className="text-sm text-gray-600">
                      5 條最具創意路線將開放 GPX 地圖下載，民眾可依照路線進行跑走模仿任務，完成 1 條路線​即可獲得 1
                      枚「路線勳章」，相對應獲得 1 張抽獎券。
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      src="https://loosedrawing.com/assets/media/illustrations/png/701.png"
                      width={400}
                      height={500}
                      alt="創意路線示意圖"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 獎品資訊 */}
        <section id="prizes" className="w-full py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  獎品資訊
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">抽獎資訊</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  收集的徽章越多，抽中大獎的機會越高！
                </p>
              </div>
            </div>

            {/* 主要獎品區塊：左右兩欄 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 左側：週週抽獎 */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-emerald-700">週週抽獎項規劃（共14週）</h3>
                <div className="overflow-x-auto rounded-lg shadow">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-emerald-50">
                      <tr>
                        <th className="px-4 py-2 border-b text-emerald-800 font-semibold">週數</th>
                        <th className="px-4 py-2 border-b text-emerald-800 font-semibold">獲獎名單公告</th>
                        <th className="px-4 py-2 border-b text-emerald-800 font-semibold">獎項規劃</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 1~2週合併列 */}
                      <tr>
                        <td className="px-4 py-2 border-b text-center" rowSpan={2}>
                          1~2
                        </td>
                        <td className="px-4 py-2 border-b text-center">
                          3/10
                          <a
                            href="https://www.marathonsworld.com/ExploreKaohsiung/raffle_list.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-block text-base px-4 py-1 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                          >
                            獲獎名單
                          </a>
                        </td>
                        <td className="px-4 py-2 border-b" rowSpan={2}>
                          <ul className="list-disc list-inside text-left space-y-1">
                            <li>40 張超商禮券（面額100元）</li>
                            <li>50 位高雄幣（面額100元）</li>
                            <li>50 杯超商咖啡</li>
                            <li>2 個環保餐具</li>
                            <li>2 個保溫瓶</li>
                            <li>2 盒乳清蛋白</li>
                            <li>2 盒燕麥棒</li>
                            <li>2 盒水動能</li>
                            <li>1 支太陽眼鏡</li>
                            <li>1 台體脂計</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b text-center">
                          3/17
                          <a
                            href="https://www.marathonsworld.com/ExploreKaohsiung/raffle_list_new.php?week=2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-block text-base px-4 py-1 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                          >
                            獲獎名單
                          </a>
                        </td>
                      </tr>
                      {/* 3~6週 */}
                      <tr>
                        <td className="px-4 py-2 border-b text-center">3~6</td>
                        <td className="px-4 py-2 border-b text-center">3/24、3/31、4/7、4/14 獲獎名單</td>
                        <td className="px-4 py-2 border-b">
                          <ul className="list-disc list-inside text-left space-y-1">
                            <li>40 張超商禮券（面額100元）</li>
                            <li>5 位活動襪（面額100元）</li>
                            <li>50 杯超商咖啡</li>
                            <li>2 個保溫杯具</li>
                            <li>2 個運動水壺</li>
                            <li>2 盒乳清蛋白</li>
                            <li>2 盒冰敷貼</li>
                            <li>1 支太太腳踏車</li>
                            <li>1 台合體腳踏車</li>
                          </ul>
                        </td>
                      </tr>
                      {/* 7~14週（依圖片內容繼續補齊） */}
                      <tr>
                        <td className="px-4 py-2 border-b text-center">7</td>
                        <td className="px-4 py-2 border-b text-center">4/21 獲獎名單</td>
                        <td className="px-4 py-2 border-b">
                          <ul className="list-disc list-inside text-left space-y-1">
                            <li>40 張超商禮券（面額100元）</li>
                            <li>50 位活動襪（面額100元）</li>
                            <li>50 杯超商咖啡</li>
                            <li>2 個保溫杯具</li>
                            <li>2 個運動水壺</li>
                            <li>2 盒乳清蛋白</li>
                            <li>2 盒冰敷貼</li>
                            <li>1 台合體腳踏車</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b text-center">8</td>
                        <td className="px-4 py-2 border-b text-center">4/28</td>
                        <td className="px-4 py-2 border-b">
                          <ul className="list-disc list-inside text-left space-y-1">
                            <li>50 杯超商咖啡</li>
                            <li>2 個保溫杯具</li>
                            <li>2 個運動水壺</li>
                            <li>2 盒乳清蛋白</li>
                            <li>2 盒冰敷貼</li>
                            <li>1 台合體腳踏車</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b text-center">9</td>
                        <td className="px-4 py-2 border-b text-center">5/5</td>
                        <td className="px-4 py-2 border-b">
                          <ul className="list-disc list-inside text-left space-y-1">
                            <li>50 杯超商咖啡</li>
                            <li>2 個保溫杯具</li>
                            <li>2 個運動水壺</li>
                            <li>2 盒乳清蛋白</li>
                            <li>2 盒冰敷貼</li>
                            <li>1 台合體腳踏車</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b text-center">10</td>
                        <td className="px-4 py-2 border-b text-center">5/12</td>
                        <td className="px-4 py-2 border-b">
                          <ul className="list-disc list-inside text-left space-y-1">
                            <li>2 盒乳清蛋白</li>
                            <li>2 盒冰敷貼</li>
                            <li>1 台合體腳踏車</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b text-center">11</td>
                        <td className="px-4 py-2 border-b text-center">5/19</td>
                        <td className="px-4 py-2 border-b">
                          <ul className="list-disc list-inside text-left space-y-1">
                            <li>2 盒乳清蛋白</li>
                            <li>2 盒冰敷貼</li>
                            <li>1 台合體腳踏車</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b text-center">12</td>
                        <td className="px-4 py-2 border-b text-center">5/26</td>
                        <td className="px-4 py-2 border-b">
                          <ul className="list-disc list-inside text-left space-y-1">
                            <li>2 盒乳清蛋白</li>
                            <li>2 盒冰敷貼</li>
                            <li>1 個運動後背包</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b text-center">13</td>
                        <td className="px-4 py-2 border-b text-center">6/2</td>
                        <td className="px-4 py-2 border-b">
                          <ul className="list-disc list-inside text-left space-y-1">
                            <li>40 張超商禮券（面額100元）</li>
                            <li>50 位活動襪（面額100元）</li>
                            <li>50 杯超商咖啡</li>
                            <li>2 個保溫杯具</li>
                            <li>2 個運動水壺</li>
                            <li>2 盒乳清蛋白</li>
                            <li>2 盒冰敷貼</li>
                            <li>1 台合體腳踏車</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b text-center">14</td>
                        <td className="px-4 py-2 border-b text-center">6/9</td>
                        <td className="px-4 py-2 border-b">
                          <ul className="list-disc list-inside text-left space-y-1">
                            <li>2 盒乳清蛋白</li>
                            <li>2 盒冰敷貼</li>
                            <li>1 個運動後背包</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 右側：三個表格直向排列 */}
              <div className="flex flex-col gap-8">
                {/* 月月抽獎 */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-emerald-700">月月抽獎項規劃（共3月份）</h3>
                  <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead className="bg-emerald-50">
                        <tr>
                          <th className="px-4 py-2 border-b text-emerald-800 font-semibold">編號</th>
                          <th className="px-4 py-2 border-b text-emerald-800 font-semibold">獲獎名單公告</th>
                          <th className="px-4 py-2 border-b text-emerald-800 font-semibold">獎項規劃</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border-b text-center">1</td>
                          <td className="px-4 py-2 border-b text-center">4/2 獲獎名單</td>
                          <td className="px-4 py-2 border-b">
                            <ul className="list-disc list-inside text-left space-y-1">
                              <li>1 支 Garmin Forerunner 265</li>
                              <li>1 支 APPLE WATCH</li>
                              <li>1 支運動耳機</li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b text-center">2</td>
                          <td className="px-4 py-2 border-b text-center">5/2</td>
                          <td className="px-4 py-2 border-b">
                            <ul className="list-disc list-inside text-left space-y-1">
                              <li>1 支 Garmin Forerunner 965</li>
                              <li>1 支 APPLE WATCH</li>
                              <li>1 支運動耳機</li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 壓軸大獎 */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-emerald-700">壓軸大獎（共3月份）</h3>
                  <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead className="bg-emerald-50">
                        <tr>
                          <th className="px-4 py-2 border-b text-emerald-800 font-semibold">編號</th>
                          <th className="px-4 py-2 border-b text-emerald-800 font-semibold">獲獎名單公告</th>
                          <th className="px-4 py-2 border-b text-emerald-800 font-semibold">獎項規劃</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border-b text-center">1</td>
                          <td className="px-4 py-2 border-b text-center">6/2</td>
                          <td className="px-4 py-2 border-b">
                            <ul className="list-disc list-inside text-left space-y-1">
                              <li>壓軸獎 1 台 Gogoro</li>
                              <li>真獎 1 台 iPhone 16 Pro 128G</li>
                              <li>參獎 1 支 Garmin Forerunner 965</li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 景點等級抽獎 */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-emerald-700">景點等級抽獎</h3>
                  <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead className="bg-emerald-50">
                        <tr>
                          <th className="px-4 py-2 border-b text-emerald-800 font-semibold">編號</th>
                          <th className="px-4 py-2 border-b text-emerald-800 font-semibold">等級</th>
                          <th className="px-4 py-2 border-b text-emerald-800 font-semibold">獲獎名單公告</th>
                          <th className="px-4 py-2 border-b text-emerald-800 font-semibold">獎項規劃</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border-b text-center">1</td>
                          <td className="px-4 py-2 border-b text-center">
                            <span className="inline-block px-2 py-1 rounded-full bg-amber-700 text-white">青銅</span>
                          </td>
                          <td className="px-4 py-2 border-b text-center">6/12</td>
                          <td className="px-4 py-2 border-b">100 杯超商咖啡</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b text-center">2</td>
                          <td className="px-4 py-2 border-b text-center">
                            <span className="inline-block px-2 py-1 rounded-full bg-gray-400 text-white">白銀</span>
                          </td>
                          <td className="px-4 py-2 border-b text-center">6/12</td>
                          <td className="px-4 py-2 border-b">90 位活動襪（面額100元）</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b text-center">3</td>
                          <td className="px-4 py-2 border-b text-center">
                            <span className="inline-block px-2 py-1 rounded-full bg-yellow-500 text-white">黃金</span>
                          </td>
                          <td className="px-4 py-2 border-b text-center">6/12</td>
                          <td className="px-4 py-2 border-b">3 支運動耳機</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b text-center">4</td>
                          <td className="px-4 py-2 border-b text-center">
                            <span className="inline-block px-2 py-1 rounded-full bg-blue-600 text-white">藍寶石</span>
                          </td>
                          <td className="px-4 py-2 border-b text-center">6/12</td>
                          <td className="px-4 py-2 border-b">1 支 Garmin Forerunner 965</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b text-center">5</td>
                          <td className="px-4 py-2 border-b text-center">
                            <span className="inline-block px-2 py-1 rounded-full bg-teal-500 text-white">鑽石</span>
                          </td>
                          <td className="px-4 py-2 border-b text-center">6/12</td>
                          <td className="px-4 py-2 border-b">1 台 iPad Air 128G</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 合作店家 */}
        <section id="partners" className="w-full py-8 md:py-12 lg:py-16 bg-emerald-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  合作店家
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">合作店家</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  完成指定任務即可獲得以下合作商店的專屬優惠
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl gap-8 py-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "迷路麋鹿 糖藝鋪",
                  type: "健康餐飲",
                  discount: "30元商品折價券、花生捲冰淇淋兌換券",
                  address: "高雄市旗山區永平街34-30號",
                  image: "https://mmww.my.canva.site/daggrtt5ubs/_assets/media/d613534ebe1a907b7f06721b1d432461.jpg",
                },
                {
                  name: "裕賀牛觀光工廠",
                  type: "參觀工廠",
                  discount: "免門票入場+免費可樂機飲料一杯",
                  address: "高雄市燕巢區大仁路68號",
                  image: "https://mmww.my.canva.site/daggrtt5ubs/_assets/media/4f03307e4905a4296d080958816a53af.jpg",
                },
                {
                  name: "Muku Gym 慕谷健身房",
                  type: "健身房",
                  discount: "單堂課程體驗券、單次自主訓練券",
                  address: "高雄市左營區新庄仔路395號",
                  image: "https://mmww.my.canva.site/daggrtt5ubs/_assets/media/44a70cfc7d5d30f7a1fd18345186d93e.jpg",
                },
                {
                  name: "樂騎租車",
                  type: "租車商家",
                  discount: "租兩個小時送半個小時",
                  address: "高雄市旗津區海岸路9號",
                  image: "https://mmww.my.canva.site/daggrtt5ubs/_assets/media/fe5d2e4c0e4c7f95f11e2d466f804c16.jpg",
                },
              ].map((store, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col space-y-4 rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-square w-full relative rounded-lg overflow-hidden bg-slate-100">
                    <Image
                      src={store.image || "/placeholder.svg"}
                      alt={store.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">{store.type}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-emerald-500" />
                      <span className="font-medium text-emerald-600">{store.discount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-muted-foreground">{store.address}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
              >
                載入更多
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* 常見問題 */}
        <section id="faq" className="w-full py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  有疑問嗎？
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">常見Q&A</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">以下是您可能有的疑問</p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-6">
              {[
                {
                  question: "如何記錄我的跑步資料？",
                  answer:
                    "您可以使用我們的官方APP（馬拉松世界）或連結您常用的跑步APP（如Strava、Garmin、Apple watch等）來同步記錄您的跑步活動。",
                },
                {
                  question: "徽章會過期嗎？",
                  answer: "不會，一旦您獲得徽章，它將永久保存在您的帳戶中。您可以隨時查看和展示您的徽章收藏。",
                },
                {
                  question: "抽獎何時進行？",
                  answer: "每週都將進行抽獎，詳情請看「抽獎資訊」，獲獎名單會同步公告在抽獎資訊裡面。",
                },
                {
                  question: "我可以參加多個挑戰嗎？",
                  answer: "是的，您可以同時參加多個挑戰。實際上，您收集的徽章越多能獲得的抽獎券越多，獲獎機會越大唷！",
                },
                {
                  question: "如果我有其他問題，如何聯繫主辦方？",
                  answer: "您可以通過電子郵件 serivce@bravelog.tw 或撥打客服熱線 02-77046335 聯繫活動窗口 黎彥妏小姐。",
                },
              ].map((faq, index) => (
                <FaqItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* 聯繫資訊 */}
        <section id="contact" className="w-full py-8 md:py-12 lg:py-16 bg-emerald-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  聯繫資訊
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">活動聯繫方式</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">如有任何問題，歡迎聯繫我們</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-6 md:grid-cols-2 items-stretch">
              <div className="space-y-6 h-full"> {/* 左側卡片 */}
                <div className="rounded-xl border p-6 bg-white shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Building2 className="h-5 w-5 text-emerald-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">主辦單位</h3>
                        <p className="text-muted-foreground">高雄市政府運動發展局</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Building className="h-5 w-5 text-emerald-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">執行單位</h3>
                        <p className="text-muted-foreground">博威運動科技公司</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Smartphone className="h-5 w-5 text-emerald-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">活動APP</h3>
                        <p className="text-muted-foreground">馬拉松世界</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <HeadphonesIcon className="h-5 w-5 text-emerald-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">活動諮詢窗口</h3>
                        <p className="text-muted-foreground">黎彥妏小姐</p>
                        <p className="text-muted-foreground">02-77046335</p>
                        <a href="mailto:serivce@bravelog.tw" className="text-emerald-600 hover:text-emerald-700">
                          serivce@bravelog.tw
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border overflow-hidden shadow-sm h-[400px] h-full"> {/* 右側地圖 */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.662373078722!2d120.30099731541928!3d22.63807398513867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e0491b7f6e4a9%3A0x4a9f6bd9cac91373!2z6auY6ZuE5biC5pS_5bqc6YOo!5e0!3m2!1szh-TW!2stw!4v1647916715612!5m2!1szh-TW!2stw!4v1647916715612"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 頁尾 */}
      <footer className="w-full border-t bg-slate-50 py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Footprints className="h-5 w-5 text-emerald-500" />
            <span className="text-lg font-semibold">走跑高雄2.0</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()}走跑高雄2.0挑戰活動. 保留所有權利.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-emerald-500">
              隱私政策
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-emerald-500">
              使用條款
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-emerald-500">
              聯繫我們
            </Link>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </div>
  )
}

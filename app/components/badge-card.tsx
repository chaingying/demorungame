"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, HandIcon as PointingHand } from "lucide-react"

interface BadgeProps {
  badge: {
    id: number
    name: string
    description: string
    color: string
    note: string | string[]
    image: string
    ticket: string
  }
}

export default function BadgeCard({ badge }: BadgeProps) {
  const showButton = [3, 4, 7, 11].includes(badge.id)

  return (
    <div className="flex flex-row items-stretch p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow space-y-0 space-x-0 sm:flex-col sm:items-center sm:space-y-3 sm:space-x-0 mb-2">
      {/* 左欄：圖片、名稱、ticket */}
      <div className="flex flex-col items-center justify-center w-1/2 sm:w-full sm:mb-0 mb-0">
        <div className="w-20 h-20 flex items-center justify-center mx-auto">
          <Image
            src={badge.image || "/placeholder.svg"}
            alt={badge.name}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <h3 className="text-base font-bold mt-2 text-center">{badge.name}</h3>
        <div className="inline-block mt-1 mb-1 px-3 py-0.5 text-xs rounded-full border border-emerald-500 text-emerald-600 bg-white select-none pointer-events-none">
          {badge.ticket}
        </div>
      </div>
      {/* 右欄：描述、note、按鈕 */}
      <div className="flex flex-col justify-between w-1/2 sm:w-full pl-4 sm:pl-0">
        <div>
          <p className="text-xs text-muted-foreground text-justify tracking-tight mb-2">{badge.description}</p>
          <ul className="list-disc list-inside text-xs text-muted-foreground text-left text-justify tracking-tight mb-2">
            {Array.isArray(badge.note) ? (
              badge.note.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>{badge.note}</li>
            )}
          </ul>
        </div>
        {/* 只顯示 id 3, 4, 7, 11 的按鈕 */}
        {showButton &&
          (badge.id === 3 ? (
            <div className="mt-auto">
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                onClick={() => {
                  document.getElementById("spots")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                24景點路線
                <PointingHand className="h-4 w-4" />
              </Button>
            </div>
          ) : badge.id === 4 ? (
            <div className="mt-auto">
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                onClick={() => {
                  document.getElementById("badge-mountain-modal")?.showModal()
                }}
              >
                登山勳章地點
                <PointingHand className="h-4 w-4" />
              </Button>
              <dialog
                id="badge-mountain-modal"
                className="modal modal-bottom sm:modal-middle rounded-lg p-0 w-full max-w-md mx-auto"
              >
                <div className="bg-white rounded-lg overflow-hidden relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 z-10"
                    onClick={() => {
                      document.getElementById("badge-mountain-modal")?.close()
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <div className="p-8 flex justify-center">
                    <Image
                      src={badge.image || "/placeholder.svg"}
                      alt={badge.name}
                      width={180}
                      height={180}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">登山勳章地點</h3>
                    <div className="mb-4 pb-4 border-b">
                      <ul className="list-disc list-inside text-base text-gray-700 text-justify tracking-tight space-y-1">
                        <li>旗尾山</li>
                        <li>大岡山</li>
                        <li>壽山(好漢亭)</li>
                        <li>觀音山</li>
                        <li>刣牛湖山</li>
                        <li>鳴海山</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          ) : badge.id === 7 ? (
            <div className="mt-auto">
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                onClick={() => {
                  document.getElementById("routes")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                查看路線徵選
                <PointingHand className="h-4 w-4" />
              </Button>
            </div>
          ) : badge.id === 11 ? (
            <div className="mt-auto">
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                onClick={() => {
                  document.getElementById("badge-race-modal")?.showModal()
                }}
              >
                指定賽事場次
                <PointingHand className="h-4 w-4" />
              </Button>
              <dialog
                id="badge-race-modal"
                className="modal modal-bottom sm:modal-middle rounded-lg p-0 w-full max-w-md mx-auto"
              >
                <div className="bg-white rounded-lg overflow-hidden relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 z-10"
                    onClick={() => {
                      document.getElementById("badge-race-modal")?.close()
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <div className="p-8 flex justify-center">
                    <Image
                      src={badge.image || "/placeholder.svg"}
                      alt={badge.name}
                      width={180}
                      height={180}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">指定賽事場次</h3>
                    <div className="mb-4 pb-4 border-b">
                      <ul className="list-decimal list-inside text-base text-gray-700 text-justify tracking-tight space-y-1">
                        <li>(3/16)2025 鳳山跑三校越野馬拉松</li>
                        <li>(3/23)2025 第十屆匠愛家園公益路跑</li>
                        <li>(4/13)2025 軍事障礙硬地山林跑</li>
                        <li>(4/20)2025 RUN FOR FUTURE 第四屆順發x港都公益路跑</li>
                        <li>(4/26)2025 柯南推理冒險路跑活動-高雄場</li>
                        <li>(5/4)2025 ZEPRO RUN 全國半程馬拉松 - 高雄場</li>
                        <li>(5/10)2025 排球少年社員徵選路跑-高雄場</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          ) : null)}
      </div>
    </div>
  )
}

export const SPOTS_DATA = [
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

export const NORTH_SPOTS = SPOTS_DATA.filter((spot) => [2, 9, 10, 21, 24].includes(spot.id))
export const CENTRAL_SPOTS = SPOTS_DATA.filter((spot) => [12, 16, 19, 20].includes(spot.id))
export const EAST_SPOTS = SPOTS_DATA.filter((spot) => [4, 17, 22].includes(spot.id))
export const SOUTH_SPOTS = SPOTS_DATA.filter((spot) => [18].includes(spot.id)) 
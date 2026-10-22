/* Sample records for the direction pages only. The owner supplied no tours, so
   these are in the shape the brief describes — one travel product, the dates its
   supplier set, full-day slots — priced in yen. Deleted with these pages. */

export type Tour = {
  id: string;
  place: string;
  name: string;
  operator: string;
  price: number;
  hours: string;
  photo?: string;
  focal?: string;
};

export const yen = (n: number) => "\u00a5" + n.toLocaleString("en-US");

export const tours: Tour[] = [
  {
    id: "01",
    place: "Mount Fuji",
    name: "Five Lakes before sunrise",
    operator: "Asagiri Tours",
    price: 18500,
    hours: "Full day · 04:30",
    photo: "/images/fuji-sunrise.jpg",
    focal: "50% 62%",
  },
  {
    id: "02",
    place: "Kyoto",
    name: "Arashiyama bamboo on foot",
    operator: "Rakusai Walks",
    price: 12000,
    hours: "Full day · 08:00",
    photo: "/images/kyoto-bamboo.jpg",
    focal: "50% 40%",
  },
  {
    id: "03",
    place: "Tokyo",
    name: "Shinjuku after dark",
    operator: "Yomichi Guides",
    price: 9800,
    hours: "Full day · 11:00",
    photo: "/images/tokyo-night.jpg",
    focal: "50% 55%",
  },
  {
    id: "04",
    place: "Hokkaido",
    name: "Snow country by rail",
    operator: "Kita Line Tours",
    price: 24000,
    hours: "Full day · 07:20",
    photo: "/images/hokkaido-snow.jpg",
    focal: "50% 50%",
  },
  {
    id: "05",
    place: "Osaka",
    name: "Dotonbori to Shinsekai, eating",
    operator: "Kuidaore Walks",
    price: 11500,
    hours: "Full day · 10:00",
  },
];

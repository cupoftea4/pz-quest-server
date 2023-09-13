import { readFileSync } from "fs";
import { Task } from "./types";

export const tasks: Record<string, Task> = JSON.parse(
  readFileSync("tasks.json").toString()
) as Record<string, Task>;

const path1: { text: string; picture: string }[] = [
  {
    text: "Вітаю! У вас перший маршрут. Бібліотека",
    picture: "https://i.imgur.com/lpbDbZM.png",
  },
  {
    text: "Парк",
    picture: "https://i.imgur.com/zJOMiyw.png",
  },
  {
    text: "Пам'ятник",
    picture: "https://i.imgur.com/pLFknQ0.png",
  },
  {
    text: "Студпростір (3 поверх)",
    picture: "https://i.imgur.com/ptyFmvL.png",
  },
  { text: "3 корпус", picture: "https://i.imgur.com/3GCY7B9.png" },
  { text: "Кормушка, хол", picture: "https://i.imgur.com/YqHsyLY.png" },
  {
    text: "Cтолик перед кормушкою",
    picture: "https://i.imgur.com/37jjc8v.png",
  },
  {
    text: "Парковка між 2 і 4 корпусом",
    picture: "https://i.imgur.com/s5VvKYa.png",
  },
  { text: "13 корпус, вхід", picture: "https://i.imgur.com/ZkVI1Fk.png" },
  {
    text: "Головний корпус, хол",
    picture: "https://i.imgur.com/pntnwU6.png",
  },
  { text: "1 корпус, колони", picture: "https://i.imgur.com/uY1HyRi.png" },
  { text: "5 корпус, 5 поверх", picture: "https://i.imgur.com/09SkYDu.png" },
];

const path2: { text: string; picture: string }[] = [
  {
    text: "Вітаю! У вас другий маршрут. 29 корпус. 1 поверх, не 0 :D",
    picture: "https://i.imgur.com/DnC5Map.png",
  },
  {
    text: "6 корпус (не 6а) одразу направо як зайшли, на сходи і потім до наступних сходів",
    picture: "https://i.imgur.com/jceKMia.png",
  },
  {
    text: "Бандера, зупинка автобуса",
    picture: "https://i.imgur.com/7cwj3pf.png",
  },
  {
    text: "Львівські круасани, чорна коробка з колодкою",
    picture: "https://i.imgur.com/XcpuZon.png",
  },
  {
    text: "Ольги і єлизавети, стовп парканний",
    picture: "https://i.imgur.com/Tl8C0rz.png",
  },
  { text: "Цирк, зліва від входу", picture: "https://i.imgur.com/HoWWjAQ.png" },
  { text: "2 корпус", picture: "https://i.imgur.com/ws2ajen.png" },
  { text: "Бібліотека", picture: "https://i.imgur.com/WAqHclT.png" },
  { text: "Бухгалтерія", picture: "https://i.imgur.com/qdtPPo2.png" },
  { text: "Між фонтанчиком та пам'ятником", picture: "https://i.imgur.com/aPfs184.png" },
  { text: "Міст", picture: "https://i.imgur.com/RzRkPJ5.png" },
  { text: "5 корпус, вхід", picture: "https://i.imgur.com/ccSs39G.png" },
];

const path3: { text: string; picture: string }[] = [
  {
    text: "Вітаю! У вас третій маршрут. Стопка рекламок додатку, столик біля хотдогів",
    picture: "https://i.imgur.com/UJrLHdZ.png",
  },
  { text: "Музей тюрма", picture: "https://i.imgur.com/CkJJOcz.png" },
  { text: "Органний зал", picture: "https://i.imgur.com/pFgO6hj.png" },
  {
    text: "Науково-технічна бібліотека",
    picture: "https://i.imgur.com/nv7sgCA.png",
  },
  {
    text: "Столик між ГК і бібліотекою",
    picture: "https://i.imgur.com/oCRyAWu.png",
  },
  {
    text: "Підвал 1 корпусу (укриття)",
    picture: "https://i.imgur.com/vj4cCpj.png",
  },
  {
    text: "Кафедра систем автоматизованого проектування, сонячні панелі",
    picture: "https://i.imgur.com/qHMDmRz.png",
  },
  { text: "Дерево зламане", picture: "https://i.imgur.com/QYwC82z.png" },
  { text: "4 поверх 1 корпусу", picture: "https://i.imgur.com/T7UBNGE.png" },
  {
    text: "Біля кущів біля 1 корпусу. Лавка",
    picture: "https://i.imgur.com/h2dpYMX.png",
  },
  {
    text: "Парк біля 29. No parking",
    picture: "https://i.imgur.com/aqIwLlp.png",
  },
  {
    text: "Буфет 5 корпусу. 3 поверх",
    picture: "https://i.imgur.com/8Skx62Y.png",
  },
];

export const hints: Record<number, {text: string, picture: string}[]> = {
  1: path1,
  2: path2,
  3: path3,
};

export const PATH_COUNT = Object.keys(hints).length;

export const TASKS_COUNT = path1.length;

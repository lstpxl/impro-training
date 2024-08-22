import { ChartNoAxesCombined } from "lucide-react";
import useLessonStore from "./lessonStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ExerciseScore } from "./ExerciseScore";

const getColor = (index: number) => {
  if (index > 7) {
    const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  } else {
    const list = [
      "#ffa600",
      "#ff7c43",
      "#f95d6a",
      "#d45087",
      "#a05195",
      "#665191",
      "#2f4b7c",
      "#003f5c",
    ];
    return list[index];
  }
};

interface LineDesc {
  dataKey: string;
  stroke: string;
}

function getLineList(data: Map<string, number | string>[]): LineDesc[] {
  // console.log("data2", data);
  const result: LineDesc[] = [];
  const addLine = (code: string) => {
    const found = result.findIndex((item) => item.dataKey === code);
    if (found < 0) {
      const elem = {
        dataKey: code,
        stroke: getColor(result.length),
      };
      result.push(elem);
    }
  };
  data.forEach((item) => {
    for (const key in item) {
      if (item.has(key)) {
        if (key !== "name") {
          addLine(key);
        }
      }
    }
  });
  return result;
}

const HistoryChart = ({ data }) => {
  // console.log("data1", data);
  const lineList = getLineList(data);
  // console.log(lineList);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1 4" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lineList.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

const prepareData = (raw: ExerciseScore[]): Map<string, number | string>[] => {
  const result: Map<string, number | string>[] = [];
  const addPoint = (date: string, code: string, value: number) => {
    const found = result.findIndex((item) => item.get("name") === date);
    if (found >= 0) {
      // result[found][code] = value;
      result[found].set(code, value);
    } else {
      const elem = new Map();
      elem.set("name", date);
      elem.set(code, value);
      result.push(elem);
    }
  };
  raw.forEach((item) => {
    if (item.scoring !== "none") {
      const dateStr = new Date(item.timestamp).toISOString().substring(0, 10);
      addPoint(dateStr, item.code, item.value);
    }
  });
  return result;
};

const History = () => {
  const scores = useLessonStore((state) => state.scores);
  const preparedData = prepareData(scores);
  if (preparedData.length < 2) return null;

  return (
    <section id="stats" className="bg-gray-50 rounded-md p-4 ">
      <div className="text-gray-500 text-xs flex flex-col gap-2">
        <div className="col-span-3 mb-4 text-sm flex gap-4">
          <ChartNoAxesCombined size={20} className="" /> History statistics:
        </div>
        <div className="w-full h-96">
          <HistoryChart data={preparedData} />
        </div>
      </div>
    </section>
  );
};

export default History;

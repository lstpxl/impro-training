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
import { useTranslation } from "react-i18next";

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
    item.forEach((_value, key) => {
      if (key !== "date") addLine(key);
    });
  });
  return result;
}

function mapToAny(data: Map<string, number | string>[]) {
  return data.map((item) => Object.fromEntries(item));
}

const HistoryChart = ({ data }: { data: Map<string, number | string>[] }) => {
  const { t } = useTranslation();
  const lineList = getLineList(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={mapToAny(data)}
        margin={{
          top: 5,
          right: 40,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1 4" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lineList.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.stroke}
            name={t(line.dataKey, { ns: "exerciseName" })}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

const prepareData = (raw: ExerciseScore[]): Map<string, number | string>[] => {
  const result: Map<string, number | string>[] = [];
  const addPoint = (date: string, code: string, value: number) => {
    const found = result.findIndex((item) => item.get("date") === date);
    if (found >= 0) {
      result[found].set(code, value);
    } else {
      const elem = new Map();
      elem.set("date", date);
      elem.set(code, value);
      result.push(elem);
    }
  };
  raw.forEach((item) => {
    if (item.scoring !== "none") {
      const dateStr = new Date(item.timestamp).toISOString().substring(0, 10);
      addPoint(
        dateStr,
        item.code,
        Math.round((item.value + Number.EPSILON) * 100) / 100
      );
    }
  });
  return result;
};

const History = () => {
  const { t } = useTranslation();
  const scores = useLessonStore((state) => state.scores);
  const preparedData = prepareData(scores);
  if (preparedData.length < 2) return null;

  return (
    <section id="stats" className="bg-gray-50 rounded-md p-4 ">
      <div className="text-gray-500 text-xs flex flex-col gap-2">
        <div className="col-span-3 mb-4 text-sm flex gap-4">
          <ChartNoAxesCombined size={20} className="" />
          {t("historyStatistics")}:
        </div>
        <div className="w-full h-72">
          <HistoryChart data={preparedData} />
        </div>
      </div>
    </section>
  );
};

export default History;

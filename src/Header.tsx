import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  return (
    <header className=" px-4 py-2 flex justify-between items-center gap-8 ">
      <h1 className="text-2xl text-gray-400">impro-training</h1>
      <div className="text-gray-400 text-sm text-right">
        {t("whatIsImproTrain")}
      </div>
    </header>
  );
};

export default Header;

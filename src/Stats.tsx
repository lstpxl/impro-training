const Stats = () => {
  return (
    <section id="stats" className="bg-gray-50 rounded-md p-4 ">
      <div className="text-gray-500 mb-2 ">
        Current exercise and lesson statistics
      </div>
      <ul className="text-sm text-gray-500">
        <li>wpm = words per minute</li>
        <li>cpw = clicks per word</li>
        <li>none = completed or not</li>
      </ul>
      <p className="text-gray-500 ">evaluate independantly for each exercise</p>
    </section>
  );
};

export default Stats;

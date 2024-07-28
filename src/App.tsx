import Interstate from "./Interstate";
import Page from "./Page";
import Pinger from "./Pinger";
import SoundPlayer from "./SoundPlayer";

function App() {
  return (
    <div className="flex p-1 justify-center">
      <Page />
      <SoundPlayer />
      <Pinger />
      <Interstate />
    </div>
  );
}

export default App;

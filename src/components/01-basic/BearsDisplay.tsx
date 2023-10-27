import { useShallow } from "zustand/react/shallow";
import { WhiteCard } from "..";
import { useBearStore } from "../../stores";

const BearsDisplay = () => {
  const bears = useBearStore(useShallow((state) => state.bears));
  const doNothing = useBearStore((state) => state.doNothing);
  const clearBears = useBearStore((state) => state.clearBears);
  const addBear = useBearStore((state) => state.addBear);
  return (
    <WhiteCard>
      <h1>Osos</h1>
      <button onClick={doNothing}>Do Nothing</button>
      <button className="mt-2" onClick={addBear}>
        Agregar oso
      </button>
      <button className="mt-2" onClick={clearBears}>
        Borrar Oso
      </button>
      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};

export default BearsDisplay;

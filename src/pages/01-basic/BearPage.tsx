import { BlackBears } from '../../components';
import BearsDisplay from '../../components/01-basic/BearsDisplay';
import { PandaBears } from '../../components/01-basic/PandaBears';
import { PolarBears } from '../../components/01-basic/PolarBears';


export const BearPage = () => {
 
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        <PolarBears />
        <PandaBears />
        <BearsDisplay />
      </div>

    </>
  );
};
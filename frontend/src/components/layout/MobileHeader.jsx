import logo from '../../assets/logo.png';

function MobileHeader() {
  // A classe "md:hidden" é a mágica aqui.
  // Ela diz: "este componente fica escondido (hidden) em telas de tamanho médio (md) ou maiores".
  // Ou seja, ele SÓ vai aparecer em telas pequenas (celular).
  return (
    <div className="md:hidden flex items-center gap-2 mb-6">
      <img src={logo} alt="Infinity School Logo" className="w-8 h-8" />
      <h1 className="text-xl font-bold text-infinity-red">
        Organiza<span className="font-light text-gray-700 dark:text-infinity-text">Infinity</span>
      </h1>
    </div>
  );
}

export default MobileHeader;
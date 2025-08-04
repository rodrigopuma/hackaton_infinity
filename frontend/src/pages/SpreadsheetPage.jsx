function SpreadsheetPage() {
  // COLE AQUI O LINK QUE VOCÊ COPIOU DO GOOGLE SHEETS
  const spreadsheetUrl =
    "https://docs.google.com/spreadsheets/d/1FvmL5WmEeEoNtT9qaWAkwAg2o7MZ1XMuwM9kSUZJixk/edit?usp=sharing";

  const idClienteAPI =
    "605775581583-8fpokkapkgb306g4j7n4v47e3k5in5q6.apps.googleusercontent.com";

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-infinity-text mb-6">
        Planejamento Pedagógico
      </h1>
      <div className="w-full h-[75vh] bg-white rounded-lg shadow-lg">
        {/* O iframe é o que "embuta" a página da planilha aqui dentro */}
        <iframe
          src={spreadsheetUrl}
          title="Planilha de Planejamento"
          className="w-full h-full border-0 rounded-lg"
        >
          Carregando planilha...
        </iframe>
      </div>
    </div>
  );
}

export default SpreadsheetPage;

const e=React.createElement;

function CalculateurCourses() {
  const [budgetActuel, setBudgetActuel] = React.useState(800);
  const [personnes, setPersonnes] = React.useState(2);
  const [objectifReduction, setObjectifReduction] = React.useState(30);
  const [resultat, setResultat] = React.useState(null);

  const calculerEconomies = () => {
    const budgetMensuel = budgetActuel;
    const economiesPourcentage = objectifReduction;
    const economiesMensuel = (budgetMensuel * economiesPourcentage) / 100;
    const economiesAnnuel = economiesMensuel * 12;
    const budgetParPersonne = budgetMensuel / personnes;
    const nouveauBudget = budgetMensuel - economiesMensuel;
    const nouveauBudgetParPersonne = nouveauBudget / personnes;

    setResultat({
      economiesMensuel,
      economiesAnnuel,
      budgetParPersonne,
      nouveauBudget,
      nouveauBudgetParPersonne
    });
  };

  React.useEffect(() => {
    calculerEconomies();
  }, [budgetActuel, personnes, objectifReduction]);

  return e('div', {className: 'max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'},
    e('h2', {className: 'text-2xl font-bold mb-6 text-center text-gray-800'}, '🛒 Calculateur d\'Économies Courses'),
    
    e('div', {className: 'space-y-6'},
      // Budget actuel
      e('div', null,
        e('label', {className: 'block text-sm font-medium text-gray-700 mb-2'}, 
          `Budget courses mensuel actuel : ${budgetActuel}€`
        ),
        e('input', {
          type: 'range',
          min: '200',
          max: '2000',
          step: '50',
          value: budgetActuel,
          onChange: (e) => setBudgetActuel(Number(e.target.value)),
          className: 'w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer'
        })
      ),

      // Nombre de personnes
      e('div', null,
        e('label', {className: 'block text-sm font-medium text-gray-700 mb-2'}, 
          `Nombre de personnes dans le foyer : ${personnes}`
        ),
        e('input', {
          type: 'range',
          min: '1',
          max: '8',
          step: '1',
          value: personnes,
          onChange: (e) => setPersonnes(Number(e.target.value)),
          className: 'w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer'
        })
      ),

      // Objectif de réduction
      e('div', null,
        e('label', {className: 'block text-sm font-medium text-gray-700 mb-2'}, 
          `Objectif de réduction : ${objectifReduction}%`
        ),
        e('input', {
          type: 'range',
          min: '5',
          max: '50',
          step: '5',
          value: objectifReduction,
          onChange: (e) => setObjectifReduction(Number(e.target.value)),
          className: 'w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer'
        })
      ),

      // Résultats
      resultat && e('div', {className: 'mt-8 p-6 bg-blue-50 rounded-lg'},
        e('h3', {className: 'text-xl font-semibold mb-4 text-gray-800'}, '💰 Vos économies potentielles'),
        e('div', {className: 'space-y-3'},
          e('p', {className: 'text-gray-700'},
            e('span', {className: 'font-medium'}, 'Économies mensuelles : '),
            `${Math.round(resultat.economiesMensuel)}€`
          ),
          e('p', {className: 'text-gray-700'},
            e('span', {className: 'font-medium'}, 'Économies annuelles : '),
            `${Math.round(resultat.economiesAnnuel)}€`
          ),
          e('p', {className: 'text-gray-700'},
            e('span', {className: 'font-medium'}, 'Nouveau budget mensuel : '),
            `${Math.round(resultat.nouveauBudget)}€`
          ),
          e('p', {className: 'text-gray-700'},
            e('span', {className: 'font-medium'}, 'Par personne avant : '),
            `${Math.round(resultat.budgetParPersonne)}€`
          ),
          e('p', {className: 'text-gray-700'},
            e('span', {className: 'font-medium'}, 'Par personne après : '),
            `${Math.round(resultat.nouveauBudgetParPersonne)}€`
          )
        )
      ),

      // Conseils
      e('div', {className: 'mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600'},
        e('h4', {className: 'font-medium mb-2'}, '💡 Astuces pour réussir :'),
        e('ul', {className: 'list-disc pl-5 space-y-1'},
          e('li', null, 'Planifiez vos repas à l\'avance'),
          e('li', null, 'Faites une liste de courses'),
          e('li', null, 'Comparez les prix au kilo'),
          e('li', null, 'Évitez le gaspillage alimentaire')
        )
      )
    )
  );
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(CalculateurCourses), domContainer);

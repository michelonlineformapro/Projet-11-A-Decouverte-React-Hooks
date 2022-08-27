//import de la lib react + hook d'etat local ajouter a des fonctions du composant
import React,{ useEffect, useState } from 'react';
//Appel du fichier css
import './App.css';

//le composant App.js est une fonction
//il est possible egalement d'ecrire const App = () => {}
function App() {

  //Le formulaire = function + props passee en paramètre lors de l'appel de ce dernier
  //ex: <AjouterTacheFormulaire ajouterTacheProps={quelque chose}/>
  //On passe des propriétés de ce composant a la liste (ici la valeur du champ <input> et son etat)
  const AjouterTacheFormulaire = ({ajouterTacheProps}) => {
    //un hook d'etat des valeurs du champ <input>
    //inputValue = '' String
    //setInputvalue = () => {} = mutation (setter) de inputValue[]
    let [inputValue, setInputValue] = useState('')

     //Fonction qui inspecte le changement d'etat du champ <input>
    const soumissionFormulaire = (e) =>{
      //Supprimer le comportement par defaut de la page web = ici evite le rechargement de la page syncrone
      e.preventDefault();
      //La string du hook + le paramètre de la fonction a appelé <AjouterTacheFormulaire ajouterTacheProps={}/>
      inputValue && ajouterTacheProps(inputValue)
      //On modifie l'etat du champ input = reinitialisation = vide le champ
      setInputValue('')
      //Debug console f12
      console.log(setInputValue)
    }
    //JSX HTML
    //A la soumission du formulaire on appel la fonction onSubmit={soumissionFormulaire}
    //Le champ input value prend la valeur init du hook
    //Quand utilisateur entre des lettres => onChange detecte un changement d'etat et recupère la valeur de ce dernier
    //equivalent a : document.getElementsByTagName('input').value
    //Ce composant est appeleé dans le parent <ListeTache/>
    return(
      <div className="mt-3" id='main-container'>
        <h2 className='text-center text-white'>AJOUTER UNE TACHE</h2>
        <form onSubmit={soumissionFormulaire}>
          <input 
            type="text" 
            placeholder='Votre taches' 
            value={inputValue}  
            onChange={e => setInputValue(e.target.value)} 
            className='form-control'/>

          <button type='submit' className='btn btn-warning mt-3 text-success btn-ajouter'>
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
            </span>
            </button>
        </form>

      </div>
    )

  }
  

 
    //Chaque <li> de notre liste est un objet composé (id + tache)
      let produitObjet = [
        {
          id:1,
          tache:"snes",
        },
        {
          id:2,
          tache:"genesis",
        },
      ]
      //un hook d'etat du tableau de tache
      //Ici on peux dire que let produits = produitObjet[]
      //et setProduit = (produits) => {fait des trucs}
      let [taches, setTaches] = useState(produitObjet)

      //Ajout d'une tache
      //function + paramètre = mutateur (setters) du hook (setTache)
      //A l'interieur: spreadOpéreator https://geeklecode.com/loperateur-spread-en-javascript-va-vous-simplifier-la-vie/
      //cet element realise une copie de tableau taches et separe chaque index et en second paramètre on ajoute la tache entrée dans input
      //Ceci est equvalent a taches.push({id: taches.lenght + 1, tache: })
      const ajouterTache = (tache) => setTaches([...taches, {tache}]);

      //Supprimer une tache a l'aide de son index
      const supprimerTache = (index) => {
        //On eclate le tableau de taches
        const unetache = [...taches];
        //.splice() recupère l'index concerné et en second paramètre le nombre d'index a supprimer
        unetache.splice(index, 1);
        //On met a jour l'etat du  tableau avec le mutateur du hook
        setTaches(unetache)
        //Cette fonction est appelé au clic sur l'icon poubelle de chaque <li>
      }

      //ici on realise une boucle sur le tableau de taches avec .map()
      //chaque <li> accéde au tableau taches et au objet present
      //On peu donc acceder a chaque element des objets du tableau de taches
      //En bas du code : on appel le composant formulaire ecrit ci-dessus
    return (
      <div className="container shadow p-3 mt-5 w-25" id='main-container'>
        <h2 className='text-center text-white'>LES TACHES DU JOUR</h2>
       
          <ul className='list-group'>
            {taches.map((uneTaches, index) => (
              <li key={index} className='mt-3 list-group-item d-flex justify-content-between'>
                  {uneTaches.tache}
                  <span className='text-danger icone-poubelle' onClick={supprimerTache}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                  </span>            
                </li>
            ))}
          </ul>
          <AjouterTacheFormulaire ajouterTacheProps={ajouterTache}/>       
      </div>
    );
  
}

/*

//le spreadOperator (affectation par decomposition)
const tableau = [15,5,10];
function addition(nb1,nb2,nb3){
  return nb1 + nb2 + nb3;
}

let resultat = addition(tableau[0], tableau[1], tableau[2]);
let memeChose = addition(...tableau)

console.log(resultat);
console.log(memeChose)

//Eclater le tableau
console.log(...tableau)

*/

export default App;

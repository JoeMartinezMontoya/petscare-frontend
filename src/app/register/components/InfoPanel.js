import React from 'react';

export default function InfoPanel() {
  return (
    <div className='col-12 col-md-6 mx-auto p-5 rounded-start-2 petscare-background'>
      <h2 className='petscare-brand'>Rejoignez-nous</h2>
      <p className='mt-4'>
        Intégrez une communauté bienveillante et aimante qui oeuvre pour le
        bien-être de nos compagnons à fourrure
      </p>
      <p className='mt-4'>
        Gardez ou faites gardez vos compagnons, vous pourrez vous inscrire en
        tant que PetSitter afin de signaler aux autres membres que vous êtes
        disponible, et vous faire recommander par cette même communauté
      </p>
      <p className='mt-4'>
        Retrouvez votre compagnon ou celui des autres grâçe à notre système
        intelligent
      </p>

      <button className='btn btn-info'>Déjà inscrit?</button>
    </div>
  );
}

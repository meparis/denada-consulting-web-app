import React from 'react';

export default function WebAppServicePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-roboto p-8">
      {/* Section d'introduction */}
      <section className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-poppins font-bold text-blue-700 mb-4">Service de Création d’Applications Web</h1>
        <p className="text-lg leading-relaxed mb-6">
          Chez <span className="font-semibold text-blue-700">DeNada Consulting</span>, nous aidons les petites entreprises à se développer en ligne.
          Nous créons pour vous un site ou une application facile à gérer, qui attire de nouveaux clients,
          respecte la législation en vigueur et garantit l’accessibilité pour tous.
        </p>
        <p className="text-base leading-relaxed">
          Votre projet bénéficie d’une conception adaptée à votre activité, d’une visibilité améliorée sur Google,
          d’une interface disponible en plusieurs langues et d’un affichage optimal sur ordinateur et mobile.
        </p>
      </section>

      {/* Liste des avantages */}
      <section className="max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-poppins font-semibold text-gray-800 mb-4">Pourquoi choisir notre service ?</h2>
        <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
          <li>Solution clé en main, sans compétence technique requise</li>
          <li>Visibilité renforcée : nous optimisons votre site pour Google</li>
          <li>Multilingue : touchez une clientèle plus large</li>
          <li>Design responsive : vos clients consultent sur mobile ou ordinateur</li>
          <li>Conformité légale et accessibilité : site conforme au RGPD et normes WCAG</li>
          <li>Facilité de mise à jour : modifiez textes et images en quelques clics</li>
          <li>Sécurité : vos données et celles de vos clients sont protégées</li>
          <li>Support dédié : nous vous accompagnons à chaque étape</li>
        </ul>
      </section>

            {/* Mise à jour de sites existants */}
      <section className="max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-poppins font-semibold text-gray-800 mb-4">Mise à jour et amélioration de vos solutions existantes</h2>
        <p className="text-base leading-relaxed mb-4">
          Vous disposez déjà d’un site ou d’une application ? Nous assurons :
        </p>
        <ul className="list-disc list-inside space-y-2 text-base leading-relaxed mb-8">
          <li>Audit complet pour identifier les axes d’amélioration</li>
          <li>Mise à jour graphique et ergonomique</li>
          <li>Optimisation SEO et performance</li>
          <li>Ajout de fonctionnalités (paiement, prise de rendez-vous, multilingue…)</li>
          <li>Conformité RGPD et accessibilité WCAG</li>
          <li>Support et maintenance continue</li>
        </ul>
      </section> {/* Add closing tag here */}

      {/* Formulaire de contact */}
      <section className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-poppins font-semibold text-gray-800 mb-6">Parlez-nous de votre projet</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Nom</label>
            <input type="text" id="name" name="name" placeholder="Ex. Jean Martin"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" name="email" placeholder="exemple@votreentreprise.com"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type">Type de projet</label>
            <select id="type" name="type"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400">
              <option>Site vitrine (présentation de votre activité)</option>
              <option>E-commerce (vente en ligne)</option>
              <option>Application interne (gestion, planning)</option>
              <option>Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="details">Détails</label>
            <textarea id="details" name="details" rows="4" placeholder="Expliquez rapidement vos besoins et objectifs"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400"></textarea>
          </div>
          <button type="submit"
            className="w-full py-3 font-poppins font-semibold rounded-md bg-cyan-400 text-white hover:bg-cyan-500 transition">
            Demander un devis gratuit
          </button>
        </form>
      </section>
    </main>
  );
}

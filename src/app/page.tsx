'use client';

import React, { useState, FormEvent } from 'react';
// Remove MailService import if it's no longer directly used here
// import { MailService } from '@/lib/MailServices';

export default function WebAppServicePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Site vitrine (présentation de votre activité)',
    details: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', { // Send request to the API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      const result = await response.json();

      if (!response.ok) {
        // Use the error message from the API response if available
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      setStatus('success');
      // Optionally reset form
      // setFormData({ name: '', email: '', type: 'Site vitrine (présentation de votre activité)', details: '' });

    } catch (error) {
      console.error('Failed to submit form:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue lors de la soumission.');
    }
  };
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
        {/* Add onSubmit handler */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ex. Jean Martin"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="exemple@votreentreprise.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type">Type de projet</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400"
            >
              <option>Site vitrine (présentation de votre activité)</option>
              <option>E-commerce (vente en ligne)</option>
              <option>Application interne (gestion, planning)</option>
              <option>Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="details">Détails</label>
            <textarea
              id="details"
              name="details"
              rows={4}
              placeholder="Expliquez rapidement vos besoins et objectifs"
              value={formData.details}
              onChange={handleChange}
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-400 focus:border-cyan-400"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-3 font-poppins font-semibold rounded-md text-white transition ${
              status === 'loading'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-cyan-400 hover:bg-cyan-500'
            }`}
          >
            {status === 'loading' ? 'Envoi en cours...' : 'Demander un devis gratuit'}
          </button>

          {/* Display status messages */}
          {status === 'success' && (
            <p className="text-green-600 text-center mt-4">Votre demande a été envoyée avec succès !</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center mt-4">
              Échec de l&apos;envoi: {errorMessage || 'Veuillez réessayer.'}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

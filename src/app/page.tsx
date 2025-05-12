'use client';
import React, { useState, FormEvent } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';


export default function WebAppServicePage() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Site vitrine (présentation de votre activité)',
    details: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Scroll progress and animations
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || `Erreur HTTP ${response.status}`);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-100 text-slate-800 font-roboto px-4 sm:px-6 lg:px-8 py-12">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-sky-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header with Logo Reveal */}
      <header className="max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-300">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }} // Changed back from animate, exit prop removed
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center"
        >
          <Image
            src="/logo_transparent_bg_cropped.png"
            alt="DeNada Consulting Logo"
            width={441}
            height={186}
            priority
          />
        </motion.div>
      </header>

      {/* Introduction Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }} // Changed back from animate, exit prop removed
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto mb-16 bg-white p-6 sm:p-10 rounded-xl shadow-xl"
      >
        <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-sky-600 mb-6 tracking-tight">
          Service de Création d’Applications Web
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          Chez <span className="font-bold text-sky-600">DeNada Consulting</span>, nous aidons les petites
          entreprises à se développer en ligne. Nous créons pour vous un site ou une application facile
          à gérer, qui attire de nouveaux clients, respecte la législation en vigueur et garantit
          l’accessibilité pour tous.
        </p>
        <p className="text-base text-slate-600 leading-relaxed">
          Votre projet bénéficie d’une conception adaptée à votre activité, d’une visibilité améliorée
          sur Google, d’une interface disponible en plusieurs langues et d’un affichage optimal sur
          ordinateur et mobile.
        </p>
      </motion.section>

      {/* Avantages List */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }} // Changed back from animate, exit prop removed
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-16 bg-white p-6 sm:p-10 rounded-xl shadow-xl"
      >
        <h2 className="text-3xl font-poppins font-semibold text-slate-800 mb-6">
          Pourquoi choisir notre service ?
        </h2>
        <ul className="list-disc list-inside space-y-3 text-slate-600 leading-relaxed">
          {[
            'Solution clé en main, sans compétence technique requise',
            'Visibilité renforcée : nous optimisons votre site pour Google',
            'Multilingue : touchez une clientèle plus large',
            'Design responsive : vos clients consultent sur mobile ou ordinateur',
            'Conformité légale et accessibilité : site conforme au RGPD et normes WCAG',
            'Facilité de mise à jour : modifiez textes et images en quelques clics',
            'Sécurité : vos données et celles de vos clients sont protégées',
            'Support dédié : nous vous accompagnons à chaque étape',
          ].map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }} // Changed back from animate, exit prop removed
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Mise à jour existant */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }} // Changed back from animate, exit prop removed
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-16 bg-white p-6 sm:p-10 rounded-xl shadow-xl"
      >
        <h2 className="text-3xl font-poppins font-semibold text-slate-800 mb-6">
          Mise à jour et amélioration de vos solutions existantes
        </h2>
        <p className="text-base text-slate-600 leading-relaxed mb-4">
          Vous disposez déjà d’un site ou d’une application ? Nous assurons :
        </p>
        <ul className="list-disc list-inside space-y-3 text-slate-600 leading-relaxed mb-8">
          {[
            'Audit complet pour identifier les axes d’amélioration',
            'Mise à jour graphique et ergonomique',
            'Optimisation SEO et performance',
            'Ajout de fonctionnalités (paiement, prise de rendez-vous, multilingue…) ',
            'Conformité RGPD et accessibilité WCAG',
            'Support et maintenance continue',
          ].map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }} // Changed back from animate, exit prop removed
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Formulaire de contact animé */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }} // Changed back from animate, exit prop removed
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-xl"
      >
        <h2 className="text-3xl font-poppins font-semibold text-slate-800 mb-8 text-center">
          Parlez-nous de votre projet
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: 'name', label: 'Nom', type: 'text', placeholder: 'Ex. Jean Martin' },
            { id: 'email', label: 'Adresse e-mail', type: 'email', placeholder: 'exemple@votreentreprise.com' }
          ].map((field, idx) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }} // Changed back from animate, exit prop removed
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <label htmlFor={field.id} className="block text-sm font-medium text-slate-700 mb-1">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id as keyof typeof formData] as string}
                onChange={handleChange}
                required
                className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 py-2.5 px-3.5 bg-slate-50 focus:bg-white transition-colors"
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }} // Changed back from animate, exit prop removed
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
              Type de projet
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 py-2.5 px-3.5 bg-slate-50 focus:bg-white transition-colors"
            >
              <option>Site vitrine (présentation de votre activité)</option>
              <option>E-commerce (vente en ligne)</option>
              <option>Application interne (gestion, planning)</option>
              <option>Autre</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }} // Changed back from animate, exit prop removed
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label htmlFor="details" className="block text-sm font-medium text-slate-700 mb-1">
              Détails
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              placeholder="Expliquez rapidement vos besoins et objectifs"
              value={formData.details}
              onChange={handleChange}
              required
              className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 py-2.5 px-3.5 bg-slate-50 focus:bg-white transition-colors"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }} // Changed back from animate, exit prop removed
            viewport={{ amount: 0.2 }} // Changed from viewport: {} to a specific amount
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-3 font-poppins font-semibold rounded-lg text-white transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                status === 'loading' ? 'bg-slate-400 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600 shadow-md hover:shadow-lg'
              }`}
            >
              {status === 'loading' ? 'Envoi en cours...' : 'Demander un devis gratuit'}
            </button>
          </motion.div>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }} // Changed from animate to whileInView, exit prop removed
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ amount: 0.1 }}
              className="text-emerald-600 font-medium text-center mt-4"
            >
              Votre demande a été envoyée avec succès !
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }} // Changed from animate to whileInView, exit prop removed
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ amount: 0.1 }}
              className="text-rose-600 font-medium text-center mt-4"
            >
              Échec de l&apos;envoi: {errorMessage || 'Veuillez réessayer.'}
            </motion.p>
          )}
        </form>
      </motion.section>
    </main>
  );
}


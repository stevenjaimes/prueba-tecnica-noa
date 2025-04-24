'use client';
import Head from 'next/head';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
 
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contacto | Henry Steeven Jaimes - Desarrollador Full Stack</title>
        <meta name="description" content="Ponte en contacto con Henry Steeven Jaimes, Desarrollador Full Stack" />
      </Head>

      <main className="min-h-screen bg-background">

        <section className="relative bg-gradient-to-r from-primary to-purple-900 py-20 text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              Contacto
            </h1>
            <p className="font-sans text-xl max-w-2xl mx-auto">
              ¿Tienes un proyecto en mente o quieres trabajar juntos? ¡Hablemos!
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-background transform skew-y-1 origin-top-left"></div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-card p-8 md:p-10 rounded-lg shadow-lg border border-border">
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-6 text-center">
                Envíame un mensaje
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                  ¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                  Ocurrió un error al enviar el mensaje. Por favor inténtalo de nuevo más tarde.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-sans text-sm font-medium text-foreground mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-sans text-sm font-medium text-foreground mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-sans text-sm font-medium text-foreground mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-sans font-medium py-3 px-6 rounded-md transition-all flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : 'Enviar mensaje'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                Otras formas de contacto
              </h2>
              <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
                También puedes encontrarme en estas plataformas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">Teléfono</h3>
                <p className="font-sans text-muted-foreground">+57 318 6411411</p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">Email</h3>
                <p className="font-sans text-muted-foreground">hensteve250@gmail.com</p>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">LinkedIn</h3>
                <a 
                  href="https://www.linkedin.com/in/henry-steven-jaimes/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-sans text-primary hover:underline"
                >
                  Henry Steeven Jaimes
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
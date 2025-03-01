"use client";

import React, { useRef, useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Get form data to ensure it's included in the email
    const formData = new FormData(form.current);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Create template params that match your EmailJS template variables
    const templateParams = {
      user_name: name,
      user_email: email,
      subject: subject,
      message: message,
      from_name: name
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, 
        }
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setIsSubmitted(true);
          form.current.reset();
        },
        (error) => {
          console.error('Error sending email - full error:', error);
          setError(`Error sending email: ${error.text || 'Unknown error'}`);
        },
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#18181B] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="bg-zinc-900 border border-green-500/30 shadow-lg shadow-green-500/10 rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-900 to-green-950 p-6 border-b border-green-800/30">
            <h1 className="text-3xl font-bold text-green-400 mb-2">Contact Me</h1>
            <p className="text-green-200">Feel free to reach out with any questions or opportunities!</p>
          </div>

          {!isSubmitted ? (
            <form ref={form} onSubmit={sendEmail} className="p-6 space-y-6">
              <div>
                <label htmlFor="user_name" className="block text-green-400 mb-2">Name</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  className="w-full p-3 bg-zinc-800 border border-green-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="user_email" className="block text-green-400 mb-2">Email</label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  className="w-full p-3 bg-zinc-800 border border-green-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-green-400 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full p-3 bg-zinc-800 border border-green-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-green-400 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="w-full p-3 bg-zinc-800 border border-green-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded-md text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 p-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h2>
              <p className="text-gray-300 mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
            
            </div>
          )}
        </div>

        <div className="mt-8 p-6 bg-zinc-900 border border-green-500/30 shadow-lg shadow-green-500/10 rounded-lg">
          <h2 className="text-xl font-bold text-green-400 mb-4">Direct Contact</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-900/50 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a href="mailto:asakshat453@gmail.com" className="text-green-400 hover:text-green-300 transition-colors">
                asakshat453@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-green-900/50 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-green-400">0488828678</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-green-900/50 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-green-400">Brussels, Belgium</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
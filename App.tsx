
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { AuthView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <div className="w-full flex justify-center py-10">
          <div className="w-full max-w-[500px] bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
            {currentView === 'login' ? (
              <LoginForm onSwitchToSignup={() => setCurrentView('signup')} />
            ) : (
              <SignupForm onSwitchToLogin={() => setCurrentView('login')} />
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-gray-900 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Sharaf AI. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}

export default App;

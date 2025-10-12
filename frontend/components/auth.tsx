"use client"

import React, { useState } from 'react';

type AuthMode = 'signin' | 'signup';
type AppView = 'home' | 'auth';

// --- Mock Button Component (with Tailwind Styling) ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';

}

const Button: React.FC<ButtonProps> = ({ children, variant = 'default', className = '', ...props }) => {
  let baseStyles = 'w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500';
  
  
  // variant Handling
  switch (variant) {
    case 'outline':
      baseStyles += ' border border-indigo-500 text-indigo-600 hover:bg-indigo-50';
      break;
    case 'ghost':
      baseStyles += ' text-gray-600 hover:bg-gray-100';
      break;
    case 'default':
    default:
      baseStyles += ' bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg';
      break;
  }

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Mock Input Component (with Tailwind Styling) ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input 
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-150" 
      {...props} 
    />
  );
};

// --- Sign In Component ---
export function SignInForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign In attempted.");
        // Authentication logic goes here
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h2>

            <div className="space-y-4">
                <div>
                    <label htmlFor="email-signin" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input 
                        id="email-signin" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="password-signin" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <Input 
                        id="password-signin" 
                        type="password" 
                        placeholder="password" 
                        required 
                    />
                </div>
            </div>
            
            <div className="flex justify-end text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                    Forgot password?
                </a>
            </div>

            <Button type="submit">
                Sign In
            </Button>
            
            <div className="text-center text-sm text-gray-500">
                Don't have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">Sign Up</a>
            </div>
        </form>
    );
}

// --- Sign Up Component ---
export function SignUpForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign Up attempted.");
        // Registration logic goes here
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Create Account</h2>
            <div className="space-y-4">

                <div>
                    <label htmlFor="name-signup" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <Input 
                        id="first-name-signup" 
                        type="text" 
                        placeholder="First Name" 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="name-signup" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <Input 
                        id="last-name-signup" 
                        type="text" 
                        placeholder="Last Name" 
                        required 
                    />
                </div>

                <div>
                    <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input 
                        id="email-signup" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <Input 
                        id="password-signup" 
                        type="password" 
                        placeholder="Password" 
                        required 
                    />
                </div>

                <div>
                    {/* Label points to the new unique ID below */}
                    <label htmlFor="confirm-password-signup" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <Input 
                        id="confirm-password-signup" // CRITICAL: New unique ID
                        type="password" 
                        placeholder="Confirm Password" 
                        required 
                    />
                </div>
                
            </div>
            
            <Button type="submit">
                Sign Up
            </Button>
            
            <div className="text-center text-sm text-gray-500">
                Already have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">Sign In</a>
            </div>
        </form>
    );
}


// --- Main Application Wrapper (to demonstrate both forms) ---


const App: React.FC = () => {

    
    const [mode, setMode] = useState<AuthMode>('signin');
    
    // Switch between Sign In and Sign Up views
    const toggleMode = (newMode: AuthMode) => (e: React.MouseEvent) => {
        e.preventDefault();
        setMode(newMode);
    };

    // Component to render based on current mode
    const CurrentForm = mode === 'signin' ? SignInForm : SignUpForm;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-inter antialiased">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                body { font-family: 'Inter', sans-serif; }
            `}</style>
            
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-500 ease-in-out">
                
                {/* Mode Selector Tabs (For demonstration purposes) */}
                <div className="flex mb-8 border-b border-gray-200">
                    <button
                        onClick={toggleMode('signin')}
                        className={`flex-1 py-3 text-center text-lg font-medium transition-all ${
                            mode === 'signin' 
                                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                                : 'text-gray-500 hover:text-indigo-600'
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={toggleMode('signup')}
                        className={`flex-1 py-3 text-center text-lg font-medium transition-all ${
                            mode === 'signup' 
                                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                                : 'text-gray-500 hover:text-indigo-600'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                <CurrentForm />
            </div>
        </div>
    );
};

export default App;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthButton } from '@/components/Auth/AuthButton';
import { TextInputField } from '@/components/Auth/TextInputField';
import { ErrorMessage } from '@/components/Auth/ErrorMessage';
import { Button } from '@/components/ui/button';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setGeneralError('');

    try {
      const { error } = await signIn(formData.email.trim(), formData.password);

      if (error) {
        setGeneralError(error.message || 'Failed to log in');
      } else {
        // Navigate to dashboard or household setup based on user's household status
        navigate('/');
      }
    } catch (error) {
      setGeneralError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-[Jost]">
          Welcome Back
        </h1>
        <div className="w-10" />
      </div>

      {/* Form */}
      <div className="px-6 py-6 space-y-6">
        {generalError && <ErrorMessage message={generalError} />}

        <div className="space-y-4">
          <TextInputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            placeholder="john@example.com"
            error={errors.email}
            required
          />

          <TextInputField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            placeholder="Enter your password"
            error={errors.password}
            required
          />
        </div>

        <AuthButton
          variant="primary"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </AuthButton>

        {/* Forgot Password Link */}
        <div className="text-center">
          <Link 
            to="/forgot-password" 
            className="text-sm text-[#019A52] font-medium hover:underline font-[Jost]"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Social Login Section */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-[Jost]">
                Or continue with
              </span>
            </div>
          </div>

          <AuthButton
            variant="social"
            onClick={() => console.log('Google login')}
            icon={<Mail />}
          >
            Continue with Google
          </AuthButton>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-[#019A52] font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

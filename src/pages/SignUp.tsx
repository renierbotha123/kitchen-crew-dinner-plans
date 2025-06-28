
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthButton } from '@/components/Auth/AuthButton';
import { TextInputField } from '@/components/Auth/TextInputField';
import { ErrorMessage } from '@/components/Auth/ErrorMessage';
import { Button } from '@/components/ui/button';

export function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setGeneralError('');

    try {
      const { error } = await signUp(
        formData.email.trim(),
        formData.password,
        formData.firstName.trim(),
        formData.lastName.trim()
      );

      if (error) {
        setGeneralError(error.message || 'Failed to create account');
      } else {
        // Navigate to household setup
        navigate('/household-setup');
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
          Create Account
        </h1>
        <div className="w-10" />
      </div>

      {/* Form */}
      <div className="px-6 py-6 space-y-6">
        {generalError && <ErrorMessage message={generalError} />}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <TextInputField
              label="First Name"
              value={formData.firstName}
              onChange={(value) => handleInputChange('firstName', value)}
              placeholder="John"
              error={errors.firstName}
              required
            />
            <TextInputField
              label="Last Name"
              value={formData.lastName}
              onChange={(value) => handleInputChange('lastName', value)}
              placeholder="Doe"
            />
          </div>

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
            placeholder="At least 6 characters"
            error={errors.password}
            required
          />

          <TextInputField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(value) => handleInputChange('confirmPassword', value)}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            required
          />
        </div>

        <AuthButton
          variant="primary"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </AuthButton>

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
            onClick={() => console.log('Google sign up')}
            icon={<Mail />}
          >
            Continue with Google
          </AuthButton>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 font-[Jost]">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-[#019A52] font-medium hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

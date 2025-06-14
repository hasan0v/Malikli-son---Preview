"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { loginUser, clearError, fetchUserProfile } from '../../../store/authSlice';
import { RootState, AppDispatch } from '../../../store/store';
import LoadingCircle from '../../../components/LoadingCircle';
import { useI18n } from '../../../hooks/useI18n';
import styles from '../auth.module.css';

export default function LoginPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/'); // Redirect to home if already authenticated
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const resultAction = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(resultAction)) {
        // Fetch user profile after successful login
        await dispatch(fetchUserProfile());
        router.push('/'); // Redirect to home on successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.authContainer}>      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>{t('auth.login.title')}</h1>
          <p className={styles.authSubtitle}>{t('auth.login.subtitle')}</p>
        </div>        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && (
            <div className={styles.errorMessage}>
              {typeof error === 'string' ? error : t('auth.login.errorDefault')}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.inputLabel}>
              {t('auth.login.username')}
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={styles.input}
                placeholder={t('auth.login.usernamePlaceholder')}
                required
              />
              <div className={styles.inputIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
          </div>          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>
              {t('auth.login.password')}
            </label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder={t('auth.login.passwordPlaceholder')}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.passwordToggle}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxCustom}></span>
              {t('auth.login.rememberMe')}
            </label>
            <Link href="/auth/forgot-password" className={styles.forgotLink}>
              {t('auth.login.forgotPassword')}
            </Link>
          </div>          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
          >
            {isLoading ? (
              <LoadingCircle size="small" color="white" text={t('auth.login.loginButtonLoading')} />
            ) : (
              t('auth.login.loginButton')
            )}
          </button>        </form>
        
        {/* Commented out signup link and social login buttons as requested
        <div className={styles.authFooter}>
          <p className={styles.footerText}>
            {t('auth.login.noAccount')}{' '}
            <Link href="/auth/register" className={styles.footerLink}>
              {t('auth.login.registerLink')}
            </Link>
          </p>
        </div>

        <div className={styles.socialDivider}>
          <span className={styles.dividerText}>{t('auth.login.orDivider')}</span>
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.socialButton}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t('auth.login.socialGoogle')}
          </button>
          <button className={styles.socialButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            {t('auth.login.socialFacebook')}
          </button>
        </div>
        */}

      </div>
    </div>
  );
}
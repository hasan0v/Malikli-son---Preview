'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useI18n } from '@/hooks/useI18n';
import emailjs from '@emailjs/browser';
import styles from './contact.module.css';

export default function ContactPage() {
  const { t } = useI18n();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auto-fill form data from user profile when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.first_name && user.last_name 
          ? `${user.first_name} ${user.last_name}`.trim()
          : user.first_name || user.last_name || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Malikli1992 Team'
      };

      const result = await emailjs.send(
        'service_nf604ld', // SERVICE_ID
        'template_0vnaj2c', // TEMPLATE_ID
        templateParams,
        '037LRbdfVdiKdAuaI' // PUBLIC_KEY
      );      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      
      // Only clear subject and message, keep name and email for authenticated users
      if (isAuthenticated && user) {
        setFormData(prev => ({
          ...prev,
          subject: '',
          message: ''
        }));
      } else {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };  return (
    <div className={styles.contactPage}>
      {/* Floating background elements */}
      <div className={styles.floatingElements}>
        <div className={`${styles.floatingCircle} ${styles.circle1}`}></div>
        <div className={`${styles.floatingCircle} ${styles.circle2}`}></div>
        <div className={`${styles.floatingCircle} ${styles.circle3}`}></div>
        <div className={`${styles.floatingCircle} ${styles.circle4}`}></div>
      </div>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Свяжитесь с нами</h1>
          <p className={styles.heroSubtitle}>
            Мы здесь, чтобы помочь вам с любыми вопросами
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.contactContainer}>

        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <h2 className={styles.contactInfoTitle}>Контактная информация</h2>            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>�</div>
              <div className={styles.infoText}>
                <div className={styles.infoLabel}>Адрес электронной почты</div>
                <div className={styles.infoValue}>
                  <a href="mailto:e.malikli1992@gmail.com">e.malikli1992@gmail.com</a>
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>�</div>
              <div className={styles.infoText}>
                <div className={styles.infoLabel}>Номер телефона</div>
                <div className={styles.infoValue}>
                  <a href="tel:+375445371787">+375 44 537 1787</a>
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>⏰</div>
              <div className={styles.infoText}>
                <div className={styles.infoLabel}>Режим работы</div>
                <div className={styles.infoValue}>
                  24/7
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📍</div>
              <div className={styles.infoText}>
                <div className={styles.infoLabel}>Адрес</div>
                <div className={styles.infoValue}>
                  220005, Минск, ул. Веры Хоружей, 6А, пом. 94И
                </div>
              </div>
            </div>
          </div>          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Отправить сообщение</h2>            
            {/* User authentication notification */}
            {isAuthenticated && user && (
              <div className={`${styles.message} ${styles.info}`}>
                ℹ️ Вы вошли в систему как {user.first_name || user.email}. Ваши данные автоматически заполнены.
              </div>
            )}
            
            {submitStatus === 'success' && (
              <div className={`${styles.message} ${styles.success}`}>
                ✅ Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={`${styles.message} ${styles.error}`}>
                ❌ Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Имя <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Введите ваше имя"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="your@email.com"
                    className={styles.input}
                  />
                </div>
              </div>              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Телефон</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="+375 (44) 123-45-67"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    Тема <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    placeholder="Тема вашего сообщения"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Сообщение <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  rows={6}
                  placeholder="Расскажите нам о вашем вопросе или предложении..."
                  className={styles.textarea}
                />
              </div>              <button 
                type="submit" 
                className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Отправка...
                  </>
                ) : (
                  'Отправить сообщение'
                )}
              </button>              </form>
          </div>
        </div>
      </div>
    </div>
  );
}

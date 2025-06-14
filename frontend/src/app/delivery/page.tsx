'use client';

import React from 'react';
import { useI18n } from '@/hooks/useI18n';
import styles from './deliveryPage.module.css';

const DeliveryPage: React.FC = () => {
  const { t } = useI18n();  const deliveryMethods = [
    {
      icon: '📦',
      title: t('delivery.methods.post.title'),
      description: t('delivery.methods.post.description'),
      timeframe: t('delivery.methods.post.timeframe'),
      pricing: t('delivery.methods.post.pricing')
    },
    {
      icon: '🚚',
      title: t('delivery.methods.courier.title'),
      description: t('delivery.methods.courier.description'),
      timeframe: t('delivery.methods.courier.timeframe'),
      pricing: t('delivery.methods.courier.pricing')
    }
  ];
  const faqs = [
    {
      question: t('delivery.faq.duration.question'),
      answer: t('delivery.faq.duration.answer')
    },
    {
      question: t('delivery.faq.changeAddress.question'),
      answer: t('delivery.faq.changeAddress.answer')
    },
    {
      question: t('delivery.faq.tracking.question'),
      answer: t('delivery.faq.tracking.answer')
    },
    {
      question: t('delivery.faq.lostPackage.question'),
      answer: t('delivery.faq.lostPackage.answer')
    }
  ];

  return (
    <div className={styles.container}>      <div className={styles.hero}>
        <h1 className={styles.title}>{t('delivery.hero.title')}</h1>
        <p className={styles.subtitle}>
          {t('delivery.hero.subtitle')}
        </p>
      </div>

      <div className={styles.content}>        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('delivery.methods.title')}</h2>
          <div className={styles.deliveryGrid}>
            {deliveryMethods.map((method, index) => (
              <div key={index} className={styles.deliveryCard}>
                <div className={styles.cardIcon}>{method.icon}</div>
                <h3 className={styles.cardTitle}>{method.title}</h3>
                <p className={styles.cardDescription}>{method.description}</p>
                <div className={styles.cardDetails}>                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>{t('delivery.details.timeframe')}:</span>
                    <span className={styles.detailValue}>{method.timeframe}</span>
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>{t('delivery.details.cost')}:</span>
                    <span className={styles.detailValue}>{method.pricing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('delivery.conditions.title')}</h2>
          <div className={styles.infoCard}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>🌍</div>
                <h4>{t('delivery.conditions.geography.title')}</h4>
                <p>{t('delivery.conditions.geography.description')}</p>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>💳</div>
                <h4>{t('delivery.conditions.payment.title')}</h4>
                <p>{t('delivery.conditions.payment.description')}</p>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>📞</div>
                <h4>{t('delivery.conditions.support.title')}</h4>
                <p>{t('delivery.conditions.support.description')}</p>
              </div>
            </div>
          </div>
        </section>        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('delivery.faq.title')}</h2>
          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>{faq.question}</h4>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>        <section className={styles.contactSection}>
          <div className={styles.contactCard}>
            <h3>{t('delivery.contact.title')}</h3>
            <p>{t('delivery.contact.description')}</p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <span>+375 44 537 1787</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <span>e.malikli1992@gmail.com</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeliveryPage;

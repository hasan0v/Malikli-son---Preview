"use client";

import React from 'react';
import styles from './ProductDescription.module.css';

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {  // Function to format the description text
  const formatDescription = (text: string) => {
    if (!text) return null;

    // First normalize line breaks
    const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Split the text into sections based on various patterns
    // Split by: bullet points, asterisk sections, checkmarks, or double line breaks
    let sections = normalizedText.split(/(?=\s*[-•]\s*|\s*\*[A-Za-z]+[\s:]*|\s*✓)|\n\n+/).filter(line => line.trim());
    
    // Further split sections that contain multiple sentences or mixed content
    const refinedSections: string[] = [];
    sections.forEach(section => {
      const trimmed = section.trim();
      if (!trimmed) return;
      
      // Check if section contains a standalone sentence followed by other content
      const sentenceEndMatch = trimmed.match(/^([^.]*\.)\s*(.+)$/);
      if (sentenceEndMatch && !trimmed.match(/^[-•✓\*]/)) {
        const [, firstSentence, restContent] = sentenceEndMatch;
        // Only split if the rest content looks like it has special formatting
        if (restContent.match(/[-•✓\*]/) || restContent.length > 50) {
          refinedSections.push(firstSentence.trim());
          refinedSections.push(restContent.trim());
          return;
        }
      }
      refinedSections.push(trimmed);
    });
    
    return refinedSections.map((section, index) => {
      const trimmedSection = section.trim();
      
      // Skip empty sections
      if (!trimmedSection) return null;
      
      // Check if it's a bullet point (starts with -, •, or ✓)
      if (/^[-•✓]\s*/.test(trimmedSection)) {
        const content = trimmedSection.replace(/^[-•✓]\s*/, '').trim();
        return (
          <li key={index} className={styles.bulletItem}>
            {formatInlineText(content)}
          </li>
        );
      }
      
      // Check if it's a bolded section (starts with *)
      if (/^\*[A-Za-z]/.test(trimmedSection)) {
        const content = trimmedSection.replace(/^\*/, '').trim();
        const [title, ...rest] = content.split(':');
        
        if (rest.length > 0) {
          return (
            <div key={index} className={styles.featureSection}>
              <h4 className={styles.featureTitle}>
                {title.trim()}
              </h4>
              <p className={styles.featureContent}>
                {formatInlineText(rest.join(':').trim())}
              </p>
            </div>
          );
        } else {
          return (
            <div key={index} className={styles.featureSection}>
              <h4 className={styles.featureTitle}>
                {formatInlineText(content)}
              </h4>
            </div>
          );
        }
      }
      
      // Regular paragraph
      return (
        <p key={index} className={styles.paragraph}>
          {formatInlineText(trimmedSection)}
        </p>
      );
    });
  };
  // Function to format inline text (bold, checkmarks, etc.)
  const formatInlineText = (text: string) => {
    // Handle checkmarks
    text = text.replace(/✓/g, '<span class="checkmark">✓</span>');
    
    // Handle bold text (text within asterisks or naturally bold words)
    text = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
    
    // Handle percentages and measurements
    text = text.replace(/(\d+%|\d+-\d+\s*[A-Z]+)/g, '<span class="highlight">$1</span>');
    
    // Handle line breaks - convert \n to <br> tags
    text = text.replace(/\n/g, '<br>');
    
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };
  // Parse the description to extract key features and details
  const parseDescription = (text: string) => {
    // Normalize line breaks first
    const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = normalizedText.split(/\.\s+|\n+/).filter(line => line.trim());
    const bullets: string[] = [];
    const features: string[] = [];
    let mainDescription = '';
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (/^[-•✓]\s*/.test(trimmedLine)) {
        bullets.push(trimmedLine.replace(/^[-•✓]\s*/, '').trim());
      } else if (/^\*[A-Za-z]/.test(trimmedLine)) {
        features.push(trimmedLine.replace(/^\*/, '').trim());
      } else if (trimmedLine.length > 20) {
        mainDescription += trimmedLine + '. ';
      }
    });
    
    return { mainDescription: mainDescription.trim(), bullets, features };
  };

  const { mainDescription, bullets, features } = parseDescription(description);
  const hasStructuredContent = bullets.length > 0 || features.length > 0;

  if (!hasStructuredContent) {
    // For unstructured text, try to format it nicely
    return (
      <div className={styles.descriptionContainer}>
        <div className={styles.formattedContent}>
          {formatDescription(description)}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.descriptionContainer}>
      {mainDescription && (
        <div className={styles.mainDescription}>
          <p>{formatInlineText(mainDescription)}</p>
        </div>
      )}
      
      {features.length > 0 && (
        <div className={styles.featuresSection}>
          <h3 className={styles.sectionTitle}>Key Features</h3>
          <div className={styles.featuresList}>
            {features.map((feature, index) => {
              const [title, ...content] = feature.split(':');
              return (
                <div key={index} className={styles.featureItem}>
                  <h4 className={styles.featureTitle}>{title.trim()}</h4>
                  {content.length > 0 && (
                    <p className={styles.featureContent}>
                      {formatInlineText(content.join(':').trim())}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {bullets.length > 0 && (
        <div className={styles.highlightsSection}>
          <h3 className={styles.sectionTitle}>Highlights</h3>
          <ul className={styles.bulletList}>
            {bullets.map((bullet, index) => (
              <li key={index} className={styles.bulletItem}>
                {formatInlineText(bullet)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;

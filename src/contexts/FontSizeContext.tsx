import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontSize = 'small' | 'medium' | 'large';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

interface FontSizeProviderProps {
  children: ReactNode;
  initialFontSize?: FontSize;
}

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children, initialFontSize = 'medium' }) => {
  const [fontSize, setFontSize] = useState<FontSize>(initialFontSize);

  useEffect(() => {
    // Remove existing font size classes
    document.documentElement.classList.remove('font-small', 'font-medium', 'font-large');
    
    // Add current font size class
    document.documentElement.classList.add(`font-${fontSize}`);
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};
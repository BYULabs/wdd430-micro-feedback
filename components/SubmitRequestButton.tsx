'use client';

import { useState } from 'react';
import SubmitRequestModal from './SubmitRequestModal';

interface SubmitRequestButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function SubmitRequestButton({
  children,
  className,
}: SubmitRequestButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>

      <SubmitRequestModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
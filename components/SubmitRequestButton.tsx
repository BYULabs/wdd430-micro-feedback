'use client';

import { useState } from 'react';
import SubmitRequestModal from './SubmitRequestModal';

interface SubmitRequestButtonProps {
  children: React.ReactNode;
  className?: string;
  initialProjectId?: string;
}

export default function SubmitRequestButton({
  children,
  className,
  initialProjectId,
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
        key={initialProjectId ?? 'all-projects'}
        isOpen={isOpen}
        initialProjectId={initialProjectId}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

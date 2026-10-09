'use client';

import { Lightbulb, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buttonClasses } from '@/components/Button';
import { REQUEST_CATEGORIES, type CreateRequestInput } from '@/types';

interface SubmitRequestModalProps {
  isOpen: boolean;
  initialProjectId?: string;
  onClose: () => void;
}

type FormErrors = Partial<Record<keyof CreateRequestInput, string>>;

const projects = [
  { id: 'proj-1', name: 'ProductHub' },
  { id: 'proj-2', name: 'FormCraft' },
  { id: 'proj-3', name: 'DeployBot' },
  { id: 'proj-4', name: 'Logify' },
];

export default function SubmitRequestModal({
  isOpen,
  initialProjectId,
  onClose,
}: SubmitRequestModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateRequestInput>({
    projectId: initialProjectId ?? '',
    title: '',
    description: '',
    category: 'Other',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name as keyof CreateRequestInput]) {
      setErrors((current) => ({
        ...current,
        [name]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.projectId) {
      newErrors.projectId = 'Please select a project.';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Please enter a title.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload: CreateRequestInput = {
      projectId: formData.projectId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
    };

    try {
      setIsSubmitting(true);
      setSubmitError('');

      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feature request.');
      }

      setFormData({
        projectId: initialProjectId ?? '',
        title: '',
        description: '',
        category: 'Other',
      });

      setErrors({});
      router.refresh();
      onClose();
    } catch (error) {
      console.error('Error submitting feature request:', error);
      setSubmitError('Unable to submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-enter relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-800 bg-panel p-6 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-request-title"
      >
        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400">
              <Lightbulb className="h-5 w-5" aria-hidden />
            </span>
            <h2
              id="submit-request-title"
              className="font-mono text-lg font-bold text-slate-100"
            >
              Submit Feature Request
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-300"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="projectId"
              className="mb-2 block font-mono text-xs font-semibold tracking-wider text-slate-300 uppercase"
            >
              Target project
            </label>

            <select
              id="projectId"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              aria-invalid={Boolean(errors.projectId)}
              aria-describedby={
                errors.projectId ? 'projectId-error' : undefined
              }
              className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 font-mono text-sm text-slate-100 transition-colors placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/60 focus:outline-none"
            >
              <option value="">Select a project</option>

              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            {errors.projectId && (
              <p
                id="projectId-error"
                role="alert"
                className="mt-1.5 font-mono text-xs text-rose-400"
              >
                {errors.projectId}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-mono text-xs font-semibold tracking-wider text-slate-300 uppercase"
            >
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: Add Slack notifications"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 font-mono text-sm text-slate-100 transition-colors placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/60 focus:outline-none"
            />

            {errors.title && (
              <p
                id="title-error"
                role="alert"
                className="mt-1.5 font-mono text-xs text-rose-400"
              >
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block font-mono text-xs font-semibold tracking-wider text-slate-300 uppercase"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the feature and why it would be useful."
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? 'description-error' : undefined
              }
              className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 font-mono text-sm text-slate-100 transition-colors placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/60 focus:outline-none resize-none"
            />

            {errors.description && (
              <p
                id="description-error"
                role="alert"
                className="mt-1.5 font-mono text-xs text-rose-400"
              >
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block font-mono text-xs font-semibold tracking-wider text-slate-300 uppercase"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={errors.category ? 'category-error' : undefined}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 font-mono text-sm text-slate-100 transition-colors placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/60 focus:outline-none"
            >
              {REQUEST_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <p
                id="category-error"
                role="alert"
                className="mt-1.5 font-mono text-xs text-rose-400"
              >
                {errors.category}
              </p>
            )}
          </div>

          {submitError && (
            <p role="alert" className="font-mono text-xs text-rose-400">
              {submitError}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={buttonClasses({ variant: 'ghost' })}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={buttonClasses({ variant: 'primary' })}
            >
              {isSubmitting ? 'Submitting…' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

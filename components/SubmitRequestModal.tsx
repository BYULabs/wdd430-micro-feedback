'use client';

import { useEffect, useState } from 'react';
import {
  REQUEST_CATEGORIES,
  type CreateRequestInput,
} from '@/types';

interface SubmitRequestModalProps {
  isOpen: boolean;
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
  onClose,
}: SubmitRequestModalProps) {
  const [formData, setFormData] = useState<CreateRequestInput>({
    projectId: '',
    title: '',
    description: '',
    category: 'Other',
  });

  const [errors, setErrors] = useState<FormErrors>({});
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
        projectId: '',
        title: '',
        description: '',
        category: 'Other',
      });

      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error submitting feature request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-enter w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-request-title"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="submit-request-title"
              className="text-xl font-semibold text-white"
            >
              Submit Feature Request
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Tell us what feature you would like to see.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <span aria-hidden="true" className="text-xl">
              ×
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="projectId"
              className="mb-2 block text-sm font-medium text-zinc-200"
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
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
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
                className="mt-1 text-sm text-red-400"
              >
                {errors.projectId}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-zinc-200"
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
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500"
            />

            {errors.title && (
              <p id="title-error" className="mt-1 text-sm text-red-400">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-zinc-200"
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
              className="w-full resize-none rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500"
            />

            {errors.description && (
              <p
                id="description-error"
                className="mt-1 text-sm text-red-400"
              >
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-zinc-200"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={
                errors.category ? 'category-error' : undefined
              }
              className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
            >
              {REQUEST_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <p id="category-error" className="mt-1 text-sm text-red-400">
                {errors.category}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '../components';

describe('Breadcrumb components', () => {
  it('renders default breadcrumb structure', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/test'>Test</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();

    const links = screen.getAllByRole('link', { hidden: false });
    expect(links[0]).toHaveAttribute('href', '/test');
    expect(links[1]).toHaveAttribute('aria-current', 'page');
  });

  it('renders BreadcrumbSeparator with custom children', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Item</BreadcrumbItem>
          <BreadcrumbSeparator>»</BreadcrumbSeparator>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByText('»')).toBeInTheDocument();
  });

  it('renders ellipsis', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByText(/more/i)).toBeInTheDocument();
  });

  it('BreadcrumbLink asChild uses Slot and handles click', async () => {
    const handleClick = vi.fn();
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <button onClick={handleClick} data-testid='btn'>
                Press
              </button>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    const btn = screen.getByTestId('btn');
    await userEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
    expect(btn).toHaveAttribute('data-slot', 'breadcrumb-link');
  });
});

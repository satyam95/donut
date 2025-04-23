import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip, TooltipTrigger, TooltipContent } from '../components';

afterEach(() => cleanup());

describe('Tooltip Component', () => {
  it('should not render content by default', () => {
    render(
      <Tooltip>
        <TooltipTrigger>
          <button>Test</button>
        </TooltipTrigger>
        <TooltipContent>Content</TooltipContent>
      </Tooltip>
    );
    expect(screen.queryByText(/content/i)).toBeNull();
  });

  it('shows content on hover and hides on mouse leave', () => {
    render(
      <Tooltip>
        <TooltipTrigger>
          <button>Test</button>
        </TooltipTrigger>
        <TooltipContent>Content</TooltipContent>
      </Tooltip>
    );
    const trigger = screen.getByRole('button', { name: /test/i });
    fireEvent.mouseEnter(trigger);
    expect(screen.getByText(/content/i)).toBeInTheDocument();
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText(/content/i)).toBeNull();
  });

  it('shows content on focus and hides on blur', () => {
    render(
      <Tooltip>
        <TooltipTrigger>
          <button>Test</button>
        </TooltipTrigger>
        <TooltipContent>Content</TooltipContent>
      </Tooltip>
    );
    const trigger = screen.getByRole('button', { name: /test/i });
    fireEvent.focus(trigger);
    expect(screen.getByText(/content/i)).toBeInTheDocument();
    fireEvent.blur(trigger);
    expect(screen.queryByText(/content/i)).toBeNull();
  });

  describe('offset styles', () => {
    const cases: {
      side: 'top' | 'bottom' | 'left' | 'right';
      styleProp: string;
    }[] = [
      { side: 'top', styleProp: 'marginBottom' },
      { side: 'bottom', styleProp: 'marginTop' },
      { side: 'left', styleProp: 'marginRight' },
      { side: 'right', styleProp: 'marginLeft' },
    ];

    cases.forEach(({ side, styleProp }) => {
      it(`applies correct offset style for ${side}`, () => {
        const offset = 15;
        render(
          <Tooltip>
            <TooltipTrigger>
              <button>{`Test${side}`}</button>
            </TooltipTrigger>
            <TooltipContent side={side} sideOffset={offset}>
              {side}
            </TooltipContent>
          </Tooltip>
        );
        const trigger = screen.getByRole('button', {
          name: new RegExp(`test${side}`, 'i'),
        });
        fireEvent.mouseEnter(trigger);
        const all = screen.getAllByText(new RegExp(side, 'i'));
        const content = all.find((el) => el.closest('div.absolute'));
        expect(content).toHaveStyle(`${styleProp}: ${offset}px`);
      });
    });
  });

  it('throws if TooltipTrigger is used outside Tooltip', () => {
    expect(() => render(<TooltipTrigger>Invalid</TooltipTrigger>)).toThrow();
  });

  it('throws if TooltipContent is used outside Tooltip', () => {
    expect(() => render(<TooltipContent>Invalid</TooltipContent>)).toThrow();
  });
});

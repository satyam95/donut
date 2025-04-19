import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../components';

// Meta configuration
const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator.',
      table: {
        type: { summary: 'horizontal | vertical' },
      },
    },
    decorative: {
      control: { type: 'boolean' },
      description: 'If true, the separator is for visual purposes only.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional custom styles for the separator.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

// Horizontal Separator
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true,
    className: 'w-48',
  },
};

// Vertical Separator
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    decorative: true,
    className: 'h-48',
  },
};

// Non-Decorative Separator
export const NonDecorative: Story = {
  args: {
    orientation: 'horizontal',
    decorative: false,
    className: 'bg-red-500 w-48',
  },
};

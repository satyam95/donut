import { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../components';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    pressed: { control: 'boolean' },
    defaultPressed: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg'],
    },
    disabled: { control: 'boolean' },
    onPressedChange: { action: 'pressedChange' },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Toggle',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Toggle',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Toggle',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Toggle',
  },
};

import { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'text',
    placeholder: 'Enter text',
    className: '',
  },
  argTypes: {
    type: {
      control: 'text',
      description: 'Input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    className: {
      control: 'text',
      description: 'Additional class names',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const WithError: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Invalid input',
  },
};

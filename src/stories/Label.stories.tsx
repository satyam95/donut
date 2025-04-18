import { Meta, StoryObj } from '@storybook/react';
import { Label } from '../components';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: { control: 'text' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    htmlFor: 'input-id',
    children: 'Default Label',
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'input-id',
    className: 'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
    children: 'Disabled Label',
  },
};

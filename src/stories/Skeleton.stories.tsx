import { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../components';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'h-4 w-24',
  },
};

export const Circle: Story = {
  args: {
    className: 'h-8 w-8 rounded-full',
  },
};

export const Large: Story = {
  args: {
    className: 'h-12 w-48',
  },
};

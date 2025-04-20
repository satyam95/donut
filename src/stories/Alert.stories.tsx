import { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '../components';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    variant: 'default',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>
        This is a default alert with a descriptive message.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} variant='destructive'>
      <AlertTitle>Destructive Alert</AlertTitle>
      <AlertDescription>
        This is a destructive alert. Something went wrong.
      </AlertDescription>
    </Alert>
  ),
};

export const CustomClass: Story = {
  render: (args) => (
    <Alert {...args} className='bg-purple-100 text-purple-800'>
      <AlertTitle>Custom Styled Alert</AlertTitle>
      <AlertDescription>
        This alert uses custom styles for unique needs.
      </AlertDescription>
    </Alert>
  ),
};

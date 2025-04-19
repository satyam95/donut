import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    return <ControlledSwitchStory {...args} />;
  },
};

// A proper React component for the Controlled story
const ControlledSwitchStory: React.FC<
  Omit<React.ComponentProps<typeof Switch>, 'checked' | 'onChange'>
> = (props) => {
  const [checked, setChecked] = useState(false);

  return <Switch {...props} checked={checked} onChange={setChecked} />;
};

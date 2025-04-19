import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

// Wrapper component for interactive story
function InteractiveCheckboxWrapper(
  props: Omit<React.ComponentProps<typeof Checkbox>, 'checked' | 'onChange'>
) {
  const [checked, setChecked] = useState(false);
  return <Checkbox {...props} checked={checked} onChange={setChecked} />;
}

export const Interactive: Story = {
  render: (args) => <InteractiveCheckboxWrapper {...args} />,
  args: {
    disabled: false,
  },
};

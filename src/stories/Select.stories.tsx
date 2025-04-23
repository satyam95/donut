import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../components/Select'; // Adjust the import path based on your project structure

// Meta configuration for the Select component
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the select',
    },
    defaultValue: { control: 'text', description: 'Default selected value' },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when value changes',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class for the select',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select component',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Select {...args} onValueChange={args.onValueChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Option 1</SelectItem>
        <SelectItem value='option2'>Option 2</SelectItem>
        <SelectItem value='option3'>Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Small size story
export const Small: Story = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Select {...args} onValueChange={args.onValueChange}>
      <SelectTrigger size='sm' className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Option 1</SelectItem>
        <SelectItem value='option2'>Option 2</SelectItem>
        <SelectItem value='option3'>Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// With default value story
export const WithDefaultValue: Story = {
  args: {
    placeholder: 'Select an option',
    defaultValue: 'option2',
  },
  render: (args) => (
    <Select {...args} onValueChange={args.onValueChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Option 1</SelectItem>
        <SelectItem value='option2'>Option 2</SelectItem>
        <SelectItem value='option3'>Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// With groups and labels story
export const WithGroups: Story = {
  args: {
    placeholder: 'Select a fruit or vegetable',
  },
  render: (args) => (
    <Select {...args} onValueChange={args.onValueChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='orange'>Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value='carrot'>Carrot</SelectItem>
          <SelectItem value='broccoli'>Broccoli</SelectItem>
          <SelectItem value='spinach'>Spinach</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// Scrollable content story
export const Scrollable: Story = {
  args: {
    placeholder: 'Select an item',
  },
  render: (args) => (
    <Select {...args} onValueChange={args.onValueChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 20 }, (_, i) => (
          <SelectItem key={i} value={`item${i + 1}`}>
            Item {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

// With disabled item story
export const WithDisabledItem: Story = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Select {...args} onValueChange={args.onValueChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Option 1</SelectItem>
        <SelectItem value='option2' disabled>
          Option 2 (Disabled)
        </SelectItem>
        <SelectItem value='option3'>Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Disabled select story
export const Disabled: Story = {
  args: {
    placeholder: 'Select an option',
    disabled: true,
  },
  render: (args) => (
    <Select {...args} onValueChange={args.onValueChange}>
      <SelectTrigger className='w-[180px]' disabled={args.disabled}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Option 1</SelectItem>
        <SelectItem value='option2'>Option 2</SelectItem>
        <SelectItem value='option3'>Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

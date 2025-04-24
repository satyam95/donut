import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuPortal,
  DropdownMenuGroup,
} from '../components';
import { Button } from '../components';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      canvas: {
        style: {
          zIndex: 0,
          position: 'relative',
          overflow: 'visible',
        },
      },
    },
  },
  argTypes: {
    children: { control: 'text', description: 'Content of the dropdown menu' },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Basic: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
        <DropdownMenuItem>Item 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  name: 'Basic Dropdown',
};

export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
              <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
              <DropdownMenuItem>Sub Item 3</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  name: 'With Submenu',
};

export const WithCheckbox: Story = {
  render: () => {
    const CheckboxMenu = () => {
      const [checkedItems, setCheckedItems] = useState({
        item1: false,
        item2: true,
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuCheckboxItem
              checked={checkedItems.item1}
              onChange={(checked) =>
                setCheckedItems({ ...checkedItems, item1: checked })
              }
            >
              Option 1
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.item2}
              onChange={(checked) =>
                setCheckedItems({ ...checkedItems, item2: checked })
              }
            >
              Option 2
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };
    return <CheckboxMenu />;
  },
  name: 'With Checkbox Items',
};

export const WithRadio: Story = {
  render: () => {
    const RadioMenu = () => {
      const [selected, setSelected] = useState('option1');

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Select Option</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem
                checked={selected === 'option1'}
                onSelect={() => setSelected('option1')}
              >
                Option 1
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                checked={selected === 'option2'}
                onSelect={() => setSelected('option2')}
              >
                Option 2
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };
    return <RadioMenu />;
  },
  name: 'With Radio Items',
};

export const DisabledItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem>Enabled Item</DropdownMenuItem>
        <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
        <DropdownMenuItem>Another Enabled Item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  name: 'With Disabled Items',
};

export const DestructiveVariant: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem>Regular Item</DropdownMenuItem>
        <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Another Item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  name: 'With Destructive Variant',
};

export const WithLabelAndShortcut: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          Copy
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Paste
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  name: 'With Label and Shortcut',
};

export const Example: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  name: 'Example (Full)',
};

export const ComplexExample: Story = {
  render: () => {
    const ComplexMenu = () => {
      const [checkedItems, setCheckedItems] = useState({ item1: false });
      const [selectedRadio, setSelectedRadio] = useState('option1');

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuItem>Regular Item</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={checkedItems.item1}
              onChange={(checked) =>
                setCheckedItems({ ...checkedItems, item1: checked })
              }
            >
              Checkbox Item
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem
                checked={selectedRadio === 'option1'}
                onSelect={() => setSelectedRadio('option1')}
              >
                Radio Option 1
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                checked={selectedRadio === 'option2'}
                onSelect={() => setSelectedRadio('option2')}
              >
                Radio Option 2
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    Sub Item 2 (Disabled)
                  </DropdownMenuItem>
                  <DropdownMenuItem variant='destructive'>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Action
              <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };
    return <ComplexMenu />;
  },
  name: 'Complex Example',
};

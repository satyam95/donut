import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components';

describe('Tabs Component', () => {
  it('renders the Tabs and triggers correctly', () => {
    render(
      <Tabs defaultValue='tab1'>
        <TabsList>
          <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
          <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value='tab1'>
          <div>Content for Tab 1</div>
        </TabsContent>
        <TabsContent value='tab2'>
          <div>Content for Tab 2</div>
        </TabsContent>
      </Tabs>
    );

    // Verify triggers are present
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();

    // Verify initial content
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
  });

  it('changes the active tab on trigger click', () => {
    render(
      <Tabs defaultValue='tab1'>
        <TabsList>
          <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
          <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value='tab1'>
          <div>Content for Tab 1</div>
        </TabsContent>
        <TabsContent value='tab2'>
          <div>Content for Tab 2</div>
        </TabsContent>
      </Tabs>
    );

    // Click on Tab 2
    fireEvent.click(screen.getByText('Tab 2'));

    // Verify content changes
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
  });

  it('does not crash when there is no default tab', () => {
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
          <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value='tab1'>
          <div>Content for Tab 1</div>
        </TabsContent>
        <TabsContent value='tab2'>
          <div>Content for Tab 2</div>
        </TabsContent>
      </Tabs>
    );

    // Ensure the first tab isn't active
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
  });

  it('throws an error if TabsTrigger or TabsContent are used outside of Tabs', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() =>
      render(<TabsTrigger value='tab1'>Tab 1</TabsTrigger>)
    ).toThrow();
    expect(() =>
      render(<TabsContent value='tab1'>Content</TabsContent>)
    ).toThrow();

    errorSpy.mockRestore();
  });
});

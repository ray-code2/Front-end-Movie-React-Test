import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

test('calls onSearch when input changes', async () => {
    const mockSearch = vi.fn()
    render(<SearchBar onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText('Search movies...');
    await userEvent.type(input, 'Inception');

    expect(mockSearch).toHaveBeenCalled();
    expect(mockSearch).toHaveBeenCalledWith('Inception');
})
import {render, screen, fireEvent} from '@testing-library/react';
import CategoryFilter from '../FilterCategory';

describe('FilterCategory', () => {
    it('renders and calls onChange when selecting a category', () => {
        const mockOnChange = vi.fn();
        render(<CategoryFilter selected="movie/popular" onChange={mockOnChange} />);
        const popularButton = screen.getByRole('button', {name: /popular/i});
        const topRatedButton = screen.getByRole('button', {name: /top rated/i});
        const nowPlayingButton = screen.getByRole('button', {name: /now playing/i});
        const upcomingButton = screen.getByRole('button', {name: /upcoming/i});
        expect(popularButton).toBeInTheDocument();
        expect(topRatedButton).toBeInTheDocument();
        expect(nowPlayingButton).toBeInTheDocument();
        expect(upcomingButton).toBeInTheDocument();
    });
    it('calls onChange when a category is Clicked', () => {
        const mockOnChange = vi.fn();
        render(<CategoryFilter selected="movie/popular" onChange={mockOnChange} />);
        const nowPlayingButton = screen.getByRole('button', {name: /now playing/i});
        fireEvent.click(nowPlayingButton);
        expect(mockOnChange).toHaveBeenCalledWith('movie/now_playing');
    });
});


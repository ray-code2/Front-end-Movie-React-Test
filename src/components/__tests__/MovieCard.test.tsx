import {render, screen} from '@testing-library/react';
import MovieCard from '../MovieCard';
import { BrowserRouter } from 'react-router-dom';

const movie = {
    id: 1,
    title: 'Test Movie',
    release_date: '2023-01-01',
    overview: 'This is a test movie.',
    poster_path: '/test.jpg',
};

describe('MovieCard', () => {
    it('renders movie information correctly', () => {
        render(
            <BrowserRouter>
                <MovieCard movie={movie} />
            </BrowserRouter>
        );

        expect(screen.getByText(/Test Movie/i)).toBeInTheDocument();
        expect(screen.getByText(/2023/i)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining(movie.poster_path));
    })
})
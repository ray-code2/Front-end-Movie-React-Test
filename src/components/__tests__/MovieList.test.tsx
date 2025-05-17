import {render, screen} from '@testing-library/react';
import MovieList from '../MovieList';

test('renders without crashing', () => {
    render(<MovieList endpoint="movie/popular"/>);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    
})
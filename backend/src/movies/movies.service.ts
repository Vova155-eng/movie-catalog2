import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies = [
    { id: 1, title: 'Inception', genre: 'Sci-Fi', rating: 8.8 },
    { id: 2, title: 'Interstellar', genre: 'Sci-Fi', rating: 8.6 },
  ];

  findAll() {
    return this.movies;
  }

  create(dto: CreateMovieDto) {
    const newMovie = { id: Date.now(), ...dto };
    this.movies.push(newMovie);
    return newMovie;
  }

  // ОБОВ'ЯЗКОВО ДОДАЙТЕ ЦЕЙ МЕТОД:
  delete(id: number) {
    this.movies = this.movies.filter(m => m.id !== id);
    return { success: true };
  }
}
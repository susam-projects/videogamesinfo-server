import { Injectable } from '@nestjs/common';
import igdb from "igdb-api-node";

process.env.IGDB_API_KEY = '3a8ab4d697686cfef5fc40af5d685962';

@Injectable()
export class GamesService {
  async find(title: string): Promise<string> {
    console.log(`searching games by title ${title}`);

    try {
      const response = await igdb()
        .fields([
          'name',
          'slug',
          'release_dates',
        ])
        .search(title)
        .request('/games');
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return "[]";
  }

  async getRecent(): Promise<string> {
    console.log(`getting recent games`);

    const nowSeconds = Math.floor(Date.now() / 1000);

    try {
      const response = await igdb()
        .fields([
          'name',
          'slug',
          'popularity',
          'rating',
          'follows',
          'first_release_date',
        ])
        .sort('first_release_date', "desc")
        .where(`first_release_date < ${nowSeconds}`)
        .limit(5)
        .request('/games');
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return "[]";
  }

  async getBySlug(slug: string): Promise<string> {
    console.log(`getting a game by slug "${slug}"`);
    const response = await igdb()
      .fields([
        'name',
        'slug'
      ])
      .where(`slug = "${slug}"`)
      .request('/games');
    try {
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return "[]";
  }
}

import { Injectable } from '@nestjs/common';
import apicalypse, { ApicalypseConfig } from "apicalypse";

const requestOptions: ApicalypseConfig = {
  baseURL: 'https://api-v3.igdb.com',
  headers: {
    'Accept': 'application/json',
    'user-key': '3a8ab4d697686cfef5fc40af5d685962',
  },
  responseType: 'json',
  timeout: 15000,
};

@Injectable()
export class GamesService {
  async find(title: string): Promise<string> {
    console.log(`searching games by title ${title}`);

    try {
      const response = await apicalypse({
        ...requestOptions,
      })
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
      const response = await apicalypse({
        ...requestOptions,
      })
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
    const response = await apicalypse({
      ...requestOptions,
    })
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

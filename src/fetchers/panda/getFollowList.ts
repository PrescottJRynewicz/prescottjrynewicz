import fetch from 'node-fetch';
import JSDOM from 'jsdom';

export async function getFollowList(url: string): Promise<{
  followersList: HTMLUListElement;
  followersDocument: Document;
  foundAthlete: boolean;
}> {
  try {
    const result = await (
      await fetch(url, {
        headers: {
          cookie: process.env.STRAVA_COOKIE as string,
          Cookie: process.env.STRAVA_COOKIE as string,
        },
      })
    ).text();

    if (result) {
      const dom = new JSDOM.JSDOM(result);
      const { document } = dom.window;

      const followSection = document
        .getElementsByClassName('tab-content')
        .item(0);

      if (followSection) {
        const athleteList = followSection
          .getElementsByClassName('list-athletes')
          .item(0) as HTMLUListElement;

        return {
          followersList: athleteList,
          followersDocument: document,
          foundAthlete: true,
        };
      }
    }

    throw new Error('Unable to find follower list for athlete');
  } catch (e) {
    console.error('error getting follow list');
    console.error(e);
    const dom = new JSDOM.JSDOM(`<html></html>`);
    return {
      followersList: dom.window.document.createElement('ul'),
      followersDocument: dom.window.document,
      foundAthlete: false,
    };
  }
}

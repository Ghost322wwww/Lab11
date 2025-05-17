import request from 'supertest';
import app from './app'; 

describe('Article API', () => {
  let createdArticleId: number | null = null;

  it('should return all articles (GET /api/v1/articles)', async () => {
    const res = await request(app.callback()).get('/api/v1/articles');

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new article (POST /api/v1/articles)', async () => {
    const newArticle = {
        title: 'Test Article From Jest',
        allText: 'This article was created via Jest testing.',
        authorID: 5, 
        summary: 'Test summary',
        imageURL: 'https://example.com/image.jpg',
        published: true
    };

    const token = Buffer.from('admin:password').toString('base64');

    const res = await request(app.callback())
      .post('/api/v1/articles') 
      .set('Authorization', `Basic ${token}`)
      .send(newArticle);

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject({ message: 'you are passed' });


    if (res.body.id) {
      createdArticleId = res.body.id;
    }
  });

  it('should include the new article in GET /api/v1/articles', async () => {
    const res = await request(app.callback()).get('/api/v1/articles');
    const found = res.body.find((a: any) => a.title === 'Test Article From Jest');
    expect(found).toBeDefined();
  });

  afterAll(async () => {
    if (createdArticleId) {
      const token = Buffer.from('admin:1234').toString('base64');
      await request(app.callback())
        .delete(`/api/v1/articles/${createdArticleId}`)
        .set('Authorization', `Basic ${token}`);
    }
  });
});
